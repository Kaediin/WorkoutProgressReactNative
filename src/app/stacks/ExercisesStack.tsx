import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExercisesScreen from '../route/exercises/ExercisesScreen';
import ExercisesDetailScreen from '../route/exercises/exercisedetails/ExercisesDetailScreen';

export type ExercisesStackParamList = {
  ExercisesScreen: undefined;
  ExercisesDetailScreen: {exerciseId: string};
};

const ExercisesStackNavigator =
  createNativeStackNavigator<ExercisesStackParamList>();

const ExercisesStack: React.FC = () => {
  return (
    <ExercisesStackNavigator.Navigator initialRouteName={'ExercisesScreen'}>
      <ExercisesStackNavigator.Screen
        name={'ExercisesScreen'}
        component={ExercisesScreen}
        options={{headerTitle: 'Exercises'}}
      />
      <ExercisesStackNavigator.Screen
        name={'ExercisesDetailScreen'}
        component={ExercisesDetailScreen}
        options={{
          headerTitle: '',
        }}
      />
    </ExercisesStackNavigator.Navigator>
  );
};

export default ExercisesStack;
