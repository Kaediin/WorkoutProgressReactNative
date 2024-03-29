import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../route/profile/ProfileScreen';
import useUserStore from '../stores/userStore';
import HeaderLabel from '../components/nav/headerComponents/HeaderLabel';
import useAuth from '../hooks/useAuth';
import PreferencesScreen from '../route/profile/PreferencesScreen';
import ExercisesScreen from '../route/profile/ExercisesScreen';
import ExerciseDetailScreen from '../route/profile/exercise/ExerciseDetailScreen';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  PreferencesScreen: undefined;
  ExercisesScreen: undefined;
  ExerciseDetailScreen: {exerciseId: string};
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
      <ProfileStackNavigator.Screen
        name={'PreferencesScreen'}
        component={PreferencesScreen}
        options={{
          headerTitle: 'Preferences',
        }}
      />
      <ProfileStackNavigator.Screen
        name={'ExercisesScreen'}
        component={ExercisesScreen}
        options={{
          headerTitle: 'Exercises',
        }}
      />
      <ProfileStackNavigator.Screen
        name={'ExerciseDetailScreen'}
        component={ExerciseDetailScreen}
        options={{
          headerTitle: '',
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileStack;
