import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../route/profile/ProfileScreen';
import useUserStore from '../stores/userStore';
import PreferencesScreen from '../route/profile/PreferencesScreen';
import SettingsScreen from '../route/profile/SettingsScreen';
import UserSettingsScreen from '../route/profile/settings/UserSettings';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  PreferencesScreen: undefined;
  SettingsScreen: undefined;
  UserSettingsScreen: undefined;
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
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileStack;
