import React, {useEffect, useRef, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../stacks/ProfileStack';
import WorkoutCalendarView from './calendar/WorkoutCalendarView';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import {WorkoutShortFragment} from '../../graphql/operations';
import WorkoutListItem from '../../components/workouts/WorkoutListItem';
import TotalWorkoutTime from './insights/TotalWorkoutTime';
import TotalWorkouts from './insights/TotalWorkouts';
import {Exercise, Settings} from '../../icons/svg';
import Constants from '../../utils/Constants';
import MuscleGroupDistribution from './insights/MuscleGroupDistribution';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  // Bottom sheet ref for the calendar popup
  const bottomSheetModal = useRef<BottomSheetModal>(null);

  // Keep track of selected workouts which is set by tapping on a day
  const [selectedWorkouts, setSelectedWorkouts] =
    useState<WorkoutShortFragment[]>();

  // Show or hide bottom sheet based on if selectedWorkouts contains any
  useEffect(() => {
    if (selectedWorkouts && selectedWorkouts.length > 0) {
      bottomSheetModal?.current?.present();
    } else {
      bottomSheetModal?.current?.dismiss();
    }
  }, [selectedWorkouts]);

  return (
    <GradientBackground>
      <ScrollView style={defaultStyles.container}>
        <View
          style={[
            defaultStyles.marginTop,
            defaultStyles.row,
            defaultStyles.spaceEvenly,
          ]}>
          <TotalWorkoutTime />
          <TotalWorkouts />
          <View style={styles.containerIcons}>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => navigation.navigate('PreferencesScreen')}>
              <Settings />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => navigation.navigate('ExercisesScreen')}>
              <Exercise />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.marginTopLarge}>
          <WorkoutCalendarView onSelectDay={setSelectedWorkouts} />
        </View>
        <View style={[styles.marginTopLarge, styles.paddingBottom]}>
          <MuscleGroupDistribution />
        </View>
      </ScrollView>
      <BottomSheetModalProvider>
        <CustomBottomSheet
          ref={bottomSheetModal}
          index={selectedWorkouts ? selectedWorkouts.length * 25 : 20}>
          {selectedWorkouts?.map(workout => (
            <WorkoutListItem
              key={workout.id}
              workout={workout}
              onWorkoutPressed={() =>
                // @ts-ignore
                navigation.navigate('WorkoutDetail', {workoutId: workout.id})
              }
              hasActiveWorkout={false}
            />
          ))}
        </CustomBottomSheet>
      </BottomSheetModalProvider>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  containerIcons: {
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    padding: Constants.CONTAINER_PADDING_MARGIN / 2,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    backgroundColor: Constants.TERTIARY_GRADIENT[0],
  },
  marginTopLarge: {
    marginTop: 30,
  },
  paddingBottom: {
    paddingBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default ProfileScreen;
