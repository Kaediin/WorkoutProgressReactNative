import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../route/auth/LoginScreen';
import SignupScreen from '../route/auth/SignupScreen';
import ConfirmUserScreen from '../route/auth/ConfirmUserScreen';
import ForgotPasswordScreen from '../route/auth/ForgotPasswordScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ConfirmUser: {email: string};
  ForgotPassword: undefined;
};
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
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
      <AuthStackNavigator.Screen
        name={'ForgotPassword'}
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
