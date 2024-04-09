import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';
import * as Sentry from '@sentry/react-native';
import useAppleHealthStore from '../stores/appleHealthStore';

const useAppleHealthKit = (): {
  prompt: () => void;
} => {
  const setAuthStatus = useAppleHealthStore(state => state.setAuthStatus);

  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.Workout],
      write: [AppleHealthKit.Constants.Permissions.Workout],
    },
  } as HealthKitPermissions;
  const prompt = () => {
    AppleHealthKit.initHealthKit(permissions, (error: string, result) => {
      /* Called after we receive a response from the system */
      if (error) {
        Sentry.captureException(error);
      }
      if (result) {
        setAuthStatus(result);
      }

      /* Can now read or write to HealthKit */
      // const options = {
      //   startDate: new Date(2020, 1, 1).toISOString(),
      // };

      // AppleHealthKit.getHeartRateSamples(
      //   options,
      //   (callbackError: string, results: HealthValue[]) => {
      //     /* Samples are now collected from HealthKit */
      //     Sentry.captureException(callbackError);
      //     console.log('Heart Rate Samples:', results);
      //   },
      // );
    });
  };

  return {prompt};
};

export default useAppleHealthKit;
