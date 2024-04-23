import React, {useEffect, useRef, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../stacks/ProfileStack';
import WorkoutCalendarView from './insights/WorkoutCalendarView';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import {WorkoutShortFragment} from '../../graphql/operations';
import WorkoutListItem from '../../components/workouts/WorkoutListItem';
import TotalWorkoutTime from './insights/TotalWorkoutTime';
import TotalWorkouts from './insights/TotalWorkouts';
import {Settings} from '../../icons/svg';
import Constants from '../../utils/Constants';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  // Key state for refreshing view
  const [key, setKey] = useState(0);

  // Bottom sheet ref for the calendar popup
  const bottomSheetModal = useRef<BottomSheetModal>(null);

  // Keep track of selected activity which is set by tapping on a day
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

  // Set settings icon in topright corner
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Settings />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <GradientBackground>
      <ScrollView
        style={defaultStyles.container}
        refreshControl={
          <RefreshControl
            colors={['#fff', '#ccc']}
            tintColor={'#fff'}
            refreshing={false}
            onRefresh={() => setKey(key + 1)}
          />
        }
        key={key}>
        <View
          style={[
            defaultStyles.marginTop,
            defaultStyles.row,
            defaultStyles.spaceEvenly,
          ]}>
          <TotalWorkoutTime />
          <TotalWorkouts />
        </View>
        <View style={[styles.marginTopLarge, defaultStyles.marginBottom]}>
          <WorkoutCalendarView onSelectDay={setSelectedWorkouts} />
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
    height: 50,
    width: 50,
    padding: Constants.CONTAINER_PADDING_MARGIN / 2,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    backgroundColor: Constants.TERTIARY_GRADIENT[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTopLarge: {
    marginTop: 30,
  },
  paddingBottom: {
    paddingBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default ProfileScreen;
