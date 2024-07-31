import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';
import useAppleHealthKit, {
  readPermissionConstants,
  writePermissionConstants,
} from '../hooks/useAppleHealthKit';
import useAppleHealthStore from '../stores/appleHealthStore';
import {HealthStatusResult} from 'react-native-health';
import {nonNullable} from '../utils/List';

const AppleHealthIntegrationProvider: React.FC<PropsWithChildren> = props => {
  const {initHealthKit, isAvailable, getAuthStatus} = useAppleHealthKit();

  const authStatus = useAppleHealthStore(state => state.authStatus);

  const [healthStatusResult, setHealthStatusResult] =
    useState<HealthStatusResult>();
  const [isHealthKitAvailable, setIsHealthKitAvailable] = useState<
    boolean | undefined
  >(undefined);

  const notPromptedPermission = useMemo(() => {
    const readPermissions = healthStatusResult?.permissions.read;
    const writePermissions = healthStatusResult?.permissions.write;

    const notPromptedRead = readPermissions?.map((permission, index) =>
      permission === 0
        ? {
            type: 'read',
            permission: readPermissionConstants[index],
          }
        : undefined,
    );
    const notPromptedWrite = writePermissions?.map((permission, index) =>
      permission === 0
        ? {type: 'write', permission: writePermissionConstants[index]}
        : undefined,
    );

    return [...(notPromptedRead ?? []), ...(notPromptedWrite ?? [])].filter(
      nonNullable,
    );
  }, [
    healthStatusResult?.permissions.read,
    healthStatusResult?.permissions.write,
  ]);

  useEffect(() => {
    getAuthStatus().then(setHealthStatusResult);
    isAvailable().then(setIsHealthKitAvailable);
  }, [authStatus]);

  useEffect(() => {
    if (
      isHealthKitAvailable &&
      notPromptedPermission &&
      notPromptedPermission.length > 0
    ) {
      console.log(
        '[AppleHealthIntegrationProvider] User has permissions that are not prompted yet. Prompting now...',
      );
      initHealthKit();
    } else if (isHealthKitAvailable) {
      console.log(
        '[AppleHealthIntegrationProvider] User has been prompted all permissions. Proceeding with the app...',
      );
    }
  }, [notPromptedPermission, isHealthKitAvailable]);

  return <>{props.children}</>;
};

export default AppleHealthIntegrationProvider;
