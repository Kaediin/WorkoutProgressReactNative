import React, {PropsWithChildren, useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';
import * as Sentry from '@sentry/react-native';
import {useCheckAppVersionLazyQuery} from '../graphql/operations';
import useUserStore from '../stores/userStore';

const AppVersionCheckerProvider: React.FC<PropsWithChildren> = props => {
  const me = useUserStore(state => state.me);

  const [fetchCheckAppVersion, {data: checkAppVersionData}] =
    useCheckAppVersionLazyQuery({
      fetchPolicy: 'no-cache',
      onError: error => {
        Sentry.captureException(error);
      },
    });

  const checkAppVersion = async () => {
    try {
      const latestVersion =
        Platform.OS === 'ios'
          ? await fetch(
              `https://itunes.apple.com/in/lookup?bundleId=org.reactjs.native.example.WorkoutProgress`,
            )
              .then(r => r.json())
              .then(res => {
                return res?.results[0]?.version;
              })
          : await VersionCheck.getLatestVersion({
              provider: 'playStore',
              packageName: 'com.workoutprogress',
              ignoreErrors: true,
            });

      const currentVersion = VersionCheck.getCurrentVersion();

      if (latestVersion > currentVersion) {
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue using the app.',
          [
            {
              text: 'Update Now',
              onPress: async () => {
                Linking.openURL(
                  Platform.OS === 'ios'
                    ? await VersionCheck.getAppStoreUrl({
                        appID: '6451041302',
                      })
                    : await VersionCheck.getPlayStoreUrl({
                        packageName: 'com.workoutprogress',
                      }),
                );
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        // App is up-to-date; proceed with the app
        console.log('[AppVersionCheckerProvider] App is up-to-date');
      }
    } catch (error) {
      // Handle error while checking app version
      Sentry.captureException(error);
    }
  };

  useEffect(() => {
    if (checkAppVersionData?.checkAppVersion === true) {
      checkAppVersion();
    }
  }, [checkAppVersionData]);

  useEffect(() => {
    if (me) {
      fetchCheckAppVersion();
    }
  }, [me]);

  return <>{props.children}</>;
};

export default AppVersionCheckerProvider;
