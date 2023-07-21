import React, {PropsWithChildren, useEffect} from 'react';
import useAuthStore, {AuthState} from '../stores/authStore';
import {useMeLazyQuery, useMyPreferenceLazyQuery} from '../graphql/operations';
import useUserStore from '../stores/userStore';
import usePreferenceStore from '../stores/preferenceStore';

const UserProvider: React.FC<PropsWithChildren> = props => {
  const authState = useAuthStore(state => state.state);
  const setUser = useUserStore(state => state.setMe);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const [getMe, {data: getMeData}] = useMeLazyQuery();
  const [myPreference, {data: preferenceData}] = useMyPreferenceLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (authState === AuthState.AUTHENTICATED) {
      getMe();
    }
  }, [authState]);

  useEffect(() => {
    if (getMeData?.me) {
      setUser(getMeData.me);
      myPreference();
    }
  }, [getMeData?.me]);

  useEffect(() => {
    if (preferenceData?.myPreference) {
      setPreference(preferenceData?.myPreference);
    }
  }, [preferenceData]);

  return <>{props.children}</>;
};

export default UserProvider;
