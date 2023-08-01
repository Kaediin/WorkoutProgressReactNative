import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import GradientBackground from '../../components/common/GradientBackground';
import {
  ExerciseLogFragment,
  ExerciseLogInput,
  useAddExerciseLogMutation,
  useEndWorkoutMutation,
  useMyExercisesQuery,
  useRemoveExerciseLogMutation,
  useUpdateExerciseLogMutation,
  useWorkoutByIdLazyQuery,
  WeightUnit,
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
import GradientButton from '../../components/common/GradientButton';
import moment from 'moment';
import GroupedExerciseLogListItem from '../../components/exercise/GroupedExerciseLogListItem';
import CreateExerciseModalContent from '../../components/bottomSheet/CreateExerciseModalContent';
import EndWorkout from '../../components/nav/headerComponents/EndWorkout';
import usePreferenceStore from '../../stores/preferenceStore';
import WeightSelect from '../../components/common/WeightSelect';
import {Picker} from '@react-native-picker/picker';
import {weightValueToString} from '../../utils/String';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetail'>;

const WorkoutDetailScreen: React.FC<Props> = props => {
  const preference = usePreferenceStore(state => state.preference);
  const hideUnitSelector = preference?.hideUnitSelector || false;
  const autoAdjust = preference?.autoAdjustWorkoutMuscleGroups || false;

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [createExerciseModal, setCreateExerciseModal] = useState(false);
  const [workout, setWorkout] = useState<WorkoutLongFragment>();
  const [editExistingExercise, setEditExistingExercise] =
    useState<ExerciseLogFragment>();

  const {
    data: myExercisesData,
    loading: myExercisesLoading,
    refetch: refetchMyExercises,
  } = useMyExercisesQuery({fetchPolicy: 'no-cache'});
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
  ] = useRemoveExerciseLogMutation({fetchPolicy: 'no-cache'});

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

  const [exerciseLog, setExerciseLog] = useState<ExerciseLogInput>({
    exerciseId: '',
    repetitions:
      preference?.defaultRepetitions || Constants.DEFAULT_REPETITIONS,
    weightLeft: {
      baseWeight: 0,
      unit: preference?.unit || WeightUnit.KG,
    },
    weightRight: {
      baseWeight: 0,
      unit: preference?.unit || WeightUnit.KG,
    },
    zonedDateTimeString: '',
    warmup: false,
  });

  const doLogExercise = (): void => {
    if (
      !workout?.id ||
      !exerciseLog.exerciseId ||
      !exerciseLog.weightRight ||
      !exerciseLog.weightLeft ||
      !exerciseLog.repetitions ||
      exerciseLog.warmup === undefined
    ) {
      return;
    }

    if (editExistingExercise) {
      updateExerciseLog({
        variables: {
          id: editExistingExercise.id,
          input: exerciseLog,
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
            weightLeft: exerciseLog.weightLeft,
            weightRight: exerciseLog.weightLeft,
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

  return (
    <GradientBackground>
      {workoutLoading || endWorkoutLoading || removeExerciseLogLoading ? (
        <ActivityIndicator />
      ) : workout ? (
        <View style={defaultStyles.container}>
          {workout.groupedExerciseLogs.length === 0 ? (
            <Text style={styles.noExercisesText}>
              Click to + to log your exercises
            </Text>
          ) : (
            <FlatList
              data={workout.groupedExerciseLogs}
              ListHeaderComponent={
                <View style={styles.containerMuscleGroups}>
                  <MuscleGroupList
                    muscleGroups={workout.muscleGroups}
                    alignCenter
                  />
                </View>
              }
              renderItem={({item}) => (
                <GroupedExerciseLogListItem
                  groupedExercise={item}
                  key={item.exercise.id}
                  onEditLog={log => {
                    setEditExistingExercise(log);
                    setExerciseLog({
                      zonedDateTimeString: log.logDateTime,
                      exerciseId: log.exercise.id,
                      repetitions: log.repetitions,
                      weightRight: log.weightValueRight,
                      weightLeft: log.weightValueLeft,
                      warmup: log.warmup || false,
                      remark: log.remark,
                    });
                    toggleBottomSheetRef(true);
                  }}
                  onRemoveLog={id =>
                    removeExerciseLog({
                      variables: {
                        exerciseLogId: id,
                        autoAdjust,
                      },
                    })
                  }
                  onLogPress={log => {
                    setExerciseLog(prevState => ({
                      ...prevState,
                      repetitions: log.repetitions,
                      exerciseId: log.exercise.id,
                      weightLeft: log.weightValueLeft,
                      warmup: log.warmup || false,
                      remark: log.remark,
                    }));
                    toggleBottomSheetRef(true);
                  }}
                />
              )}
            />
          )}
        </View>
      ) : (
        <></>
      )}
      {workout && <FloatingButton onClick={() => toggleBottomSheetRef(true)} />}
      <BottomSheetModalProvider>
        <CreateExerciseModalContent
          active={createExerciseModal}
          onDismiss={added => {
            if (added) {
              refetchMyExercises();
            }
            setCreateExerciseModal(false);
          }}
          onUpdate={() => refetchMyExercises()}
        />
        <CustomBottomSheet
          ref={bottomSheetRef}
          onCloseClicked={() => toggleBottomSheetRef(false)}
          index={70}>
          {myExercisesLoading || logExeciseLoading || updateExeciseLoading ? (
            <ActivityIndicator />
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
                      setExerciseLog(prevState => ({
                        ...prevState,
                        weightLeft: latestLogged.weightValueLeft,
                        weightRight: latestLogged.weightValueRight,
                        repetitions: latestLogged.repetitions,
                      }));
                    } else {
                      setExerciseLog(prevState => ({
                        ...prevState,
                        weightLeft: {
                          baseWeight: 0,
                          unit: preference?.unit || WeightUnit.KG,
                        },
                        weightRight: {
                          baseWeight: 0,
                          unit: preference?.unit || WeightUnit.KG,
                        },
                        repetitions:
                          preference?.defaultRepetitions ||
                          Constants.DEFAULT_REPETITIONS,
                      }));
                    }
                  }}
                  selectedId={exerciseLog.exerciseId}
                  exercises={myExercisesData?.myExercises || []}
                  onCreateExerciseClick={() => setCreateExerciseModal(true)}
                  sortByMuscleGroups={workout?.muscleGroups}
                />
              )}
              {exerciseLog?.exerciseId && (
                <>
                  <View style={styles.pickerContainer}>
                    <View style={styles.repetition}>
                      <Text
                        style={[defaultStyles.footnote, styles.pickerLabel]}>
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
                      <WeightSelect
                        onWeightSelected={weight =>
                          setExerciseLog(prevState => ({
                            ...prevState,
                            weightLeft: weight,
                          }))
                        }
                        weightValue={exerciseLog.weightLeft}
                        hideLabel
                      />
                    </View>
                  </View>
                  <View style={defaultStyles.spaceEvenly}>
                    <Text style={styles.selectedWeightLabel}>
                      {exerciseLog.repetitions} x{' '}
                      {weightValueToString(exerciseLog.weightLeft)}
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
              <GradientButton
                disabled={
                  !workout?.id ||
                  !exerciseLog.exerciseId ||
                  !exerciseLog.weightRight ||
                  !exerciseLog.weightLeft ||
                  !exerciseLog.repetitions
                }
                styles={styles.button}
                title={editExistingExercise ? 'Adjust' : 'Log'}
                onClick={doLogExercise}
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
  },
  pickerLabel: {
    textAlign: 'center',
  },
  button: {
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
});

export default WorkoutDetailScreen;
