import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProgramLogFragment, ProgramLogGroupType} from '../graphql/operations';
import ProgramDetailScreen from '../route/program/ProgramDetailScreen';
import ProgramCreateLogScreen from '../route/program/ProgramCreateLogScreen';
import ProgramScreen from '../route/program/ProgramScreen';

export type ProgramStackParamList = {
  ProgramScreen: undefined;
  ProgramDetailScreen: {programId: string};
  ProgramCreateLogScreen: {
    programLogGroupId: string;
    type: ProgramLogGroupType;
    log?: ProgramLogFragment;
  };
};

const ProgramStackNavigator =
  createNativeStackNavigator<ProgramStackParamList>();

const ProgramStack: React.FC = () => {
  return (
    <ProgramStackNavigator.Navigator initialRouteName={'ProgramScreen'}>
      <ProgramStackNavigator.Screen
        name={'ProgramScreen'}
        component={ProgramScreen}
        options={{headerTitle: 'Programs'}}
      />
      <ProgramStackNavigator.Screen
        name={'ProgramDetailScreen'}
        component={ProgramDetailScreen}
        options={{headerTitle: 'Program Detail'}}
      />
      <ProgramStackNavigator.Screen
        name={'ProgramCreateLogScreen'}
        component={ProgramCreateLogScreen}
        options={{headerTitle: 'Create Log'}}
      />
    </ProgramStackNavigator.Navigator>
  );
};

export default ProgramStack;
