import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {ActivityStackParamList} from '../../stacks/ActivityStack';
import WorkoutOverview from './WorkoutOverview';
import {StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ActivityOverview'>;

const ActivityScreen: React.FC<Props> = ({navigation}) => {
  return (
    <GradientBackground>
      <WorkoutOverview
        onNavigateToWorkout={workoutId =>
          navigation.navigate('WorkoutDetail', {workoutId: workoutId})
        }
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  segmentedButtons: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
});

export default ActivityScreen;
