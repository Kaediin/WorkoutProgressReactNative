import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkoutsOverviewScreen from '../route/workouts/WorkoutsOverviewScreen';
import WorkoutDetailScreen from '../route/workouts/WorkoutDetailScreen';

export type WorkoutStackParamList = {
  WorkoutsOverview: undefined;
  WorkoutDetail: {workoutId: string};
};

const WorkoutStackNavigator =
  createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutStack: React.FC = () => {
  return (
    <WorkoutStackNavigator.Navigator initialRouteName={'WorkoutsOverview'}>
      <WorkoutStackNavigator.Screen
        name={'WorkoutsOverview'}
        component={WorkoutsOverviewScreen}
        options={{headerTitle: 'Workouts'}}
      />
      <WorkoutStackNavigator.Screen
        name={'WorkoutDetail'}
        component={WorkoutDetailScreen}
      />
    </WorkoutStackNavigator.Navigator>
  );
};

export default WorkoutStack;
