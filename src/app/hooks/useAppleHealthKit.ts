import AppleHealthKit, {
  HealthKitPermissions,
  HealthPermission,
  HealthStatusResult,
  HealthUnit,
  HealthValue,
} from 'react-native-health';
import * as Sentry from '@sentry/react-native';
import useAppleHealthStore from '../stores/appleHealthStore';
import {
  ExternalHealthProvider,
  LogUnit,
  useAddExternalHealthProviderDataMutation,
  WorkoutShortFragment,
} from '../graphql/operations';
import moment from 'moment/moment';
import {calculateCalories} from '../utils/Calorie';
import useUserStore from '../stores/userStore';

export const readPermissionConstants: HealthPermission[] = [
  AppleHealthKit.Constants.Permissions.BiologicalSex,
  // AppleHealthKit.Constants.Permissions.Height,
  AppleHealthKit.Constants.Permissions.Weight,
  // AppleHealthKit.Constants.Permissions.,
];

export const writePermissionConstants: HealthPermission[] = [
  // AppleHealthKit.Constants.Permissions.Height,
  AppleHealthKit.Constants.Permissions.Weight,
  AppleHealthKit.Constants.Permissions.Workout,
];

export const descriptionForPermission = (
  permission: HealthPermission,
  read: boolean,
): string => {
  switch (permission) {
    case AppleHealthKit.Constants.Permissions.BiologicalSex:
      return read ? 'Used to calculate calories burned' : '';
    case AppleHealthKit.Constants.Permissions.Height:
      return read
        ? 'Used to calculate calories burned'
        : 'Used to save height in-app and syncing to Apple Health';
    case AppleHealthKit.Constants.Permissions.Weight:
      return read
        ? 'Used to calculate calories burned'
        : 'Used to save weight in-app and syncing to Apple Health';
    case AppleHealthKit.Constants.Permissions.Workout:
      return read
        ? 'Used for display all activity in profile page'
        : 'Used to save activity';
    default:
      return '';
  }
};

const useAppleHealthKit = (): {
  initHealthKit: () => void;
  checkHealthKitStatus: () => Promise<boolean>;
  saveWorkoutAppleHealthKit: (
    workout: WorkoutShortFragment,
    energyBurned: number,
  ) => void;
  saveWeight: (weight: number, logUnit: LogUnit) => Promise<number>;
  getWeight: (unit: LogUnit) => Promise<HealthValue | undefined>;
  getCaloriesBurned: (workoutDurationInMinutes: number) => Promise<number>;
  isAvailable: () => Promise<boolean>;
  getAuthStatus: () => Promise<HealthStatusResult>;
} => {
  const setAuthStatus = useAppleHealthStore(state => state.setAuthStatus);
  const [addExternalHealthProviderData] =
    useAddExternalHealthProviderDataMutation({fetchPolicy: 'no-cache'});

  const permissions = {
    permissions: {
      read: readPermissionConstants,
      write: writePermissionConstants,
    },
  } as HealthKitPermissions;

  const me = useUserStore(state => state.me);

  /**
   * Prompt the user to give permissions to access Apple HealthKit
   */
  const initHealthKit = () => {
    AppleHealthKit.initHealthKit(permissions, (error: string, result) => {
      /* Called after we receive a response from the system */
      if (error) {
        console.log(
          '[useAppleHealthKit] error initializing Healthkit: ',
          error,
        );
        Sentry.captureException(error);
      }
      if (result) {
        console.log(result);
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
        console.log(
          '[useAppleHealthKit] error saving workout to HealthKit: ',
          error,
        );
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
   * Save weight to Apple HealthKit
   * @param weight weight to save to Apple HealthKit
   * @param unit unit of the weight
   */
  const saveWeight = (weight: number, unit: LogUnit): Promise<number> => {
    return new Promise((resolve, _) => {
      let options = {
        value: unit === LogUnit.KG ? weight * 1000 : weight,
        unit:
          unit === LogUnit.KG
            ? AppleHealthKit.Constants.Units.gram
            : AppleHealthKit.Constants.Units.pound,
        startDate: moment().local(true).toISOString(),
      };

      AppleHealthKit.saveWeight(options, (error, result) => {
        if (error) {
          return;
        }

        console.log('[useAppleHealthKit] weight saved to HealthKit: ', result);
        resolve(result.value);
        // weight successfully saved
      });
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
   * Get weight from Apple HealthKit
   * @param unit unit of the weight
   */
  const getWeight = (unit: LogUnit): Promise<HealthValue | undefined> => {
    return new Promise((resolve, _) => {
      AppleHealthKit.getLatestWeight(
        {unit: (unit === LogUnit.KG ? 'gram' : 'pound') as HealthUnit},
        (error, results) => {
          if (error) {
            console.log(
              '[useAppleHealthKit] Perhaps user has no logged weight in Apple HealthKit',
            );
            resolve(undefined);
          }
          if (results) {
            resolve(results);
          }
        },
      );
    });
  };

  /**
   * Get calories burned during a workout
   * @param workoutDurationInMinutes duration of the workout in minutes
   */
  const getCaloriesBurned = async (
    workoutDurationInMinutes: number,
  ): Promise<number> => {
    let gender = me?.cognitoUser?.gender;

    if (
      !gender ||
      (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female')
    ) {
      gender = // Get from Apple HealthKit
        (await new Promise((resolve, _) => {
          // @ts-ignore
          AppleHealthKit.getBiologicalSex(null, (error, results) => {
            if (error) {
              resolve('');
            }
            if (results) {
              resolve(results.value.toString());
            }
          });
        })) || 'other';
    }

    if (!me?.weight || !me?.weight?.value) {
      return -1;
    }

    // Return calories burned by calculating it with weight and height
    return calculateCalories(
      gender,
      me.weight.value, // Convert to kg
      workoutDurationInMinutes,
    );
  };

  const isAvailable = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.isAvailable((err: Object, available: boolean) => {
        if (err) {
          console.log(
            '[useAppleHealthKit] error initializing Healthkit: ',
            err,
          );
          reject(err);
        }
        console.log('[useAppleHealthKit] HealthKit is available: ', available);
        resolve(available);
      });
    });
  };

  const getAuthStatus = async (): Promise<HealthStatusResult> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getAuthStatus(permissions, (err, results) => {
        if (err) {
          console.log('[useAppleHealthKit] error getting auth status: ', err);
          reject(err);
        }
        console.log('[useAppleHealthKit] auth status: ', results);
        resolve(results);
      });
    });
  };

  return {
    initHealthKit,
    saveWorkoutAppleHealthKit,
    saveWeight,
    checkHealthKitStatus,
    getWeight,
    getCaloriesBurned,
    isAvailable,
    getAuthStatus,
  };
};

export default useAppleHealthKit;
