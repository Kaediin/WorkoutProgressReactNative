import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingWorkoutTypeSelect from '../route/onboarding/OnboardingWorkoutTypeSelect';
import OnboardingPreferences from '../route/onboarding/OnboardingPreferences';
import OnboardingExerciseSelect from '../route/onboarding/OnboardingExerciseSelect';

export type OnboardingStackParamList = {
  OnboardingWorkoutTypeSelect: undefined;
  OnboardingPreferences: undefined;
  OnboardingExerciseSelect: undefined;
};
const OnboardingStackNavigator =
  createNativeStackNavigator<OnboardingStackParamList>();
const OnboardingStack: React.FC = () => {
  return (
    <OnboardingStackNavigator.Navigator
      initialRouteName={'OnboardingWorkoutTypeSelect'}>
      <OnboardingStackNavigator.Screen
        name={'OnboardingWorkoutTypeSelect'}
        component={OnboardingWorkoutTypeSelect}
        options={{headerTitle: 'Onboarding'}}
      />
      <OnboardingStackNavigator.Screen
        name={'OnboardingPreferences'}
        component={OnboardingPreferences}
        options={{headerTitle: 'Preferences'}}
      />
      <OnboardingStackNavigator.Screen
        name={'OnboardingExerciseSelect'}
        component={OnboardingExerciseSelect}
        options={{headerTitle: 'Exercises'}}
      />
    </OnboardingStackNavigator.Navigator>
  );
};

export default OnboardingStack;
