import React from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import {StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../stacks/ProfileStack';
import GradientButton from '../../components/common/GradientButton';
import Constants from '../../utils/Constants';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <GradientButton
          title={'Preferences'}
          onClick={() => navigation.navigate('PreferencesScreen')}
        />
        <View style={defaultStyles.marginTop}>
          <GradientButton
            title={'Exercises'}
            onClick={() => navigation.navigate('ExercisesScreen')}
          />
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    padding: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default ProfileScreen;
