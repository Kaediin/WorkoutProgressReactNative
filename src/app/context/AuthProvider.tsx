import React, {PropsWithChildren, useEffect} from 'react';
import {Amplify} from 'aws-amplify';

enum AuthState {
  ONBOARDING,
  AUTHENTICATING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

const AuthProvider: React.FC<PropsWithChildren> = props => {
  // const [authState, setAuthState] = useState<AuthState>();
  // const [authToken, setAuthToken] = useState('');
  //
  // const getAndUpdateAuthToken = async (): Promise<void> => {
  //   try {
  //     const token = await getToken();
  //     const decoded: CognitoJWTPayload = jwt_decode(token || '');
  //     const tokenNotExpired = moment.unix(decoded.exp).isAfter(moment());
  //     if (token && tokenNotExpired) {
  //       console.log(
  //         'AuthProvider: getAndUpdateAuthToken: Setting AUTHENTICATED',
  //       );
  //       setAuthState(AuthState.AUTHENTICATED);
  //       setAuthToken(token);
  //     } else {
  //       setAuthState(AuthState.UNAUTHENTICATED);
  //       // Unlocking to show login screen underneath the PIN lock overlay
  //       // unlock();
  //     }
  //   } catch (_) {
  //     setAuthState(AuthState.UNAUTHENTICATED);
  //     // Unlocking to show login screen underneath the PIN lock overlay
  //     // unlock()
  //   }
  // };
  //
  // const listener = (data): void => {
  //   console.log('[AUTH] auth listener: ', data.payload.event);
  //   switch (data.payload.event) {
  //     case 'configured': {
  //       setAuthState(AuthState.AUTHENTICATING);
  //       getAndUpdateAuthToken();
  //       break;
  //     }
  //     case 'signIn': {
  //       setAuthToken(data.payload.data.signInUserSession.accessToken.jwtToken);
  //
  //       // Prevents setting state to AUTHENTICATED while onboarding.
  //       // if (authStateRef.current !== AuthState.ONBOARDING) {
  //       console.log(
  //         'AuthProvider: auth listener: signIn event: Setting AUTHENTICATED',
  //       );
  //       setAuthState(AuthState.AUTHENTICATED);
  //       // }
  //       break;
  //     }
  //     case 'tokenRefresh': {
  //       console.log('aws-amplify: Hub: auth tokenRefresh');
  //       getAndUpdateAuthToken();
  //       break;
  //     }
  //     case 'tokenRefresh_failure': {
  //       console.log('aws-amplify: Hub: auth tokenRefresh_failure');
  //       break;
  //     }
  //   }
  // };
  //
  // useEffect(() => {
  //   Hub.listen('auth', listener);
  // }, []);

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
  }, []);
  return <>{props.children}</>;
};

export default AuthProvider;
