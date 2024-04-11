import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../../stacks/OnboardingStack';
import GradientBackground from '../../components/common/GradientBackground';
import {Image, StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import GradientButton from '../../components/common/GradientButton';
import HeaderLabel from '../../components/nav/headerComponents/HeaderLabel';
import {useCompleteOnboardingMutation} from '../../graphql/operations';
import Loader from '../../components/common/Loader';
import * as Sentry from '@sentry/react-native';
import useUserStore from '../../stores/userStore';
import useAppleHealthKit from '../../hooks/useAppleHealthKit';
import AppText from '../../components/common/AppText';
import Constants from '../../utils/Constants';
import useAppleHealthKitStore from '../../stores/appleHealthStore';

type Props = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingAppleHealthKit'
>;

const OnboardingAppleHealthKit: React.FC<Props> = () => {
  // Get the auth status from the store
  const authStatus = useAppleHealthKitStore(state => state.authStatus);
  // Get the prompt function from the useAppleHealthKit hook
  const {initHealthKit} = useAppleHealthKit();
  // Get the setMe function from the user store
  const setMe = useUserStore(state => state.setMe);

  // Complete onboarding mutation
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

  // Check if the auth status for HealthKit is true, if so, complete the onboarding
  useEffect(() => {
    if (authStatus) {
      completeOnboarding();
    }
  }, [authStatus]);

  return (
    <GradientBackground>
      {completeOnboardingLoading ? (
        <Loader isLoading />
      ) : (
        <View style={styles.container}>
          <View
            style={[defaultStyles.marginTopLarge, defaultStyles.centerInRow]}>
            <AppText h2>Sync your workouts!</AppText>
            <Image
              source={require('../../icons/apple-health-logo.png')}
              style={styles.logo}
            />
            <View style={defaultStyles.marginHorizontal}>
              <AppText footNote centerText>
                This feature is especially beneficial for tracking your workouts
                across multiple applications
              </AppText>
            </View>
          </View>

          <View>
            <GradientButton
              styles={styles.button}
              title={'Sync workouts with Apple Health'}
              onPress={initHealthKit}
            />
            <View style={[defaultStyles.spaceEvenly, styles.buttonSpacing]}>
              <HeaderLabel
                label={"Don't sync workouts with Apple Health"}
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
    marginTop: Constants.CONTAINER_PADDING_MARGIN * 2,
    marginBottom: Constants.CONTAINER_PADDING_MARGIN * 2,
  },
  button: {
    width: 350,
  },
});

export default OnboardingAppleHealthKit;
