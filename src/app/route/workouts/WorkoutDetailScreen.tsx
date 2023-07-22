import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import GradientBackground from '../../components/common/GradientBackground';
import {
  ExerciseLogFragment,
  ExerciseLogInput,
  useAddExerciseLogToWorkoutMutation,
  useEndWorkoutMutation,
  useMyExercisesQuery,
  useRemoveExerciseLogMutation,
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
import {Picker} from '@react-native-picker/picker';
import Constants from '../../utils/Constants';
import GradientButton from '../../components/common/GradientButton';
import moment from 'moment';
import GroupedExerciseLogListItem from '../../components/exercise/ExerciseLogListItem';
import CreateExerciseModalContent from '../../components/bottomSheet/CreateExerciseModalContent';
import EndWorkout from '../../components/nav/headerComponents/EndWorkout';
import usePreferenceStore from '../../stores/preferenceStore';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetail'>;

const WorkoutDetailScreen: React.FC<Props> = props => {
  const preference = usePreferenceStore(state => state.preference);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [createExerciseModal, setCreateExerciseModal] = useState(false);
  const [workout, setWorkout] = useState<WorkoutLongFragment>();
  const [editExistingExercise, setEditExistingExercise] = useState(false);

  const {
    data: myExercisesData,
    loading: myExercisesLoading,
    refetch: refetchMyExercises,
  } = useMyExercisesQuery({fetchPolicy: 'no-cache'});
  const [workoutById, {data: workoutData, loading: workoutLoading}] =
    useWorkoutByIdLazyQuery({fetchPolicy: 'no-cache'});
  const [logExecise, {data: logExeciseData, loading: logExeciseLoading}] =
    useAddExerciseLogToWorkoutMutation({fetchPolicy: 'no-cache'});
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
    if (logExeciseData?.addExerciseLogToWorkout) {
      toggleBottomSheetRef(false);
      setWorkout(logExeciseData?.addExerciseLogToWorkout);
    }
  }, [logExeciseData?.addExerciseLogToWorkout]);

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
    weightLeft: 1,
    weightRight: 1,
    zonedDateTimeString: '',
    unit: preference?.unit || WeightUnit.KG,
  });

  const logExercise = (): void => {
    if (
      !workout?.id ||
      !exerciseLog.exerciseId ||
      !exerciseLog.weightRight ||
      !exerciseLog.weightLeft ||
      !exerciseLog.repetitions ||
      !exerciseLog.unit
    ) {
      return;
    }

    logExecise({
      variables: {
        workoutId: workout.id,
        input: {
          exerciseId: exerciseLog.exerciseId,
          repetitions: exerciseLog.repetitions,
          zonedDateTimeString: moment().toISOString(true),
          weightLeft: exerciseLog.weightLeft,
          weightRight: exerciseLog.weightLeft,
          unit: exerciseLog.unit,
          remark: exerciseLog.remark,
        },
      },
    });
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
      setEditExistingExercise(false);
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
                    setEditExistingExercise(true);
                    setExerciseLog({
                      zonedDateTimeString: log.logDateTime,
                      exerciseId: log.exercise.id,
                      repetitions: log.repetitions,
                      weightRight: log.weightRight,
                      weightLeft: log.weightLeft,
                      unit: log.unit,
                      remark: log.remark,
                    });
                    toggleBottomSheetRef(true);
                  }}
                  onRemoveLog={id =>
                    removeExerciseLog({
                      variables: {
                        exerciseLogId: id,
                      },
                    })
                  }
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
          onDismiss={() => toggleBottomSheetRef(false)}
          index={70}>
          {myExercisesLoading || logExeciseLoading ? (
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
                        unit: latestLogged.unit,
                        weightLeft: latestLogged.weightLeft,
                        weightRight: latestLogged.weightRight,
                        repetitions: latestLogged.repetitions,
                      }));
                    } else {
                      setExerciseLog(prevState => ({
                        ...prevState,
                        unit: preference?.unit || WeightUnit.KG,
                        weightLeft: 1,
                        weightRight: 1,
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
                    <View style={styles.pickerStyles}>
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
                    <View style={styles.pickerStyles}>
                      <Text
                        style={[defaultStyles.footnote, styles.pickerLabel]}>
                        Weight
                      </Text>
                      <Picker
                        selectedValue={
                          +(
                            exerciseLog.weightLeft.toString().split('.')[0] ?? 0
                          )
                        }
                        onValueChange={value =>
                          setExerciseLog(prevState => ({
                            ...prevState,
                            weightLeft: parseFloat(
                              `${value}.${
                                prevState.weightLeft.toString().split('.')[1]
                              }`,
                            ),
                          }))
                        }
                        itemStyle={styles.fontSizeSmall}>
                        {Constants.WEIGHT_POINTS.map(weight => (
                          <Picker.Item
                            label={weight}
                            value={+weight}
                            key={`weight_${weight}`}
                          />
                        ))}
                      </Picker>
                    </View>
                    <View style={styles.pickerStyles}>
                      <Text
                        style={[defaultStyles.footnote, styles.pickerLabel]}>
                        Fraction
                      </Text>
                      <Picker
                        selectedValue={parseFloat(
                          `0.${
                            exerciseLog.weightLeft.toString().split('.')[1] ?? 0
                          }`,
                        )}
                        onValueChange={value =>
                          setExerciseLog(prevState => ({
                            ...prevState,
                            weightLeft: parseFloat(
                              `${
                                prevState.weightLeft.toString().split('.')[0]
                              }.${value.toString().split('.')[1]}`,
                            ),
                          }))
                        }
                        itemStyle={styles.fontSizeSmall}>
                        {Constants.WEIGHT_FRACTION_POINTS.map(fraction => (
                          <Picker.Item
                            label={fraction.toString()}
                            value={+fraction}
                            key={`fraction_${fraction}`}
                          />
                        ))}
                      </Picker>
                    </View>
                    <View style={styles.pickerStyles}>
                      <Text
                        style={[defaultStyles.footnote, styles.pickerLabel]}>
                        Unit
                      </Text>
                      <Picker
                        selectedValue={exerciseLog.unit}
                        onValueChange={unit =>
                          setExerciseLog(prevState => ({
                            ...prevState,
                            unit: unit,
                          }))
                        }
                        itemStyle={styles.fontSizeSmall}>
                        {Object.keys(WeightUnit).map(unit => (
                          <Picker.Item
                            label={unit}
                            value={unit}
                            key={`unit_${unit}`}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                  <Text style={styles.selectedWeightLabel}>
                    {exerciseLog.repetitions} x {exerciseLog.weightLeft}{' '}
                    {exerciseLog.unit}
                  </Text>
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
                style={defaultStyles.remarkInput}
                placeholder={'Remarks for this log'}
                multiline
              />
              <GradientButton
                disabled={
                  !workout?.id ||
                  !exerciseLog.exerciseId ||
                  !exerciseLog.weightRight ||
                  !exerciseLog.weightLeft ||
                  !exerciseLog.repetitions ||
                  !exerciseLog.unit
                }
                styles={styles.button}
                title={editExistingExercise ? 'Adjust' : 'Log'}
                onClick={logExercise}
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
  pickerStyles: {
    width: '25%',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
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
    marginTop: 50,
  },
  fontSizeSmall: {
    fontSize: 14,
  },
});

export default WorkoutDetailScreen;
