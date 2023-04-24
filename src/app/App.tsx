/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoginScreen from './components/auth/LoginScreen';
import {SafeAreaView} from 'react-native';
import AuthProvider from './context/AuthProvider';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <SafeAreaView>
        <LoginScreen />
      </SafeAreaView>
    </AuthProvider>
  );
}

export default App;
