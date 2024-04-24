import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivityScreen from '../route/activity/ActivityScreen';
import WorkoutDetailScreen from '../route/activity/workout/WorkoutDetailScreen';
import ProgramDetailScreen from '../route/activity/program/ProgramDetailScreen';
import ProgramCreateLogScreen from '../route/activity/program/ProgramCreateLogScreen';
import {ProgramLogFragment, ProgramLogGroupType} from '../graphql/operations';

export type ActivityStackParamList = {
  ActivityOverview: undefined;
  WorkoutDetail: {workoutId: string};
  ProgramDetail: {programId: string};
  ProgramCreateLog: {
    programLogGroupId: string;
    type: ProgramLogGroupType;
    log?: ProgramLogFragment;
  };
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
      <ActivityStackNavigator.Screen
        name={'ProgramDetail'}
        component={ProgramDetailScreen}
        options={{headerTitle: ''}}
      />
      <ActivityStackNavigator.Screen
        name={'ProgramCreateLog'}
        component={ProgramCreateLogScreen}
        options={{headerTitle: 'Create Log'}}
      />
    </ActivityStackNavigator.Navigator>
  );
};

export default ActivityStack;
