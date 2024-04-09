import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';
import * as Sentry from '@sentry/react-native';
import useAppleHealthStore from '../stores/appleHealthStore';
import {
  ExternalHealthProvider,
  useAddExternalHealthProviderDataMutation,
  WorkoutShortFragment,
} from '../graphql/operations';
import moment from 'moment/moment';

const useAppleHealthKit = (): {
  prompt: () => void;
  checkHealthKitStatus: () => Promise<boolean>;
  saveWorkoutAppleHealthKit: (
    workout: WorkoutShortFragment,
    energyBurned: number,
  ) => void;
} => {
  const setAuthStatus = useAppleHealthStore(state => state.setAuthStatus);
  const [addExternalHealthProviderData] =
    useAddExternalHealthProviderDataMutation({fetchPolicy: 'no-cache'});
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

  const saveWorkoutAppleHealthKit = (
    workout: WorkoutShortFragment,
    energyBurned: number,
  ) => {
    const options = {
      type: 'TraditionalStrengthTraining', // See HealthActivity Enum
      startDate: moment.utc(workout.startDateTime).local(true).toISOString(),
      endDate: moment.utc(workout.endDateTime).local(true).toISOString(),
      energyBurned: energyBurned * 1000, // In Energy burned unit,
      energyBurnedUnit: 'calorie',
      distance: 0, // In Distance unit
      distanceUnit: 'meter',
    };
    // @ts-ignore
    AppleHealthKit.saveWorkout(options, (error, result) => {
      // Error
      if (error) {
        console.log('error saving workout to HealthKit: ', error);
        return;
      }
      // Workout successfully saved
      if (result) {
        addExternalHealthProviderData({
          variables: {
            workoutId: workout.id,
            externalHealthProviderData: {
              appleHealthId: result.toString(),
              provider: ExternalHealthProvider.APPLE_HEALTH,
            },
          },
        });
      }
    });
  };
  const checkHealthKitStatus = (): Promise<boolean> => {
    return new Promise((resolve, _) => {
      AppleHealthKit.isAvailable((error, results) => {
        if (error) {
          Sentry.captureException(error);
          resolve(false);
        }
        resolve(results);
      });
    });
  };

  return {prompt, saveWorkoutAppleHealthKit, checkHealthKitStatus};
};

export default useAppleHealthKit;
