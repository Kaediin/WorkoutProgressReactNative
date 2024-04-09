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
  const authToken = useAuthStore(state => state.authToken);
  const setAuthState = useAuthStore(state => state.setState);
  const setUser = useUserStore(state => state.setMe);
  const setPreference = usePreferenceStore(state => state.setPreference);

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
