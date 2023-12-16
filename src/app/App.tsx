/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppRoute from './route/AppRoute';
import AuthProvider from './providers/AuthProvider';
import GradientBackground from './components/common/GradientBackground';
import ApolloClientProvider from './providers/ApolloClientProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import UserProvider from './providers/UserProvider';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';
import {StyleSheet} from 'react-native';
import NetworkProvider from './providers/NetworkProvider';
import WorkoutTimerProvider from './providers/WorkoutTimerProvider';

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

const App: React.FC = () => {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    environment: Config.SENTRY_ENV,
    enableNative: true,
    integrations: [
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
  });

  return (
    <NetworkProvider>
      <ApolloClientProvider>
        <GestureHandlerRootView style={styles.flex}>
          <AuthProvider>
            <UserProvider>
              <SafeAreaProvider>
                <GradientBackground>
                  <WorkoutTimerProvider>
                    <AppRoute />
                  </WorkoutTimerProvider>
                </GradientBackground>
              </SafeAreaProvider>
            </UserProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </ApolloClientProvider>
    </NetworkProvider>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Sentry.wrap(App);
