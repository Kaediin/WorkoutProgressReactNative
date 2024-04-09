import React, { PropsWithChildren, useEffect } from "react";
import useUserStore from "../stores/userStore";
import useAuthStore, { AuthState } from "../stores/authStore";
import usePreferenceStore from "../stores/preferenceStore";
import { useMeLazyQuery, useMyPreferenceLazyQuery } from "../graphql/operations";

/**
 * UserProvider is a React component that manages user data and authentication state.
 * It fetches user data and preferences from the server when the user is authenticated or onboarding.
 * It also updates the authentication state based on whether the user has completed onboarding.
 */
const UserProvider: React.FC<PropsWithChildren> = props => {
  // Local state hooks for user data, authentication state, and user preferences
  const me = useUserStore(state => state.me);
  const authState = useAuthStore(state => state.state);
  const setAuthState = useAuthStore(state => state.setState);
  const setUser = useUserStore(state => state.setMe);
  const setPreference = usePreferenceStore(state => state.setPreference);

  // Lazy queries to fetch user data and preferences from the server
  const [getMe, {data: getMeData}] = useMeLazyQuery({fetchPolicy: 'no-cache'});
  const [myPreference, {data: preferenceData}] = useMyPreferenceLazyQuery({
    fetchPolicy: 'no-cache',
  });

  // Effect to fetch user data when the user is authenticated or onboarding
  useEffect(() => {
    if (authState === AuthState.AUTHENTICATED) {
      getMe();
    }
  }, [authState]);

  // Effect to update local user data and fetch preferences when user data is fetched
  useEffect(() => {
    if (getMeData?.me) {
      console.log('[UserProvider] Setting me');
      setUser(getMeData.me);
      myPreference();
    }
  }, [getMeData?.me]);

  // Effect to update local user preferences when preferences data is fetched
  useEffect(() => {
    if (preferenceData?.myPreference) {
      setPreference(preferenceData?.myPreference);
    }
  }, [preferenceData]);

  // Effect to update authentication state based on whether the user has completed onboarding
  // useEffect(() => {
  //   if (!me) {
  //     console.log('[UserProvider] No me');
  //     return;
  //   }
  //   if (
  //     authState === AuthState.AUTHENTICATED &&
  //     (me?.onboardingCompleted === undefined ||
  //       me?.onboardingCompleted === false)
  //   ) {
  //     setAuthState(AuthState.ONBOARDING);
  //   } else if (
  //     authState === AuthState.ONBOARDING &&
  //     me?.onboardingCompleted === true
  //   ) {
  //     console.log('[UserProvider] Setting authenticated');
  //     setAuthState(AuthState.AUTHENTICATED);
  //   }
  // }, [authState, me]);

  // Render children components
  return <>{props.children}</>;
};

export default UserProvider;
