import React, {PropsWithChildren, useEffect} from 'react';
import useAuthStore, {AuthState} from '../stores/authStore';
import {useMeLazyQuery} from '../graphql/operations';
import useUserStore from '../stores/userStore';

const UserProvider: React.FC<PropsWithChildren> = props => {
  const authState = useAuthStore(state => state.state);
  const setUser = useUserStore(state => state.setMe);

  const [getMe, {data: getMeData}] = useMeLazyQuery();

  useEffect(() => {
    if (authState === AuthState.AUTHENTICATED) {
      getMe();
    }
  }, [authState]);

  useEffect(() => {
    if (getMeData?.me) {
      setUser(getMeData.me);
    }
  }, [getMeData?.me]);

  return <>{props.children}</>;
};

export default UserProvider;
