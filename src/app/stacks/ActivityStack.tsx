import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivityScreen from '../route/activity/ActivityScreen';
import WorkoutDetailScreen from '../route/activity/workout/WorkoutDetailScreen';
import ActivityProgramPreviewScreen from '../route/activity/program/ActivityProgramPreviewScreen';
import ActivityProgramDetailScreen from '../route/activity/program/ActivityProgramDetailScreen';

export type ActivityStackParamList = {
  ActivityOverview: undefined;
  WorkoutDetail: {workoutId: string};
  ProgramPreview: {
    scheduledProgramId: string;
    status: 'scheduled' | 'ready' | '';
  };
  ProgramDetail: {
    scheduledProgramId: string;
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
        name={'ProgramPreview'}
        component={ActivityProgramPreviewScreen}
        options={{headerTitle: ''}}
      />
      <ActivityStackNavigator.Screen
        name={'ProgramDetail'}
        component={ActivityProgramDetailScreen}
        options={{headerTitle: ''}}
      />
    </ActivityStackNavigator.Navigator>
  );
};

export default ActivityStack;
