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

const App: React.FC = () => {
  return (
    <ApolloClientProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthProvider>
          <SafeAreaProvider>
            <GradientBackground>
              <AppRoute />
            </GradientBackground>
          </SafeAreaProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </ApolloClientProvider>
  );
};

export default App;
