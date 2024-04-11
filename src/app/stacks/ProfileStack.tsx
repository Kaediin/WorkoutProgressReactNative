import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../route/profile/ProfileScreen';
import useUserStore from '../stores/userStore';
import PreferencesScreen from '../route/profile/settings/PreferencesScreen';
import SettingsScreen from '../route/profile/SettingsScreen';
import UserSettingsScreen from '../route/profile/settings/UserSettings';
import AppleHealthConfigScreen from '../route/profile/settings/AppleHealthConfigScreen';
import BiometricsScreen from '../route/profile/settings/BiometricsScreen';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  PreferencesScreen: undefined;
  SettingsScreen: undefined;
  UserSettingsScreen: undefined;
  AppleHealthConfigScreen: undefined;
  BiometricsScreen: undefined;
};

const ProfileStackNavigator =
  createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => {
  const me = useUserStore(state => state.me);

  return (
    <ProfileStackNavigator.Navigator initialRouteName={'ProfileScreen'}>
      <ProfileStackNavigator.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={{
          headerTitle: me?.cognitoUser?.name,
        }}
      />
      <ProfileStackNavigator.Screen
        name={'PreferencesScreen'}
        component={PreferencesScreen}
        options={{
          headerTitle: 'Preferences',
        }}
      />
      <ProfileStackNavigator.Screen
        name={'SettingsScreen'}
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
      <ProfileStackNavigator.Screen
        name={'UserSettingsScreen'}
        component={UserSettingsScreen}
        options={{
          headerTitle: me?.cognitoUser?.name,
        }}
      />
      <ProfileStackNavigator.Screen
        name={'AppleHealthConfigScreen'}
        component={AppleHealthConfigScreen}
        options={{
          headerTitle: 'Apple Health',
        }}
      />
      <ProfileStackNavigator.Screen
        name={'BiometricsScreen'}
        component={BiometricsScreen}
        options={{
          headerTitle: 'Biometrics',
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileStack;
