import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GradientBackground from '../../components/common/GradientBackground';
import {
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
import CreateExerciseModal from '../../components/exercise/CreateExerciseModal';
import EndWorkout from '../../components/nav/headerComponents/EndWorkout';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetail'>;

const WorkoutDetailScreen: React.FC<Props> = props => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [createExerciseModal, setCreateExerciseModal] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<number>(1);
  const [selectedFraction, setSelectedFraction] = useState<number>(0);
  const [workout, setWorkout] = useState<WorkoutLongFragment>();

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
    }
  }, [workoutData?.workoutById]);

  useEffect(() => {
    if (logExeciseData?.addExerciseLogToWorkout) {
      bottomSheetRef?.current?.dismiss();
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
    repetitions: 12,
    weightLeft: 1,
    weightRight: 1,
    zonedDateTimeString: moment().toISOString(true),
    unit: WeightUnit.KG,
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
    const weight: number = parseFloat(
      `${selectedWeight}.${selectedFraction.toString().slice(2) ?? 0}`,
    );
    logExecise({
      variables: {
        workoutId: workout.id,
        input: {
          exerciseId: exerciseLog.exerciseId,
          repetitions: exerciseLog.repetitions,
          zonedDateTimeString: exerciseLog.zonedDateTimeString,
          weightLeft: weight,
          weightRight: weight,
          unit: exerciseLog.unit,
        },
      },
    });
  };

  const doEndWorkout = (): void => {
    if (!workout?.id) {
      return;
    }
    endWorkout({
      fetchPolicy: 'no-cache',
      variables: {
        workoutId: workout.id,
        zonedDateTimeString: moment().toISOString(true),
      },
    }).finally(() =>
      props.navigation.navigate('WorkoutsOverview', {
        cameFrom: moment().toISOString(true),
      }),
    );
  };

  props.navigation.setOptions({
    headerRight: () => (
      <EndWorkout label={'End Workout'} color={'red'} onPress={doEndWorkout} />
    ),
  });

  return (
    <GradientBackground>
      {workoutLoading || endWorkoutLoading || removeExerciseLogLoading ? (
        <ActivityIndicator />
      ) : workout ? (
        <View style={defaultStyles.container}>
          <View style={styles.containerMuscleGroups}>
            <MuscleGroupList muscleGroups={workout.muscleGroups} alignCenter />
          </View>
          {workout.groupedExerciseLogs.length === 0 ? (
            <Text style={styles.noExercisesText}>
              Click to + to log your exercises
            </Text>
          ) : (
            <FlatList
              data={workout.groupedExerciseLogs}
              renderItem={({item}) => (
                <GroupedExerciseLogListItem
                  groupedExercise={item}
                  key={item.exercise.id}
                  onEditLog={log => {
                    setSelectedWeight(Math.floor(log.weightLeft));
                    setSelectedFraction(
                      log.weightLeft - Math.floor(log.weightLeft),
                    );
                    setExerciseLog({
                      zonedDateTimeString: log.logDateTime,
                      exerciseId: log.exercise.id,
                      repetitions: log.repetitions,
                      weightRight: log.weightRight,
                      weightLeft: log.weightLeft,
                      unit: log.unit,
                    });
                    bottomSheetRef?.current?.present();
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
      {workout && <FloatingButton onClick={bottomSheetRef?.current?.present} />}
      <BottomSheetModalProvider>
        <CreateExerciseModal
          active={createExerciseModal}
          onDismiss={added => {
            if (added) {
              refetchMyExercises();
            }
            setCreateExerciseModal(false);
          }}
        />
        <CustomBottomSheet
          ref={bottomSheetRef}
          onDismiss={bottomSheetRef?.current?.dismiss}
          index={70}>
          {myExercisesLoading || logExeciseLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <SelectExercises
                onSelect={exercise => {
                  setExerciseLog(prevState => ({
                    ...prevState,
                    exerciseId: exercise.id,
                  }));
                }}
                selectedId={exerciseLog.exerciseId}
                exercises={myExercisesData?.myExercises || []}
                onCreateExerciseClick={() => setCreateExerciseModal(true)}
              />
              <View style={styles.pickerContainer}>
                <View style={styles.pickerStyles}>
                  <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
                    Repetition
                  </Text>
                  <Picker
                    selectedValue={exerciseLog.repetitions}
                    onValueChange={value =>
                      setExerciseLog(prevState => ({
                        ...prevState,
                        repetitions: value,
                      }))
                    }>
                    {Object.keys(Constants.BOTTOM_SHEET_SNAPPOINTS)
                      .splice(1, 100)
                      .map(repetition => (
                        <Picker.Item
                          label={repetition}
                          value={repetition}
                          key={`rep_${repetition}`}
                        />
                      ))}
                  </Picker>
                </View>
                <View style={styles.pickerStyles}>
                  <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
                    Weight
                  </Text>
                  <Picker
                    selectedValue={selectedWeight}
                    onValueChange={setSelectedWeight}>
                    {Constants.WEIGHT_POINTS.map(weight => (
                      <Picker.Item
                        label={weight}
                        value={weight}
                        key={`weight_${weight}`}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.pickerStyles}>
                  <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
                    Fraction
                  </Text>
                  <Picker
                    selectedValue={selectedFraction}
                    onValueChange={setSelectedFraction}>
                    {Constants.WEIGHT_FRACTION_POINTS.map(fraction => (
                      <Picker.Item
                        label={fraction.toString()}
                        value={fraction}
                        key={`fraction_${fraction}`}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.pickerStyles}>
                  <Text style={[defaultStyles.footnote, styles.pickerLabel]}>
                    Unit
                  </Text>
                  <Picker
                    selectedValue={exerciseLog.unit}
                    onValueChange={unit =>
                      setExerciseLog(prevState => ({
                        ...prevState,
                        unit: unit,
                      }))
                    }>
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
                {exerciseLog.repetitions} x {selectedWeight}
                {selectedFraction
                  ? '.' + selectedFraction.toString().slice(2)
                  : ''}{' '}
                {exerciseLog.unit}
              </Text>
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
                title={'Log'}
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
});

export default WorkoutDetailScreen;
