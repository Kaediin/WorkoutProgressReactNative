import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './auth/LoginScreen';
import SignupScreen from './auth/SignupScreen';
import useAuthStore, {AuthState} from '../stores/authStore';
import ConfirmUserScreen from './auth/ConfirmUserScreen';
import TabNavigator from '../components/nav/TabNavigator';
import useRouteStore from '../stores/routeStore';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ConfirmUser: {email: string};
};

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

const AppRoute: React.FC = () => {
  const authState: AuthState = useAuthStore(state => state.state);
  const navRef = useRef();
  const setRouteName = useRouteStore(state => state.setRouteName);
  const authToken = useAuthStore(state => state.authToken);

  return (
    <NavigationContainer
      // @ts-ignore
      ref={navRef}
      onStateChange={() => {
        // @ts-ignore
        setRouteName(navRef.current?.getCurrentRoute().name || '');
      }}>
      {authState === AuthState.AUTHENTICATED && authToken ? (
        <TabNavigator />
      ) : [AuthState.UNAUTHENTICATED, AuthState.USER_NOT_CONFIRMED].includes(
          authState,
        ) ? (
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
      ) : (
        <></>
      )}
    </NavigationContainer>
  );
};

export default AppRoute;
