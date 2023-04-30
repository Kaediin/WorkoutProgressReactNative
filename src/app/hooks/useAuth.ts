import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';
import {Gender} from '../types/Type';
import * as Keychain from 'react-native-keychain';
import useAuthStore, {AuthState} from '../stores/authStore';
import {useApolloClient} from '@apollo/client';

export enum CognitoResponse {
  USERNAME_EXISTS = 'UsernameExistsException',
  EXPIRED_CODE = 'ExpiredCodeException',
  SUCCESS = 'SUCCESS',
  UNKNOWN = 'UNKNOWN',
}

const useAuth = (): {
  getToken: () => Promise<string | null>;
  signIn: (username: string, password: string) => Promise<CognitoUser | null>;
  completeNewPassword: (
    oldCognitoUser: CognitoUser,
    username: string,
    password: string,
  ) => Promise<CognitoUser | null>;
  signUp: (
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    gender: Gender,
  ) => Promise<{cognitoUser: CognitoUser | null | undefined; error?: string}>;
  confirmSignUp: (username: string, code: string) => Promise<{error?: string}>;
  signOut: () => void;
  requestNewCode: (email: string) => Promise<{error?: string}>;
} => {
  const setAuthToken = useAuthStore(state => state.setAuthToken);
  const setState = useAuthStore(state => state.setState);
  const client = useApolloClient();
  const resetAuthStore = useAuthStore(state => state.resetStore);

  const getErrorMessageFromCode = (code: string) => {
    switch (code) {
      case CognitoResponse.USERNAME_EXISTS:
        return 'An account with this email already exists.';
      case CognitoResponse.EXPIRED_CODE:
        return 'Your confirmation code has expired. Please request a new one.';
      default:
        return 'Something went wrong.';
    }
  };

  const trySignInWithKeyChain = async (): Promise<string | null> => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const response = await signIn(credentials.username, credentials.password);
      if (response) {
        const newToken = response
          .getSignInUserSession()
          ?.getAccessToken()
          .getJwtToken();
        setAuthToken(newToken);
        return newToken || null;
      } else {
        return null;
      }
    } else {
      console.log('useAuth: trySignInWithKeyChain: no credentials');
    }
    return null;
  };

  const getToken = async (): Promise<string | null> => {
    console.log('useAuth: getToken()');
    try {
      const session = await Auth.currentSession();
      if (session) {
        const newToken = session.getAccessToken().getJwtToken();
        setAuthToken(newToken);
        return newToken;
      }

      return trySignInWithKeyChain();
    } catch (e) {
      console.log(`useAuth: getToken: e=${e}`);
      return trySignInWithKeyChain();
    }
  };

  const signIn = async (
    username: string,
    password: string,
  ): Promise<CognitoUser | null> => {
    try {
      const cognitoUser: CognitoUser = await Auth.signIn(username, password);
      await Keychain.setGenericPassword(username, password);
      setAuthToken(
        cognitoUser.getSignInUserSession()?.getAccessToken().getJwtToken(),
      );
      return cognitoUser;
    } catch (error) {
      console.log('[useAuth - signIn] Error signing in:', error);
    }
    return null;
  };

  const completeNewPassword = async (
    oldCognitoUser: CognitoUser,
    username: string,
    password: string,
  ): Promise<CognitoUser | null> => {
    return await Auth.completeNewPassword(oldCognitoUser, password, {});
  };

  const signUp = async (
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    gender: Gender,
  ): Promise<{cognitoUser: CognitoUser | null | undefined; error?: string}> => {
    try {
      const {user} = await Auth.signUp({
        username: email,
        password: 'Welkom01!',
        attributes: {
          name: `${firstName} ${middleName + ' '}${lastName}`,
          given_name: firstName,
          family_name: lastName,
          middle_name: middleName,
          nickname: `${firstName} ${middleName + ' '}${lastName}`,
          email,
          gender: gender,
          zoneinfo: 'Amsterdam',
          locale: 'nl_NL',
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      return {cognitoUser: user};
    } catch (error) {
      console.error(`[useAuth - signUp] Signup error: ${error}`);
      // @ts-ignore
      return {cognitoUser: null, error: getErrorMessageFromCode(error.code)};
    }
  };

  const confirmSignUp = async (
    username: string,
    code: string,
  ): Promise<{error?: string}> => {
    try {
      await Auth.confirmSignUp(username, code);
      setState(AuthState.USER_CONFIRMED);
      return {error: undefined};
    } catch (error) {
      console.log('error confirming sign up', error);
      // @ts-ignore
      return {error: getErrorMessageFromCode(error.code)};
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.log('error resetGenericPassword: ', error);
    }

    try {
      await client.resetStore();
    } catch (error) {
      console.log('error resetStore: ', error);
    }

    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signOut: ', error);
    }

    resetAuthStore();
  };

  const requestNewCode = async (email: string): Promise<{error?: string}> => {
    try {
      await Auth.resendSignUp(email);
      return {error: undefined};
    } catch (error) {
      console.log('error resending code: ', error);
      // @ts-ignore
      return {error: getErrorMessageFromCode(error.code)};
    }
  };

  return {
    getToken,
    signIn,
    completeNewPassword,
    signUp,
    confirmSignUp,
    signOut,
    requestNewCode,
  };
};

export default useAuth;
