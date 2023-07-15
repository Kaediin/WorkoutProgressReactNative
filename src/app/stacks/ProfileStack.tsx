import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../route/profile/ProfileScreen';
import useUserStore from '../stores/userStore';
import HeaderLabel from '../components/nav/headerComponents/EndWorkout';
import useAuth from '../hooks/useAuth';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

const ProfileStackNavigator =
  createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => {
  const me = useUserStore(state => state.me);
  const {signOut} = useAuth();

  return (
    <ProfileStackNavigator.Navigator initialRouteName={'ProfileScreen'}>
      <ProfileStackNavigator.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={{
          headerTitle: me?.cognitoUser?.name,
          headerRight: () => (
            <HeaderLabel label={'Log out'} color={'red'} onPress={signOut} />
          ),
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileStack;
