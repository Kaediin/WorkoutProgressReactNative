import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../route/profile/ProfileScreen';
import useUserStore from '../stores/userStore';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
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
        options={{headerTitle: me?.cognitoUser?.name}}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileStack;
