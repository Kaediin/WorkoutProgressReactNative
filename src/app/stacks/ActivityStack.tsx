import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivityScreen from '../route/activity/ActivityScreen';
import WorkoutDetailScreen from '../route/activity/workout/WorkoutDetailScreen';

export type ActivityStackParamList = {
  ActivityOverview: undefined;
  WorkoutDetail: {workoutId: string};
};

const ActivityStackNavigator =
  createNativeStackNavigator<ActivityStackParamList>();

const ActivityStack: React.FC = () => {
  return (
    <ActivityStackNavigator.Navigator initialRouteName={'ActivityOverview'}>
      <ActivityStackNavigator.Screen
        name={'ActivityOverview'}
        component={ActivityScreen}
        options={{headerTitle: 'Activity'}}
      />
      <ActivityStackNavigator.Screen
        name={'WorkoutDetail'}
        component={WorkoutDetailScreen}
      />
    </ActivityStackNavigator.Navigator>
  );
};

export default ActivityStack;
