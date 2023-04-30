/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppRoute from './route/AppRoute';
import AuthProvider from './providers/AuthProvider';
import GradientBackground from './components/GradientBackground';
import ApolloClientProvider from './providers/ApolloClientProvider';

const App: React.FC = () => {
  return (
    <ApolloClientProvider>
      <AuthProvider>
        <GradientBackground>
          <AppRoute />
        </GradientBackground>
      </AuthProvider>
    </ApolloClientProvider>
  );
};

export default App;
