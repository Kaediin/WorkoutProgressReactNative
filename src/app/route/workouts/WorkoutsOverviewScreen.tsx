import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../AppRoute';
import GradientBackground from '../../components/common/GradientBackground';
import {MuscleGroup, useWorkoutsLazyQuery} from '../../graphql/operations';
import FloatingButton from '../../components/common/FloatingButton';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import SelectMuscleGroups from '../../components/workouts/SelectMuscleGroups';
import {StyleSheet, Text} from 'react-native';
import {enumToReadableString} from '../../utils/String';

type Props = NativeStackScreenProps<MainStackParamList, 'WorkoutsOverview'>;

const WorkoutsOverviewScreen: React.FC<Props> = () => {
  const [newWorkoutMuscleGroups, setNewWorkoutMuscleGroups] = useState<
    MuscleGroup[]
  >([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const onSelectWorkoutMuscleGroups = (groups: MuscleGroup[]): void => {
    setNewWorkoutMuscleGroups(groups);
    bottomSheetModalRef.current?.dismiss();
  };

  const [getWorkouts, {error}] = useWorkoutsLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <GradientBackground>
      <BottomSheetModalProvider>
        {newWorkoutMuscleGroups &&
          newWorkoutMuscleGroups.map(group => (
            <Text>{enumToReadableString(group)}</Text>
          ))}
        <CustomBottomSheet ref={bottomSheetModalRef}>
          <Text style={styles.heading1}>Start new Workout</Text>
          <SelectMuscleGroups onConfirm={onSelectWorkoutMuscleGroups} />
        </CustomBottomSheet>
        <FloatingButton
          onClick={() => {
            // getWorkouts();
            bottomSheetModalRef.current?.present();
          }}
        />
      </BottomSheetModalProvider>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  heading1: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WorkoutsOverviewScreen;
