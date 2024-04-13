import React, {useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import AdjustPreferences from '../../components/preferences/AdjustPreferences';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../../stacks/OnboardingStack';
import AppText from '../../components/common/AppText';
import {StyleSheet, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import {defaultStyles} from '../../utils/DefaultStyles';

type Props = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingPreferences'
>;

const OnboardingPreferences: React.FC<Props> = props => {
  const [pickerActive, setPickerActive] = useState<boolean>(false);

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View>
          <AppText centerText style={defaultStyles.marginTop}>
            Feel free to adjust the preferences to your standards
          </AppText>
          <AdjustPreferences onPickerActive={setPickerActive} />
        </View>

        {!pickerActive && (
          <View style={styles.containerButton}>
            <GradientButton
              title={'Next'}
              onPress={() =>
                props.navigation.navigate('OnboardingExerciseSelect')
              }
            />
          </View>
        )}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButton: {
    position: 'absolute',
    bottom: 40,
    width: 300,
    zIndex: 1,
  },
});

export default OnboardingPreferences;
