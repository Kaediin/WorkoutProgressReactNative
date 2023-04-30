import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './auth/LoginScreen';
import SignupScreen from './auth/SignupScreen';
import useAuthStore, {AuthState} from '../stores/authStore';
import WorkoutsOverviewScreen from './workouts/WorkoutsOverviewScreen';
import ConfirmUserScreen from './auth/ConfirmUserScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ConfirmUser: {email: string};
};

export type MainStackParamList = {
  WorkoutsOverview: undefined;
};

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();
const MainStackNavigator = createNativeStackNavigator<MainStackParamList>();

const AppRoute: React.FC = () => {
  const authState: AuthState = useAuthStore(state => state.state);

  return (
    <NavigationContainer>
      {authState === AuthState.AUTHENTICATED ? (
        <MainStackNavigator.Navigator initialRouteName="WorkoutsOverview">
          <MainStackNavigator.Screen
            name={'WorkoutsOverview'}
            component={WorkoutsOverviewScreen}
            options={{headerTitle: 'Workouts'}}
          />
        </MainStackNavigator.Navigator>
      ) : (
        <AuthStackNavigator.Navigator initialRouteName="Login">
          <AuthStackNavigator.Screen
            name={'Login'}
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <AuthStackNavigator.Screen
            name={'Signup'}
            component={SignupScreen}
            options={{headerShown: false}}
          />
          <AuthStackNavigator.Screen
            name={'ConfirmUser'}
            component={ConfirmUserScreen}
            options={{headerShown: false}}
          />
        </AuthStackNavigator.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppRoute;
