import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GradientBackground from '../../components/common/GradientBackground';
import {
  ExerciseFragment,
  ExerciseLogFragment,
  ExerciseLogInput,
  LogUnit,
  useAddExerciseLogMutation,
  useEndWorkoutMutation,
  useLatestLogsByExerciseIdLazyQuery,
  useMyExercisesQuery,
  useReLogLatestLogMutation,
  useReLogLogMutation,
  useRemoveExerciseLogMutation,
  useUpdateExerciseLogMutation,
  useWorkoutByIdLazyQuery,
  WorkoutLongFragment,
} from '../../graphql/operations';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from '../../components/workouts/MuscleGroupList';
import FloatingButton from '../../components/common/FloatingButton';
import {WorkoutStackParamList} from '../../stacks/WorkoutStack';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import SelectExercises from '../../components/workouts/SelectExercises';
import Constants from '../../utils/Constants';
import moment from 'moment';
import GroupedExerciseLogListItem from '../../components/exercise/GroupedExerciseLogListItem';
import CreateExerciseModalContent from '../../components/bottomSheet/CreateExerciseModalContent';
import EndWorkout from '../../components/nav/headerComponents/EndWorkout';
import usePreferenceStore from '../../stores/preferenceStore';
import LogValueSelect from '../../components/common/LogValueSelect';
import {Picker} from '@react-native-picker/picker';
import {logValueToString} from '../../utils/String';
import Loader from '../../components/common/Loader';
import {DATE_TIME_FORMAT} from '../../utils/Date';
import {stripTypenames} from '../../utils/GrahqlUtils';
import {nonNullable} from '../../utils/List';
import PopupModal from '../../components/common/PopupModal';
import ExpandableView from '../../components/common/ExpandableView';
import {Add, Retry, Timer} from '../../icons/svg';
import {Fab} from '../../utils/Fab';
import {IActionProps} from 'react-native-floating-action';
import useTimerStore from '../../stores/timerStore';
import useRouteStore from '../../stores/routeStore';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetail'>;

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const WorkoutDetailScreen: React.FC<Props> = props => {
  const toggleTimerVisibility = useTimerStore(state => state.toggleVisibility);
  const timerActive = useTimerStore(state => state.timerActive);
  const startTimer = useTimerStore(state => state.startTimer);
  const preference = usePreferenceStore(state => state.preference);
  const hideUnitSelector = preference?.hideUnitSelector || false;
  const autoAdjust = preference?.autoAdjustWorkoutMuscleGroups || false;

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const setRouteName = useRouteStore(state => state.setRouteName);
  const [disableLogButton, setDisableLogButton] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [deleteLogId, setDeleteLogId] = useState('');
  const [createExerciseModal, setCreateExerciseModal] = useState(false);
  const [workout, setWorkout] = useState<WorkoutLongFragment>();
  const [latestLogs, setLatestLogs] = useState<ExerciseLogFragment[]>([]);
  const [editExistingExercise, setEditExistingExercise] =
    useState<ExerciseLogFragment>();
  const [myExercises, setMyExercises] = useState<ExerciseFragment[]>([]);

  const {loading: myExercisesLoading, refetch: refetchMyExercises} =
    useMyExercisesQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        setMyExercises(data?.myExercises || []);
      },
    });
  const [workoutById, {data: workoutData, loading: workoutLoading}] =
    useWorkoutByIdLazyQuery({fetchPolicy: 'no-cache'});
  const [logExercise, {data: logExerciseData, loading: logExeciseLoading}] =
    useAddExerciseLogMutation({fetchPolicy: 'no-cache'});
  const [
    updateExerciseLog,
    {data: updateExerciseLogData, loading: updateExeciseLoading},
  ] = useUpdateExerciseLogMutation({fetchPolicy: 'no-cache'});
  const [endWorkout, {loading: endWorkoutLoading}] = useEndWorkoutMutation();
  const [
    removeExerciseLog,
    {data: removeExerciseLogData, loading: removeExerciseLogLoading},
  ] = useRemoveExerciseLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.removeExerciseLog) {
        setDeleteLogId('');
      }
    },
  });
  const [latestLogQuery, {loading: latestLogsLoading}] =
    useLatestLogsByExerciseIdLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        // If available, set the last log
        if (data?.latestLogsByExerciseId) {
          setLatestLogs(
            data.latestLogsByExerciseId
              .filter(nonNullable)
              .sort(
                (a, b) =>
                  new Date(a.logDateTime).getTime() -
                  new Date(b.logDateTime).getTime(),
              ),
          );
        } else {
          // Reset log value
          setExerciseLog(prevState => ({
            ...prevState,
            logValue: initialLog.logValue,
            repetitions: initialLog.repetitions,
          }));
          setLatestLogs([]);
        }
      },
    });
  const [reLogLatestLog, {loading: reLogLoading}] = useReLogLatestLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.reLogLatestLog) {
        setWorkout(data.reLogLatestLog);
      }
    },
  });
  const [reLogLog, {loading: reLogLogLoading}] = useReLogLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.reLogLog) {
        setWorkout(data.reLogLog);
      }
    },
  });

  useEffect(() => {
    if (latestLogs && latestLogs.length > 0) {
      setExerciseLog({
        exerciseId: latestLogs[0].exercise.id,
        warmup: latestLogs[0].warmup || false,
        remark: '',
        repetitions: latestLogs[0].repetitions,
        logValue: latestLogs[0].logValue,
        zonedDateTimeString: '',
      });
    }
  }, [latestLogs]);

  useEffect(() => {
    if (!workoutData?.workoutById) {
      props.navigation.setOptions({
        headerTitle: '',
      });
    }
  }, []);

  useEffect(() => {
    if (props.route.params.workoutId) {
      workoutById({
        variables: {
          id: props.route.params.workoutId,
        },
      });
    }
  }, [props.route.params.workoutId]);

  useEffect(() => {
    if (workoutData?.workoutById) {
      setWorkout(workoutData?.workoutById);
      props.navigation.setOptions({
        headerTitle: workoutData?.workoutById?.name,
      });
      if (workoutData?.workoutById?.active && workoutData?.workoutById?.id) {
        props.navigation.setOptions({
          headerRight: () => (
            <EndWorkout
              label={'End Workout'}
              color={'red'}
              onPress={() => doEndWorkout(workoutData?.workoutById?.id)}
            />
          ),
        });
      }
    }
  }, [workoutData?.workoutById]);

  useEffect(() => {
    if (logExerciseData?.addExerciseLog) {
      setDisableLogButton(false);
      toggleBottomSheetRef(false);
      setWorkout(logExerciseData?.addExerciseLog);
      if (preference?.autoStartTimer) {
        toggleTimer(true);
      }
    }
  }, [logExerciseData?.addExerciseLog]);

  useEffect(() => {
    if (updateExerciseLogData?.updateExerciseLog) {
      setDisableLogButton(false);
      toggleBottomSheetRef(false);
      setWorkout(updateExerciseLogData?.updateExerciseLog);
    }
  }, [updateExerciseLogData?.updateExerciseLog]);

  useEffect(() => {
    if (removeExerciseLogData?.removeExerciseLog) {
      workoutById({
        variables: {
          id: props.route.params.workoutId,
        },
      });
    }
  }, [removeExerciseLogData?.removeExerciseLog]);

  const initialLog: ExerciseLogInput = {
    exerciseId: '',
    repetitions:
      preference?.defaultRepetitions || Constants.DEFAULT_REPETITIONS,
    logValue: {
      base: 0,
      fraction: 0,
      unit: preference?.weightUnit || LogUnit.KG,
    },
    zonedDateTimeString: '',
    warmup: false,
  };

  const [exerciseLog, setExerciseLog] = useState<ExerciseLogInput>(initialLog);

  const doLogExercise = (): void => {
    if (
      !workout?.id ||
      !exerciseLog.exerciseId ||
      !exerciseLog.logValue ||
      !exerciseLog.repetitions ||
      exerciseLog.warmup === undefined
    ) {
      return;
    }

    setDisableLogButton(true);

    if (editExistingExercise) {
      updateExerciseLog({
        variables: {
          id: editExistingExercise.id,
          input: {
            exerciseId: exerciseLog.exerciseId,
            repetitions: exerciseLog.repetitions,
            logValue: stripTypenames(exerciseLog.logValue),
            remark: exerciseLog.remark,
            warmup: exerciseLog.warmup,
            zonedDateTimeString: exerciseLog.zonedDateTimeString,
          },
        },
      });
    } else {
      logExercise({
        variables: {
          workoutId: workout.id,
          input: {
            exerciseId: exerciseLog.exerciseId,
            repetitions: exerciseLog.repetitions,
            zonedDateTimeString: moment().toISOString(true),
            logValue: stripTypenames(exerciseLog.logValue),
            warmup: exerciseLog.warmup,
            remark: exerciseLog.remark,
          },
          autoAdjust: autoAdjust,
        },
      });
    }
  };

  const doEndWorkout = (id: string | undefined): void => {
    if (!id) {
      return;
    }
    endWorkout({
      fetchPolicy: 'no-cache',
      variables: {
        workoutId: id,
        zonedDateTimeString: moment().toISOString(true),
      },
    }).finally(() => {
      toggleTimer(false);

      // @ts-ignore
      props.navigation.navigate('WorkoutsOverview', {
        cameFrom: moment().toISOString(true),
      });
    });
  };

  const getLatestLoggedExerciseInCurrentWorkout = (
    id: string,
  ): ExerciseLogFragment | undefined => {
    if (!workout || !workout.groupedExerciseLogs) {
      return;
    }
    const logs = workout.groupedExerciseLogs.find(
      x => x.exercise.id === id,
    )?.logs;
    return logs ? logs[logs.length - 1] : undefined;
  };

  const toggleBottomSheetRef = (show: boolean): void => {
    if (show) {
      setRouteName('draggableBottomOpen');
      bottomSheetRef.current?.present();
    } else {
      setRouteName('draggableBottomClose');
      bottomSheetRef.current?.dismiss();
      setEditExistingExercise(undefined);
    }
  };

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  const getFabActions = (): IActionProps[] => {
    const actions: IActionProps[] = [
      {
        text: timerActive ? 'Clear timer' : 'Start timer',
        icon: <Timer />,
        name: Fab.TIMER,
        color: timerActive
          ? Constants.ERROR_GRADIENT[0]
          : Constants.FAB_ACTION_COLOR,
      },
    ];
    if (
      workout &&
      workout.active &&
      workout.groupedExerciseLogs &&
      workout.groupedExerciseLogs.length > 0
    ) {
      actions.push({
        text: 'Re-log latest log',
        icon: <Retry />,
        name: Fab.RELOG,
        color: Constants.FAB_ACTION_COLOR,
      });
    }
    actions.push({
      text: 'New log',
      icon: <Add />,
      name: Fab.NEWLOG,
      color: Constants.FAB_ACTION_COLOR,
    });
    return actions;
  };

  const getLatestLogByWorkoutOrFetch = (exerciseId: string): void => {
    // Check if we have a log of this id in the workout already
    const latestLogged = getLatestLoggedExerciseInCurrentWorkout(exerciseId);
    if (latestLogged) {
      // Load the last log
      setLatestLogs([]);
      setExerciseLog(prevState => ({
        ...prevState,
        logValue: latestLogged.logValue,
        repetitions: latestLogged.repetitions,
      }));
    } else {
      // Fetch the last log
      latestLogQuery({
        variables: {
          id: exerciseId,
        },
      });
    }
  };

  const toggleTimer = (active: boolean): void => {
    startTimer(active);
  };

  return (
    <GradientBackground>
      {workoutLoading ||
      endWorkoutLoading ||
      removeExerciseLogLoading ||
      reLogLoading ||
      reLogLogLoading ? (
        <Loader />
      ) : workout ? (
        <View style={defaultStyles.container}>
          {workout.groupedExerciseLogs.length === 0 ? (
            <Text style={styles.noExercisesText}>
              Click to + to log your exercises
            </Text>
          ) : (
            <FlatList
              style={styles.flatlist}
              data={workout.groupedExerciseLogs}
              ListHeaderComponent={
                <View style={styles.containerMuscleGroups}>
                  <MuscleGroupList
                    muscleGroups={workout.muscleGroups}
                    alignCenter
                  />
                </View>
              }
              key={dimensions.screen.width}
              keyExtractor={item => dimensions.screen.width + item.exercise.id}
              renderItem={({item}) => (
                <GroupedExerciseLogListItem
                  groupedExercise={item}
                  key={dimensions.screen.width + item.exercise.id}
                  onEditLog={log => {
                    getLatestLogByWorkoutOrFetch(item.exercise.id);
                    setEditExistingExercise(log);
                    setExerciseLog({
                      zonedDateTimeString: log.logDateTime,
                      exerciseId: log.exercise.id,
                      repetitions: log.repetitions,
                      logValue: log.logValue,
                      warmup: log.warmup || false,
                      remark: log.remark,
                    });
                    toggleBottomSheetRef(true);
                  }}
                  onRepeatLog={log => {
                    if (workout?.id) {
                      reLogLog({
                        variables: {
                          workoutId: workout?.id,
                          input: {
                            exerciseId: log.exercise.id,
                            logValue: stripTypenames(log.logValue),
                            warmup: log.warmup || false,
                            remark: log.remark,
                            repetitions: log.repetitions,
                            zonedDateTimeString: moment().toISOString(true),
                          },
                        },
                      });
                    }
                  }}
                  onRemoveLog={setDeleteLogId}
                  onLogPress={log => {
                    getLatestLogByWorkoutOrFetch(item.exercise.id);
                    setEditExistingExercise(log);
                    setExerciseLog({
                      zonedDateTimeString: log.logDateTime,
                      exerciseId: log.exercise.id,
                      repetitions: log.repetitions,
                      logValue: log.logValue,
                      warmup: log.warmup || false,
                      remark: log.remark,
                    });
                    toggleBottomSheetRef(true);
                  }}
                />
              )}
              numColumns={dimensions.screen.width > 500 ? 2 : 1}
            />
          )}
          <PopupModal
            message={'Are you sure you want to remove this log?'}
            isOpen={Boolean(deleteLogId)}
            type={'WARNING'}
            onDismiss={() => setDeleteLogId('')}
            onConfirm={() => {
              removeExerciseLog({
                variables: {
                  exerciseLogId: deleteLogId,
                  autoAdjust,
                },
              });
            }}
          />
        </View>
      ) : (
        <></>
      )}

      {workout && (
        <FloatingButton
          actions={getFabActions()}
          onClose={() => {
            toggleTimerVisibility(false);
          }}
          onOpen={() => {
            toggleTimerVisibility(true);
          }}
          onPressAction={name => {
            switch (name) {
              case Fab.TIMER:
                toggleTimer(!timerActive);
                break;
              case Fab.RELOG:
                reLogLatestLog({
                  variables: {
                    workoutId: workout.id,
                    zonedDateTimeString: moment().toISOString(true),
                    autoAdjust,
                  },
                });
                if (preference?.autoStartTimer) {
                  toggleTimer(true);
                }
                break;
              case Fab.NEWLOG:
                setDisableLogButton(false);
                setExerciseLog(exerciseLog);
                toggleBottomSheetRef(true);
                break;
            }
          }}
        />
      )}
      <BottomSheetModalProvider>
        <CreateExerciseModalContent
          active={createExerciseModal}
          onDismiss={() => setCreateExerciseModal(false)}
          onUpdate={refetchMyExercises}
        />
        <CustomBottomSheet
          ref={bottomSheetRef}
          onDismissClicked={() => toggleBottomSheetRef(false)}
          onLeftTextClicked={() => setCreateExerciseModal(true)}
          rightText={editExistingExercise ? 'Adjust' : 'Log'}
          disableRightText={
            !workout?.id ||
            !exerciseLog.exerciseId ||
            !exerciseLog.logValue ||
            !exerciseLog.repetitions ||
            disableLogButton
          }
          onRightTextClicked={doLogExercise}
          leftText={'Create new exercise'}>
          {myExercisesLoading || logExeciseLoading || updateExeciseLoading ? (
            <Loader style={defaultStyles.container} dark />
          ) : (
            <>
              {!editExistingExercise && (
                <View style={styles.border}>
                  <SelectExercises
                    onSelect={exercise => {
                      // Set only id
                      setExerciseLog(prevState => ({
                        ...prevState,
                        exerciseId: exercise.id,
                      }));
                      getLatestLogByWorkoutOrFetch(exercise.id);
                      setShowPicker(true);
                    }}
                    selectedId={exerciseLog.exerciseId}
                    exercises={myExercises}
                    sort
                  />
                </View>
              )}
              <View pointerEvents={latestLogsLoading ? 'none' : 'auto'}>
                <Loader dark isLoading={latestLogsLoading} />
                {latestLogs && latestLogs.length > 0 ? (
                  <View style={defaultStyles.container}>
                    <Text style={defaultStyles.footnote}>
                      Last set {latestLogs[0].exercise.name} (
                      {moment
                        .utc(latestLogs[0].logDateTime)
                        .format(DATE_TIME_FORMAT)}
                      ):
                    </Text>
                    {latestLogs.map(log => (
                      <Text style={defaultStyles.footnote} key={log.id}>
                        - {log.repetitions} x {logValueToString(log.logValue)}
                        {log.warmup && ' (warmup)'}
                      </Text>
                    ))}
                  </View>
                ) : (
                  <View style={styles.marginTop} />
                )}
                {exerciseLog?.exerciseId && (
                  <>
                    <View style={[styles.border]}>
                      <TouchableOpacity
                        style={[
                          defaultStyles.spaceEvenly,
                          styles.expandableWeightSelectorLabel,
                        ]}
                        onPress={() => setShowPicker(!showPicker)}>
                        <Text style={styles.selectedWeightLabel}>
                          {exerciseLog.repetitions} x{' '}
                          {logValueToString(exerciseLog.logValue)}
                        </Text>
                        <View style={defaultStyles.row}>
                          <Text
                            style={[styles.fontSizeSmall, styles.warmupText]}>
                            Warmup
                          </Text>
                          <Switch
                            value={exerciseLog.warmup}
                            onValueChange={value =>
                              setExerciseLog(prevState => ({
                                ...prevState,
                                warmup: value,
                              }))
                            }
                            ios_backgroundColor={Constants.ERROR_GRADIENT[0]}
                          />
                        </View>
                      </TouchableOpacity>
                      <ExpandableView
                        showChildren={showPicker}
                        contentHeight={225}>
                        <View style={styles.pickerContainer}>
                          <View style={styles.repetition}>
                            <Text
                              style={[
                                defaultStyles.footnote,
                                styles.pickerLabel,
                              ]}>
                              Repetition
                            </Text>
                            <Picker
                              selectedValue={exerciseLog.repetitions}
                              onValueChange={value => {
                                setExerciseLog(prevState => ({
                                  ...prevState,
                                  repetitions: value,
                                }));
                              }}
                              itemStyle={styles.fontSizeSmall}>
                              {Object.keys(Constants.BOTTOM_SHEET_SNAPPOINTS)
                                .splice(1, 100)
                                .map(repetition => (
                                  <Picker.Item
                                    label={repetition}
                                    value={+repetition}
                                    key={`rep_${repetition}`}
                                  />
                                ))}
                            </Picker>
                          </View>
                          <View
                            style={{flex: hideUnitSelector ? 2 : 3}}
                            key={
                              'logvalue_select_' +
                                exerciseLog.logValue.base +
                                exerciseLog.logValue?.fraction ?? 0
                            }>
                            <LogValueSelect
                              onWeightSelected={logValue => {
                                setExerciseLog(prevState => ({
                                  ...prevState,
                                  logValue: logValue,
                                }));
                              }}
                              logValue={exerciseLog.logValue}
                              hideLabel
                            />
                          </View>
                        </View>
                      </ExpandableView>
                    </View>
                  </>
                )}
              </View>
              <BottomSheetTextInput
                defaultValue={exerciseLog?.remark || ''}
                onChangeText={text =>
                  setExerciseLog(prevState => ({
                    ...prevState,
                    remark: text,
                  }))
                }
                style={defaultStyles.textInputWithHeight}
                placeholderTextColor={'darkgrey'}
                placeholder={'Remarks for this log'}
              />
            </>
          )}
        </CustomBottomSheet>
      </BottomSheetModalProvider>
    </GradientBackground>
  );
};
const styles = StyleSheet.create({
  noExercisesText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 100,
  },
  containerMuscleGroups: {
    marginTop: 10,
  },
  repetition: {
    flex: 1,
    marginTop: 20,
  },
  picker: {
    flex: 3,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  selectedWeightLabel: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  pickerLabel: {
    textAlign: 'center',
  },
  marginTop: {
    marginTop: 20,
  },
  fontSizeSmall: {
    fontSize: 14,
  },
  warmupText: {
    marginRight: 10,
    color: 'white',
  },
  flatlist: {
    height: '100%',
  },
  border: {
    borderWidth: 3,
    borderColor: Constants.QUATERNARY_GRADIENT[1],
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    borderBottomWidth: 3,
    borderBottomColor: Constants.PRIMARY_GRADIENT[0],
  },
  expandableWeightSelectorLabel: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    backgroundColor: Constants.QUATERNARY_GRADIENT[1],
  },
});

export default WorkoutDetailScreen;
