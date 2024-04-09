import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GradientBackground from '../../components/common/GradientBackground';
import {
  ExerciseFragment,
  ExerciseLogFragment,
  ExerciseLogInput,
  LatestLogsByExerciseIdAndNotWorkoutIdQuery,
  LogUnit,
  useAddExerciseLogMutation,
  useEndWorkoutMutation,
  useLatestLogsByExerciseIdAndNotWorkoutIdLazyQuery,
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
import HeaderLabel from '../../components/nav/headerComponents/HeaderLabel';
import usePreferenceStore from '../../stores/preferenceStore';
import LogValueSelect from '../../components/common/LogValueSelect';
import {Picker} from '@react-native-picker/picker';
import {logValueToString} from '../../utils/String';
import Loader from '../../components/common/Loader';
import {stripTypenames} from '../../utils/GrahqlUtils';
import {nonNullable} from '../../utils/List';
import ConfirmModal from '../../components/common/ConfirmModal';
import ExpandableView from '../../components/common/ExpandableView';
import {Add, Retry, Timer} from '../../icons/svg';
import {Fab} from '../../utils/Fab';
import {IActionProps} from 'react-native-floating-action';
import useTimerStore from '../../stores/timerStore';
import useRouteStore from '../../stores/routeStore';
import {DATE_TIME_FORMAT, getDifferenceInMinutes} from '../../utils/Date';
import AppText from '../../components/common/AppText';
import useAppleHealthKit from '../../hooks/useAppleHealthKit';
import AppModal from '../../components/common/AppModal';
import GradientButton from '../../components/common/GradientButton';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetail'>;

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const WorkoutDetailScreen: React.FC<Props> = props => {
  // Store hooks
  const toggleTimerVisibility = useTimerStore(state => state.toggleVisibility);
  const timerActive = useTimerStore(state => state.timerActive);
  const startTimer = useTimerStore(state => state.startTimer);
  const preference = usePreferenceStore(state => state.preference);
  const setRouteName = useRouteStore(state => state.setRouteName);
  const {checkHealthKitStatus, saveWorkoutAppleHealthKit, getCaloriesBurned} =
    useAppleHealthKit();

  // State hooks
  const hideUnitSelector = preference?.hideUnitSelector || false;
  const autoAdjust = preference?.autoAdjustWorkoutMuscleGroups || false;

  // Refs
  const flatListRef = useRef<FlatList>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // State
  const [overrulePreviousHealthKitSave, setOverrulePreviousHealthKitSave] =
    useState(false);
  const [calorieBurned, setCalorieBurned] = useState(0);
  const [calorieBurnedEditing, setCalorieBurnedEditing] = useState(false);
  const [isHealthKitEnabled, setIsHealthKitEnabled] = useState(false);
  const [hasLogInThisWorkout, setHasLogInThisWorkout] = useState(false);
  const [disableLogButton, setDisableLogButton] = useState(false);
  const [showPicker, setShowPicker] = useState(true);
  const [deleteLogId, setDeleteLogId] = useState('');
  const [endWorkoutClicked, setEndWorkoutClicked] = useState(false);
  const [createExerciseModal, setCreateExerciseModal] = useState(false);
  const [workout, setWorkout] = useState<WorkoutLongFragment>();
  const [latestLogs, setLatestLogs] = useState<ExerciseLogFragment[]>([]);
  const [editExistingExercise, setEditExistingExercise] =
    useState<ExerciseLogFragment>();
  const [myExercises, setMyExercises] = useState<ExerciseFragment[]>([]);

  // Get my exercises
  const {loading: myExercisesLoading, refetch: refetchMyExercises} =
    useMyExercisesQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        setMyExercises(data?.myExercises || []);
      },
    });

  // Get workout by id
  const [workoutById, {data: workoutData, loading: workoutLoading}] =
    useWorkoutByIdLazyQuery({fetchPolicy: 'no-cache'});

  // Log exercise
  const [logExercise, {data: logExerciseData, loading: logExeciseLoading}] =
    useAddExerciseLogMutation({fetchPolicy: 'no-cache'});

  // Update exercise log
  const [
    updateExerciseLog,
    {data: updateExerciseLogData, loading: updateExeciseLoading},
  ] = useUpdateExerciseLogMutation({fetchPolicy: 'no-cache'});

  // End workout
  const [endWorkout, {loading: endWorkoutLoading}] = useEndWorkoutMutation();

  // Remove exercise log
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

  // Get latest logs by exercise id in other workout
  const [latestLogQuery, {loading: latestLogsLoading}] =
    useLatestLogsByExerciseIdAndNotWorkoutIdLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: (data: LatestLogsByExerciseIdAndNotWorkoutIdQuery) => {
        // If available, set the last log
        if (data?.latestLogsByExerciseIdAndNotWorkoutId) {
          setHasLogInThisWorkout(true);
          setLatestLogs(
            data.latestLogsByExerciseIdAndNotWorkoutId
              .filter(nonNullable)
              .sort(
                (a, b) =>
                  new Date(a.logDateTime).getTime() -
                  new Date(b.logDateTime).getTime(),
              ),
          );
        } else {
          if (!hasLogInThisWorkout) {
            setExerciseLog(prevState => ({
              ...initialLog,
              exerciseId: prevState.exerciseId,
            }));
          }
          setLatestLogs([]);
        }
      },
    });

  // Re-log latest log
  const [reLogLatestLog, {loading: reLogLoading}] = useReLogLatestLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.reLogLatestLog) {
        setWorkout(data.reLogLatestLog);
      }
    },
  });

  // Re-log selected log
  const [reLogLog, {loading: reLogLogLoading}] = useReLogLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.reLogLog) {
        setWorkout(data.reLogLog);
      }
    },
  });

  // Set title
  useEffect(() => {
    if (!workoutData?.workoutById) {
      props.navigation.setOptions({
        headerTitle: '',
      });
    }
  }, []);

  // Get workout by param id
  useEffect(() => {
    if (props.route.params.workoutId) {
      workoutById({
        variables: {
          id: props.route.params.workoutId,
        },
      });
    }
  }, [props.route.params.workoutId]);

  // Set workout and title
  useEffect(() => {
    if (workoutData?.workoutById) {
      setWorkout(workoutData?.workoutById);
      props.navigation.setOptions({
        headerTitle: workoutData?.workoutById?.name,
      });
      if (workoutData?.workoutById?.active && workoutData?.workoutById?.id) {
        props.navigation.setOptions({
          headerRight: () => (
            <HeaderLabel
              label={'End Workout'}
              color={'red'}
              onPress={() => setEndWorkoutClicked(true)}
            />
          ),
        });
      }
    }
  }, [workoutData?.workoutById]);

  // Set workout after log
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

  // Set workout after update log
  useEffect(() => {
    if (updateExerciseLogData?.updateExerciseLog) {
      setDisableLogButton(false);
      toggleBottomSheetRef(false);
      setWorkout(updateExerciseLogData?.updateExerciseLog);
    }
  }, [updateExerciseLogData?.updateExerciseLog]);

  // Set workout after removeing log
  useEffect(() => {
    if (removeExerciseLogData?.removeExerciseLog) {
      workoutById({
        variables: {
          id: props.route.params.workoutId,
        },
      });
    }
  }, [removeExerciseLogData?.removeExerciseLog]);

  // Define initial log
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

  // Log exercise
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
            zonedDateTimeString: editExistingExercise.logDateTime,
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

  // End workout
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
      onCompleted: data => {
        if (data?.endWorkout) {
          console.log('[WorkoutDetailScreen] Successfully ended workout');
          toggleTimer(false);
          // Save workout to Apple HealthKit if healthkit is enabled, calories burned is greater than 0 and workout is not already saved in HealthKit or user overrules previous save
          if (
            isHealthKitEnabled &&
            calorieBurned > 0 &&
            ((workout?.externalHealthProviderData !== undefined &&
              overrulePreviousHealthKitSave) ||
              !workout?.externalHealthProviderData)
          ) {
            saveWorkoutAppleHealthKit(data.endWorkout, calorieBurned);
          }
          // @ts-ignore
          props.navigation.navigate('WorkoutsOverview', {
            cameFrom: moment().toISOString(true),
          });
        }
      },
      onError: error => {
        console.log('Error ending workout', error);
      },
    });
  };

  // Toggle bottom sheet
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

  // Get dimensions
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  // Listen to orientation change
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  // Define FAB actions
  const getFabActions = (): IActionProps[] => {
    const isIOS = Platform.OS === 'ios';

    const actions: IActionProps[] = [
      {
        text: timerActive ? 'Clear timer' : 'Start timer',
        icon: isIOS ? <Timer /> : require('../../icons/timer.png'),
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
        icon: isIOS ? <Retry /> : require('../../icons/redo.png'),
        name: Fab.RELOG,
        color: Constants.FAB_ACTION_COLOR,
      });
    }
    actions.push({
      text: 'New log',
      icon: isIOS ? <Add /> : require('../../icons/plus.png'),
      name: Fab.NEWLOG,
      color: Constants.FAB_ACTION_COLOR,
    });
    return actions;
  };

  // Preset exercise log with last logged from this workout
  const presetExerciseLogWithThisWorkoutAndUpdateLastLogged = (
    exerciseId: string,
  ): void => {
    if (!workout?.id || !workout?.groupedExerciseLogs) {
      return;
    }

    // Get last logged from this workout
    const latestCurrentLogById = [...workout.groupedExerciseLogs]
      .flatMap(it => it.logs)
      .filter(it => it.exercise.id.toLowerCase() === exerciseId.toLowerCase())
      .sort(
        (a, b) =>
          new Date(b.logDateTime).getTime() - new Date(a.logDateTime).getTime(),
      )[0];

    setHasLogInThisWorkout(!!latestCurrentLogById);

    // If found, preset it
    if (latestCurrentLogById) {
      setExerciseLog({
        exerciseId: latestCurrentLogById.exercise.id,
        warmup: latestCurrentLogById.warmup ?? false,
        zonedDateTimeString: moment().toISOString(true),
        remark: latestCurrentLogById.remark,
        logValue: latestCurrentLogById.logValue,
        repetitions: latestCurrentLogById.repetitions,
      });
    }

    // Update text with stats from last workout that is not this but same exercisedetails
    latestLogQuery({
      variables: {
        id: exerciseId,
        workoutId: workout.id,
      },
    });
  };

  // Toggle timer
  const toggleTimer = (active: boolean): void => {
    startTimer(active);
  };

  // Get latest log
  const getLatestCurrentLog = (): ExerciseLogFragment | null => {
    if (!workout?.groupedExerciseLogs) {
      return null;
    }
    return [...workout.groupedExerciseLogs]
      .flatMap(it => it.logs)
      .sort(
        (a, b) =>
          new Date(b.logDateTime).getTime() - new Date(a.logDateTime).getTime(),
      )[0];
  };

  // Fetch and store HealthKitStatus in state
  useEffect(() => {
    if (endWorkoutClicked) {
      checkHealthKitStatus().then(setIsHealthKitEnabled);
    }
  }, [endWorkoutClicked]);

  // If HealthKit is enabled, calculate burned calories
  useEffect(() => {
    const latestLog = getLatestCurrentLog();
    if (isHealthKitEnabled && latestLog && workout?.startDateTime) {
      getCaloriesBurned(
        getDifferenceInMinutes(workout.startDateTime, latestLog.logDateTime),
      ).then(setCalorieBurned);
    }
  }, [isHealthKitEnabled, workout?.groupedExerciseLogs]);

  const loading =
    workoutLoading ||
    endWorkoutLoading ||
    removeExerciseLogLoading ||
    reLogLoading ||
    reLogLogLoading;

  useEffect(() => {
    if (loading && flatListRef?.current) {
      flatListRef?.current?.scrollToEnd({animated: true});
    }
  }, [loading]);

  return (
    <GradientBackground>
      {loading ? (
        <Loader />
      ) : workout ? (
        <View style={defaultStyles.container}>
          {workout.groupedExerciseLogs.length === 0 ? (
            <AppText style={styles.noExercisesText}>
              Click to + to log your exercises
            </AppText>
          ) : (
            <FlatList
              ref={flatListRef}
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
                    presetExerciseLogWithThisWorkoutAndUpdateLastLogged(
                      item.exercise.id,
                    );
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
                      if (preference?.autoStartTimer) {
                        toggleTimer(true);
                      }
                    }
                  }}
                  onRemoveLog={setDeleteLogId}
                  onLogPress={log => {
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
          <ConfirmModal
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
          <AppModal
            isVisible={Boolean(endWorkoutClicked)}
            onDismiss={() => {
              setEndWorkoutClicked(false);
              setCalorieBurnedEditing(false);
            }}>
            <Pressable
              onPress={() => setCalorieBurnedEditing(false)}
              style={[defaultStyles.container]}>
              <AppText h4 centerText>
                Are you sure you want to end this workout?
              </AppText>

              {isHealthKitEnabled && (
                <View style={defaultStyles.marginTop50}>
                  {workout.externalHealthProviderData && (
                    <View>
                      <AppText xSmall centerText>
                        This workout is already saved in Apple HealthKit. If you
                        wish to save this workout again, please remove the first
                        save from Apple Health first to prevent a double entry.
                      </AppText>
                      <View
                        style={[
                          defaultStyles.row,
                          defaultStyles.centerInRow,
                          defaultStyles.marginTop,
                        ]}>
                        <Switch
                          value={overrulePreviousHealthKitSave}
                          onValueChange={setOverrulePreviousHealthKitSave}
                          ios_backgroundColor={Constants.ERROR_GRADIENT[0]}
                        />
                        <View style={defaultStyles.marginHorizontal}>
                          <AppText>I wish to sync this workout again.</AppText>
                        </View>
                      </View>
                    </View>
                  )}
                  {((workout.externalHealthProviderData &&
                    overrulePreviousHealthKitSave) ||
                    !workout.externalHealthProviderData) && (
                    <View style={defaultStyles.marginTop50}>
                      <AppText centerText>Estimated burned calories</AppText>
                      <View
                        style={[
                          defaultStyles.row,
                          defaultStyles.justifyCenter,
                          defaultStyles.marginTop,
                        ]}>
                        {calorieBurnedEditing ? (
                          <TextInput
                            autoFocus
                            defaultValue={calorieBurned.toString()}
                            style={[
                              defaultStyles.whiteTextColor,
                              styles.calorieBurnedInput,
                            ]}
                            keyboardType={'numeric'}
                            cursorColor={'white'}
                            placeholder={''}
                            maxLength={4}
                            onBlur={() => setCalorieBurnedEditing(false)}
                            onChangeText={text =>
                              setCalorieBurned(parseInt(text, 10))
                            }
                          />
                        ) : (
                          <HeaderLabel
                            label={calorieBurned.toString()}
                            onPress={() =>
                              setCalorieBurnedEditing(!calorieBurnedEditing)
                            }
                          />
                        )}
                        <AppText> kcal</AppText>
                      </View>
                      <AppText
                        xSmall
                        centerText
                        T1
                        style={defaultStyles.marginTop}>
                        The calculation for burned calories was based on the
                        your gender, weight, and workout duration.
                      </AppText>
                    </View>
                  )}
                </View>
              )}
              <View
                style={[defaultStyles.centerInRow, defaultStyles.marginTop50]}>
                <View style={defaultStyles.marginBottom}>
                  <GradientButton
                    styles={styles.buttonWidth}
                    title={'End workout'}
                    onPress={() => doEndWorkout(workoutData?.workoutById?.id)}
                    gradients={Constants.TERTIARY_GRADIENT}
                  />
                </View>
                <HeaderLabel
                  label={'Cancel'}
                  onPress={() => setEndWorkoutClicked(false)}
                />
              </View>
            </Pressable>
          </AppModal>
        </View>
      ) : (
        <></>
      )}

      {workout &&
        workoutData?.workoutById?.active &&
        workoutData?.workoutById?.id && (
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
                  // Enable log button
                  setDisableLogButton(false);

                  // Set the exercisedetails log to be the last logged exercisedetails of this workout
                  const lastLogged = getLatestCurrentLog();
                  if (lastLogged) {
                    setExerciseLog({
                      zonedDateTimeString: lastLogged.logDateTime,
                      exerciseId: lastLogged.exercise.id,
                      repetitions: lastLogged.repetitions,
                      logValue: lastLogged.logValue,
                      warmup: lastLogged.warmup ?? false,
                      remark: lastLogged.remark,
                    });
                  }

                  if (lastLogged?.exercise?.id) {
                    // Get latest logs from previous workout
                    presetExerciseLogWithThisWorkoutAndUpdateLastLogged(
                      lastLogged.exercise.id,
                    );
                  }
                  // Show bottom sheet
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
          onUpdate={() => refetchMyExercises()}
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
          leftText={'Create exercise'}>
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
                      presetExerciseLogWithThisWorkoutAndUpdateLastLogged(
                        exercise.id,
                      );
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
                  <View
                    style={[
                      defaultStyles.marginTop,
                      defaultStyles.marginBottom,
                    ]}>
                    <View style={defaultStyles.marginBottom}>
                      <AppText style={defaultStyles.blackTextColor}>
                        Last set {latestLogs[0].exercise.name} on{' '}
                        {moment
                          .utc(latestLogs[0].logDateTime)
                          .format(DATE_TIME_FORMAT)}
                      </AppText>
                    </View>

                    <View>
                      <ScrollView style={defaultStyles.marginBottom} horizontal>
                        {latestLogs.map(log => (
                          <TouchableOpacity
                            key={log.id}
                            style={styles.lastLoggedButtonsView}
                            onPress={() => {
                              setExerciseLog({
                                exerciseId: log.exercise.id,
                                warmup: log.warmup ?? false,
                                zonedDateTimeString: moment().toISOString(true),
                                remark: log.remark,
                                logValue: log.logValue,
                                repetitions: log.repetitions,
                              });
                            }}>
                            <AppText style={styles.lastLoggedButtons}>
                              {log.repetitions} x{' '}
                              {logValueToString(log.logValue)}
                            </AppText>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                ) : (
                  <View style={styles.marginTop} />
                )}
                {exerciseLog?.exerciseId && (
                  <>
                    <View style={styles.border}>
                      <TouchableOpacity
                        style={[
                          defaultStyles.spaceEvenly,
                          styles.expandableWeightSelectorLabel,
                        ]}
                        onPress={() => setShowPicker(!showPicker)}>
                        <AppText style={styles.selectedWeightLabel}>
                          {exerciseLog.repetitions} x{' '}
                          {logValueToString(exerciseLog.logValue)}
                        </AppText>
                        <View style={defaultStyles.row}>
                          <AppText
                            style={[styles.fontSizeSmall, styles.warmupText]}>
                            Warmup
                          </AppText>
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
                            <AppText
                              style={[
                                defaultStyles.footnote,
                                styles.pickerLabel,
                              ]}>
                              Repetition
                            </AppText>
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
  lastLoggedButtonsView: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    width: 105,
    padding: 5,
    backgroundColor: Constants.QUATERNARY_GRADIENT[1],
    marginRight: 5,
  },
  lastLoggedButtons: {
    color: 'white',
    textAlign: 'center',
  },
  buttonWidth: {
    width: 200,
  },
  calorieBurnedInput: {},
});

export default WorkoutDetailScreen;
