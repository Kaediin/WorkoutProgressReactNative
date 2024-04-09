import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../../stacks/OnboardingStack';
import GradientBackground from '../../components/common/GradientBackground';
import {Image, StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../../components/common/AppText';
import GradientButton from '../../components/common/GradientButton';
import HeaderLabel from '../../components/nav/headerComponents/HeaderLabel';
import {useCompleteOnboardingMutation} from '../../graphql/operations';
import Loader from '../../components/common/Loader';
import * as Sentry from '@sentry/react-native';
import useUserStore from '../../stores/userStore';

type Props = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingWorkoutTypeSelect'
>;

const OnboardingWorkoutTypeSelect: React.FC<Props> = props => {
  const setMe = useUserStore(state => state.setMe);
  const [completeOnboarding, {loading: completeOnboardingLoading}] =
    useCompleteOnboardingMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.completeOnboarding) {
          setMe(data.completeOnboarding);
        }
      },
      onError: error => Sentry.captureException(error),
    });

  return (
    <GradientBackground>
      {completeOnboardingLoading ? (
        <Loader isLoading />
      ) : (
        <View style={styles.container}>
          <View style={defaultStyles.centerInRow}>
            <Image
              source={require('../../icons/logo_no_bg.png')}
              alt=""
              style={styles.logo}
            />
            <AppText
              style={[defaultStyles.marginHorizontal, styles.buttonSpacing]}
              h2
              centerText>
              Welcome to your Workout Logbook!
            </AppText>
            <View style={defaultStyles.marginHorizontal}>
              <AppText style={styles.buttonSpacing} centerText>
                Currently the app is optimized for strength training. If you
                wish the use the app for strength training, it is recommended to
                setup your profile.
              </AppText>
              <AppText style={defaultStyles.marginTop} centerText>
                If you wish to use the app for other workout types, please
                select the option below the button. More workout types will be
                added soon!
              </AppText>
            </View>
          </View>

          <View>
            <GradientButton
              title={'Setup profile'}
              onPress={() => props.navigation.navigate('OnboardingPreferences')}
            />
            <View style={[defaultStyles.spaceEvenly, styles.buttonSpacing]}>
              <HeaderLabel
                label={"I won't be logging strength training workouts"}
                onPress={() => completeOnboarding()}
              />
            </View>
          </View>
        </View>
      )}
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
  buttonSpacing: {
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default OnboardingWorkoutTypeSelect;
