import AppleHealthKit, {
  HealthKitPermissions,
  HealthPermission,
} from 'react-native-health';
import * as Sentry from '@sentry/react-native';
import useAppleHealthStore from '../stores/appleHealthStore';
import {
  ExternalHealthProvider,
  useAddExternalHealthProviderDataMutation,
  WorkoutShortFragment,
} from '../graphql/operations';
import moment from 'moment/moment';
import {calculateCalories} from '../utils/Calorie';
import useUserStore from '../stores/userStore';

const permissionConstants: HealthPermission[] = [
  AppleHealthKit.Constants.Permissions.BiologicalSex,
  AppleHealthKit.Constants.Permissions.DateOfBirth,
  AppleHealthKit.Constants.Permissions.Height,
  AppleHealthKit.Constants.Permissions.Workout,
  AppleHealthKit.Constants.Permissions.Weight,
];

const useAppleHealthKit = (): {
  prompt: () => void;
  checkHealthKitStatus: () => Promise<boolean>;
  saveWorkoutAppleHealthKit: (
    workout: WorkoutShortFragment,
    energyBurned: number,
  ) => void;
  getCaloriesBurned: (workoutDurationInMinutes: number) => Promise<number>;
} => {
  const setAuthStatus = useAppleHealthStore(state => state.setAuthStatus);
  const [addExternalHealthProviderData] =
    useAddExternalHealthProviderDataMutation({fetchPolicy: 'no-cache'});

  const permissions = {
    permissions: {
      read: permissionConstants,
      write: permissionConstants,
    },
  } as HealthKitPermissions;

  const me = useUserStore(state => state.me);

  /**
   * Prompt the user to give permissions to access Apple HealthKit
   */
  const prompt = () => {
    AppleHealthKit.initHealthKit(permissions, (error: string, result) => {
      /* Called after we receive a response from the system */
      if (error) {
        Sentry.captureException(error);
      }
      if (result) {
        setAuthStatus(result);
      }
    });
  };

  /**
   * Save workout to Apple HealthKit
   * @param workout workout to save to Apple HealthKit
   * @param energyBurned energy burned during the workout
   */
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

  /**
   * Check if Apple HealthKit is available on the device
   */
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

  /**
   * Get calories burned during a workout
   * @param workoutDurationInMinutes duration of the workout in minutes
   */
  const getCaloriesBurned = async (
    workoutDurationInMinutes: number,
  ): Promise<number> => {
    const weight: number = await new Promise((resolve, reject) => {
      AppleHealthKit.getLatestWeight({unit: 'gram'}, (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        if (results) {
          resolve(results.value);
        }
      });
    });

    const gender: string =
      // Get from Apple HealthKit
      (await new Promise((resolve, reject) => {
        AppleHealthKit.getBiologicalSex(null, (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          if (results) {
            resolve(results.value.toString());
          }
        });
      })) ||
      // Get from cognito user
      me?.cognitoUser.gender ||
      // Default to other
      'other';

    // data.height = await new Promise((resolve, reject) => {
    //   AppleHealthKit.getLatestHeight({unit: 'meter'}, (error, results) => {
    //     if (error) {
    //       console.log(error);
    //       reject(error);
    //     }
    //     if (results) {
    //       resolve(results.value);
    //     }
    //   });
    // });

    // data.age = await new Promise((resolve, reject) => {
    //   AppleHealthKit.getDateOfBirth(
    //     null,
    //     (error, results: HealthDateOfBirth) => {
    //       if (error) {
    //         console.log(error);
    //         reject(error);
    //       }
    //       console.log(results.age);
    //       resolve(results.age);
    //     },
    //   );
    // });

    // Return calories burned by calculating it with weight and height
    return calculateCalories(
      gender,
      weight / 1000, // Convert to kg
      workoutDurationInMinutes,
    );
  };

  return {
    prompt,
    saveWorkoutAppleHealthKit,
    checkHealthKitStatus,
    getCaloriesBurned,
  };
};

export default useAppleHealthKit;
