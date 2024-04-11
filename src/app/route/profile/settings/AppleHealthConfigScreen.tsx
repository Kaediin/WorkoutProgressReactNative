import React, {useEffect, useMemo, useState} from 'react';
import {ProfileStackParamList} from '../../../stacks/ProfileStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../../components/common/GradientBackground';
import {StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../../utils/DefaultStyles';
import AppText from '../../../components/common/AppText';
import useAppleHealthKit, {
  readPermissionConstants,
  writePermissionConstants,
} from '../../../hooks/useAppleHealthKit';
import Loader from '../../../components/common/Loader';
import GradientButton from '../../../components/common/GradientButton';
import {HealthStatusResult} from 'react-native-health';
import {nonNullable} from '../../../utils/List';
import useAppleHealthStore from '../../../stores/appleHealthStore';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'AppleHealthConfigScreen'
>;
const AppleHealthConfigScreen: React.FC<Props> = () => {
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

  return (
    <GradientBackground>
      {isHealthKitAvailable === undefined ? (
        <Loader isLoading />
      ) : isHealthKitAvailable ? (
        <View
          style={[
            defaultStyles.container,
            defaultStyles.marginTop50,
            styles.container,
          ]}>
          <View style={defaultStyles.marginVertical}>
            <AppText xSmall>
              Due to Apple's privacy model if you have previously denied a
              specific permission then you can not be prompted again for that
              same permission. You would have to go into the Apple Health app
              and grant the permission to this app under sources tab.
            </AppText>
          </View>
          {notPromptedPermission && notPromptedPermission.length > 0 && (
            <View style={defaultStyles.marginTop}>
              <AppText T1>
                Click the button below to sync data with Apple Health
              </AppText>
              <GradientButton
                styles={defaultStyles.marginTop}
                title={'Sync with Apple Health'}
                onPress={initHealthKit}
              />
            </View>
          )}
        </View>
      ) : (
        <AppText>Apple Health is not available</AppText>
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default AppleHealthConfigScreen;
