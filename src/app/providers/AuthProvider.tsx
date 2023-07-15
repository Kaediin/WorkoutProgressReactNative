import React, {PropsWithChildren, useEffect} from 'react';
import {Amplify, Hub} from 'aws-amplify';
import useAuthStore, {AuthState} from '../stores/authStore';
import useAuth from '../hooks/useAuth';
import {CognitoJWTPayload} from '../types/Auth';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

export const AuthProvider: React.FC<PropsWithChildren> = props => {
  const setState = useAuthStore(state => state.setState);
  const setAuthToken = useAuthStore(state => state.setAuthToken);

  const {getToken} = useAuth();

  const getAndUpdateAuthToken = async (): Promise<void> => {
    try {
      const token = await getToken();
      const decoded: CognitoJWTPayload = jwt_decode(token || '');
      const tokenNotExpired = moment.unix(decoded.exp).isAfter(moment());
      if (token && tokenNotExpired) {
        console.log(
          'AuthProvider: getAndUpdateAuthToken: Setting AUTHENTICATED',
        );
        setState(AuthState.AUTHENTICATED);
        setAuthToken(token);
      } else {
        setState(AuthState.UNAUTHENTICATED);
        // Unlocking to show login screen underneath the PIN lock overlay
        // unlock();
      }
    } catch (_) {
      setState(AuthState.UNAUTHENTICATED);
      // setState to show login screen underneath the PIN lock overlay
      // unlock();
    }
  };

  const listener = (data: any): void => {
    console.log('[AuthProvider] auth listener: ', data.payload.event);
    switch (data.payload.event) {
      case 'signIn':
        console.log('[AuthProvider] User signed in');
        setState(AuthState.AUTHENTICATED);
        // getAndUpdateAuthToken();
        break;
      case 'signUp':
        console.log('[AuthProvider] User signed up');
        break;
      case 'signOut':
        console.log('[AuthProvider] User signed out');
        setState(AuthState.UNAUTHENTICATED);
        break;
      case 'signIn_failure':
        console.log('[AuthProvider] User sign in failed');
        setState(AuthState.USER_NOT_CONFIRMED);
        break;
      case 'tokenRefresh': {
        console.log('aws-amplify: Hub: auth tokenRefresh');
        getAndUpdateAuthToken();
        break;
      }
      case 'configured':
        console.log('[AuthProvider] The Auth module is configured');
        getAndUpdateAuthToken();
        break;
      case 'autoSignIn_failure':
        console.log('[AuthProvider] Auto sign in failed');
        break;
    }
  };

  useEffect(() => {
    Hub.listen('auth', listener);
  }, []);

  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: 'eu-central-1:51986b93-84df-4c36-bcb3-aa0a57fd8cee',
        identityPoolRegion: 'eu-central-1',
        region: 'eu-central-1',
        userPoolId: 'eu-central-1_Yg3KBaHrW',
        userPoolWebClientId: '70ng66u9ipg69j6fcscpe8vmsm',
      },
    });
    console.log('[AuthProvider] Configured Amplify');
  }, []);
  return <>{props.children}</>;
};

export default AuthProvider;
