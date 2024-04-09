import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useAuthStore, {AuthState} from '../stores/authStore';
import TabNavigator from '../components/nav/TabNavigator';
import useRouteStore from '../stores/routeStore';
import OnboardingStack from '../stacks/OnboardingStack';
import AuthStack from '../stacks/AuthStack';
import Loader from '../components/common/Loader';

const AppRoute: React.FC = () => {
  const authState: AuthState = useAuthStore(state => state.state);
  const navRef = useRef();
  const setRouteName = useRouteStore(state => state.setRouteName);
  const authToken = useAuthStore(state => state.authToken);

  useEffect(() => {
    console.log('[AppRoute] Auth Token: ', authToken);
  }, [authToken]);

  return (
    <NavigationContainer
      // @ts-ignore
      ref={navRef}
      onStateChange={() => {
        if (
          navRef.current &&
          // @ts-ignore
          navRef.current?.getCurrentRoute() &&
          // @ts-ignore
          navRef.current?.getCurrentRoute().name
        ) {
          // @ts-ignore
          setRouteName(navRef.current?.getCurrentRoute().name || '');
        }
      }}>
      {authState === AuthState.AUTHENTICATED &&
      authToken &&
      authToken?.length > 0 ? (
        // Main Tabs
        <TabNavigator />
      ) : [AuthState.UNAUTHENTICATED, AuthState.USER_NOT_CONFIRMED].includes(
          authState,
        ) ? (
        // Login/ Sing-up stack
        <AuthStack />
      ) : authState === AuthState.ONBOARDING ? (
        // Onboarding Stack
        <OnboardingStack />
      ) : (
        <Loader isLoading />
      )}
    </NavigationContainer>
  );
};

export default AppRoute;
