import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
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
  useRemoveExerciseLogMutation,
  useUpdateExerciseLogMutation,
  useWorkoutByIdLazyQuery,
  WorkoutLongFragment,
} from '../../graphql/operations';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from '../../components/workouts/MuscleGroupList';
import FloatingButton from '../../components/common/FloatingButton';
import {WorkoutStackParamList} from '../../stacks/WorkoutStack';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
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
import {Add, Retry, Timer} from '../../icons/svg';
import {Fab} from '../../utils/Fab';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetail'>;

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const WorkoutDetailScreen: React.FC<Props> = props => {
  const preference = usePreferenceStore(state => state.preference);
  const hideUnitSelector = preference?.hideUnitSelector || false;
  const autoAdjust = preference?.autoAdjustWorkoutMuscleGroups || false;

  const bottomSheetRef = useRef<BottomSheetModal>(null);

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
  const [logExercise, {data: logExeciseData, loading: logExeciseLoading}] =
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
          setLatestLogs([]);
        }
      },
    });
  const [reLogLatestLog, {loading: reLogLoading}] = useReLogLatestLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.reLogLatestLog) {
        setWorkout(data?.reLogLatestLog);
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
    if (logExeciseData?.addExerciseLog) {
      toggleBottomSheetRef(false);
      setWorkout(logExeciseData?.addExerciseLog);
    }
  }, [logExeciseData?.addExerciseLog]);

  useEffect(() => {
    if (updateExerciseLogData?.updateExerciseLog) {
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
    }).finally(() =>
      // @ts-ignore
      props.navigation.navigate('WorkoutsOverview', {
        cameFrom: moment().toISOString(true),
      }),
    );
  };

  const getLatestLogByExerciseId = (
    id: string,
  ): ExerciseLogFragment | undefined => {
    if (!workout) {
      return;
    }
    const logs = workout.groupedExerciseLogs.find(
      x => x.exercise.id === id,
    )?.logs;
    return logs ? logs[logs.length - 1] : undefined;
  };

  const toggleBottomSheetRef = (show: boolean): void => {
    if (show) {
      bottomSheetRef.current?.present();
    } else {
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

  return (
    <GradientBackground>
      {workoutLoading ||
      endWorkoutLoading ||
      removeExerciseLogLoading ||
      reLogLoading ? (
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
                  onRemoveLog={setDeleteLogId}
                  onLogPress={log => {
                    setExerciseLog(prevState => ({
                      ...prevState,
                      repetitions: log.repetitions,
                      exerciseId: log.exercise.id,
                      logValue: log.logValue,
                      warmup: log.warmup || false,
                      remark: log.remark,
                    }));
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
        <>
          {workout.groupedExerciseLogs &&
            workout.groupedExerciseLogs.length > 0 && (
              <FloatingButton
                actions={[
                  {
                    text: 'Timer',
                    icon: <Timer />,
                    name: Fab.TIMER,
                    color: Constants.FAB_ACTION_COLOR,
                  },
                  {
                    text: 'Re-log latest log',
                    icon: <Retry />,
                    name: Fab.RELOG,
                    color: Constants.FAB_ACTION_COLOR,
                  },
                  {
                    text: 'New log',
                    icon: <Add />,
                    name: Fab.NEWLOG,
                    color: Constants.FAB_ACTION_COLOR,
                  },
                ]}
                onPressAction={name => {
                  switch (name) {
                    case Fab.TIMER:
                      // TODO: start timer
                      break;
                    case Fab.RELOG:
                      reLogLatestLog({
                        variables: {
                          workoutId: workout.id,
                          zonedDateTimeString: moment().toISOString(true),
                          autoAdjust,
                        },
                      });
                      break;
                    case Fab.NEWLOG:
                      setExerciseLog(initialLog);
                      toggleBottomSheetRef(true);
                      break;
                  }
                }}
              />
            )}
        </>
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
          index={90}
          rightText={editExistingExercise ? 'Adjust' : 'Log'}
          disableRightText={
            !workout?.id ||
            !exerciseLog.exerciseId ||
            !exerciseLog.logValue ||
            !exerciseLog.repetitions
          }
          onRightTextClicked={doLogExercise}
          leftText={'Create new exercise'}>
          {myExercisesLoading || logExeciseLoading || updateExeciseLoading ? (
            <Loader dark />
          ) : (
            <>
              {!editExistingExercise && (
                <SelectExercises
                  onSelect={exercise => {
                    setExerciseLog(prevState => ({
                      ...prevState,
                      exerciseId: exercise.id,
                    }));
                    const latestLogged = getLatestLogByExerciseId(exercise.id);
                    if (latestLogged) {
                      setLatestLogs([]);
                      setExerciseLog(prevState => ({
                        ...prevState,
                        logValue: latestLogged.logValue,
                        repetitions: latestLogged.repetitions,
                      }));
                    } else {
                      latestLogQuery({
                        variables: {
                          id: exercise.id,
                        },
                      });
                      setExerciseLog(prevState => ({
                        ...prevState,
                        logValue: initialLog.logValue,
                        repetitions:
                          preference?.defaultRepetitions ||
                          Constants.DEFAULT_REPETITIONS,
                      }));
                    }
                  }}
                  selectedId={exerciseLog.exerciseId}
                  exercises={myExercises}
                  sort
                />
              )}
              {latestLogsLoading ? (
                <Loader dark />
              ) : (
                <>
                  {latestLogs && latestLogs.length > 0 && (
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
                  )}
                  {exerciseLog?.exerciseId && (
                    <>
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
                            onValueChange={value =>
                              setExerciseLog(prevState => ({
                                ...prevState,
                                repetitions: value,
                              }))
                            }
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
                        {/* eslint-disable-next-line react-native/no-inline-styles */}
                        <View style={{flex: hideUnitSelector ? 2 : 3}}>
                          <LogValueSelect
                            onWeightSelected={logValue =>
                              setExerciseLog(prevState => ({
                                ...prevState,
                                logValue: logValue,
                              }))
                            }
                            logValue={exerciseLog.logValue}
                            hideLabel
                          />
                        </View>
                      </View>
                      <View
                        style={[defaultStyles.spaceEvenly, styles.marginTop]}>
                        <Text style={styles.selectedWeightLabel}>
                          {exerciseLog.repetitions} x{' '}
                          {logValueToString(exerciseLog.logValue)}
                        </Text>
                        <View style={defaultStyles.row}>
                          <Text
                            style={[
                              styles.fontSizeSmall,
                              styles.warmupText,
                              !exerciseLog.warmup ? styles.warmupDisabled : {},
                            ]}>
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
                          />
                        </View>
                      </View>
                    </>
                  )}
                </>
              )}
              <TextInput
                defaultValue={exerciseLog?.remark || ''}
                onChangeText={text =>
                  setExerciseLog(prevState => ({
                    ...prevState,
                    remark: text,
                  }))
                }
                style={defaultStyles.textAreaInput}
                placeholder={'Remarks for this log'}
                multiline
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
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  selectedWeightLabel: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  warmupDisabled: {
    color: '#cccccc',
  },
  flatlist: {
    height: '100%',
  },
});

export default WorkoutDetailScreen;
