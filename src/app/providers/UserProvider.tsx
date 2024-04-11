import React, { PropsWithChildren, useEffect } from "react";
import useUserStore from "../stores/userStore";
import useAuthStore, { AuthState } from "../stores/authStore";
import usePreferenceStore from "../stores/preferenceStore";
import {
  BiometricsType,
  ExternalHealthProvider,
  LogUnit,
  useLogBiometricMutation,
  useMeLazyQuery,
  useMyPreferenceLazyQuery
} from "../graphql/operations";
import { Platform } from "react-native";
import useAppleHealthKit from "../hooks/useAppleHealthKit";
import moment from "moment/moment";

/**
 * UserProvider is a React component that manages user data and authentication state.
 * It fetches user data and preferences from the server when the user is authenticated or onboarding.
 * It also updates the authentication state based on whether the user has completed onboarding.
 */
const UserProvider: React.FC<PropsWithChildren> = props => {
  // Local state hooks for user data, authentication state, and user preferences
  const me = useUserStore(state => state.me);
  const authToken = useAuthStore(state => state.authToken);
  const setAuthState = useAuthStore(state => state.setState);
  const setUser = useUserStore(state => state.setMe);
  const setPreference = usePreferenceStore(state => state.setPreference);
  const {getWeight} = useAppleHealthKit();

  const [logWeight] = useLogBiometricMutation({
    onCompleted: data => {
      if (data?.logBiometrics) {
        setUser(data.logBiometrics);
      }
    },
  });

  // Lazy queries to fetch user data and preferences from the server
  const [getMe] = useMeLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.me) {
        console.log('[UserProvider] Setting me');
        setUser(data.me);
        myPreference();
      }
    },
  });
  const [myPreference] = useMyPreferenceLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.myPreference) {
        setPreference(data?.myPreference);
        // If ios, try to update weight with the health kit
        if (Platform.OS === 'ios') {
          getWeight(data.myPreference.weightUnit ?? LogUnit.KG).then(weight => {
            if (weight) {
              // Fetch the weight date from HealthKit, subtract 1 min
              // since store the value towards HK always happens a couple
              // moments after storing the value to our server
              const hkDate = moment(weight.endDate)
                .utc(true)
                .subtract(1, 'minute');

              // If not weight is returned by our server, log the weight logged on HealthKit
              if (!me?.weight || hkDate.isAfter(moment(me?.weight?.logDate))) {
                console.log(
                  '[UserProvider] Newer weight was logged on HealthKit, updating weight to server',
                );
                logWeight({
                  fetchPolicy: 'no-cache',
                  variables: {
                    input: {
                      type: BiometricsType.WEIGHT,
                      value:
                        weight.value > 1000
                          ? weight.value / 1000
                          : weight.value,
                      unit: data.myPreference?.weightUnit ?? LogUnit.KG,
                      logDate: hkDate.toISOString(true),
                      dataSource: ExternalHealthProvider.APPLE_HEALTH,
                    },
                  },
                });
              }
            }
          });
        }
      }
    },
  });

  // Effect to fetch user data when the user is authenticated or onboarding
  useEffect(() => {
    if (authToken) {
      getMe();
    }
  }, [authToken]);

  // Effect to update authentication state based on whether the user has completed onboarding
  useEffect(() => {
    // If the user is not authenticated or there is no auth token, return
    if (!me || !authToken) {
      return;
    }
    // If the user is onboarding and has not completed onboarding, set the state to onboarding
    if (
      me?.onboardingCompleted === undefined ||
      me?.onboardingCompleted === false
    ) {
      setAuthState(AuthState.ONBOARDING);
    }
    // If the user has completed onboarding, set the state to authenticated
    else if (me?.onboardingCompleted === true) {
      setAuthState(AuthState.AUTHENTICATED);
    }
  }, [me, authToken]);

  // Render children components
  return <>{props.children}</>;
};

export default UserProvider;
