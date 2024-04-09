import React from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import AdjustPreferences from '../../components/preferences/AdjustPreferences';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../../stacks/OnboardingStack';
import AppText from '../../components/common/AppText';
import {StyleSheet, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';

type Props = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingPreferences'
>;

const OnboardingPreferences: React.FC<Props> = props => {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View>
          <AppText centerText footNote>
            Feel free to adjust the preferences to your standards
          </AppText>
          <AdjustPreferences hidePermaDelete />
        </View>

        <View style={styles.containerButton}>
          <GradientButton
            title={'Next'}
            onPress={() =>
              props.navigation.navigate('OnboardingExerciseSelect')
            }
          />
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  containerButton: {
    width: 300,
    marginTop: -100,
  },
});

export default OnboardingPreferences;
