import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';
import {Gender} from '../types/Type';
import * as Keychain from 'react-native-keychain';
import useAuthStore, {AuthState} from '../stores/authStore';
import {useApolloClient} from '@apollo/client';
import {NativeModules, Platform} from 'react-native';
import * as Sentry from '@sentry/react-native';

export enum CognitoResponse {
  NOT_AUTHORIZED_EXCEPTION = 'NotAuthorizedException',
  PASSWORD_RESET_REQUIRED = 'PasswordResetRequiredException',
  CODE_MISMATCH_EXCEPTION = 'CodeMismatchException',
  USERNAME_EXISTS = 'UsernameExistsException',
  EXPIRED_CODE = 'ExpiredCodeException',
  SUCCESS = 'SUCCESS',
  UNKNOWN = 'UNKNOWN',
}

const useAuth = (): {
  getToken: () => Promise<string | null>;
  signIn: (
    username: string,
    password: string,
  ) => Promise<{user?: CognitoUser; error?: string}>;
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
    gender: Gender | '',
    password: string,
  ) => Promise<{cognitoUser: CognitoUser | null | undefined; error?: string}>;
  confirmSignUp: (
    username: string,
    code: string,
  ) => Promise<{error?: string; success?: boolean}>;
  signOut: () => void;
  requestNewCode: (email: string) => Promise<{error?: string}>;
  handleResetPassword: (
    email: string,
  ) => Promise<{success?: any; error?: string}>;
  handleResetPasswordSubmit: (
    email: string,
    verificationCode: string,
    password: string,
  ) => Promise<{
    success?: any;
    error?: string;
  }>;
  deleteUser: () => Promise<string | void>;
  updateUserAttributes: (userAttributes: object) => Promise<string | void>;
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
      case CognitoResponse.CODE_MISMATCH_EXCEPTION:
        return 'Invalid verification code provided.';
      case CognitoResponse.NOT_AUTHORIZED_EXCEPTION:
        return "Can't resend confirmation code for this user. User is already confirmed.";
      default:
        return 'Something went wrong.';
    }
  };

  const trySignInWithKeyChain = async (): Promise<string | null> => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const {user} = await signIn(credentials.username, credentials.password);
      if (user) {
        const newToken = user
          .getSignInUserSession()
          ?.getAccessToken()
          .getJwtToken();
        setAuthToken(newToken);
        return newToken || null;
      } else {
        return null;
      }
    } else {
      console.log('[useAuth] trySignInWithKeyChain: no credentials');
    }
    return null;
  };

  const getToken = async (): Promise<string | null> => {
    console.log('[useAuth] getToken()');
    try {
      const session = await Auth.currentSession();
      if (session) {
        const newToken = session.getAccessToken().getJwtToken();
        setAuthToken(newToken);
        return newToken;
      }

      return trySignInWithKeyChain();
    } catch (e) {
      console.log(`[useAuth] getToken: e=${e}`);
      return trySignInWithKeyChain();
    }
  };

  const signIn = async (
    username: string,
    password: string,
  ): Promise<{user?: CognitoUser; error?: string}> => {
    try {
      const cognitoUser: CognitoUser = await Auth.signIn(username, password);
      await Keychain.setGenericPassword(username, password);
      setAuthToken(
        cognitoUser.getSignInUserSession()?.getAccessToken().getJwtToken(),
      );
      return {user: cognitoUser};
    } catch (error) {
      console.log('[useAuth - signIn] Error signing in:', error);
      return {error: error.code || ''};
    }
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
    gender: Gender | '',
    password: string,
  ): Promise<{cognitoUser: CognitoUser | null | undefined; error?: string}> => {
    try {
      const {user} = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: middleName.trim()
            ? `${firstName.trim()} ${middleName.trim()} ${lastName.trim()}`
            : `${firstName.trim()} ${lastName.trim()}`,
          given_name: firstName,
          family_name: lastName,
          middle_name: middleName,
          nickname: `${firstName} ${middleName + ' '}${lastName}`,
          email,
          gender,
          zoneinfo: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
          locale:
            Platform.OS === 'ios'
              ? NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
              : NativeModules.I18nManager.localeIdentifier,
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
  ): Promise<{error?: string; success?: boolean}> => {
    try {
      await Auth.confirmSignUp(username, code);
      setState(AuthState.USER_CONFIRMED);
      return {success: true};
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

  const handleResetPassword = async (
    email: string,
  ): Promise<{success?: any; error?: string}> => {
    try {
      return {success: await Auth.forgotPassword(email)};
    } catch (error) {
      console.log(error);
      return {error: getErrorMessageFromCode(error.code)};
    }
  };

  const handleResetPasswordSubmit = async (
    email: string,
    verificationCode: string,
    password: string,
  ): Promise<{
    success?: any;
    error?: string;
  }> => {
    try {
      return {
        success: await Auth.forgotPasswordSubmit(
          email,
          verificationCode,
          password,
        ),
      };
    } catch (error) {
      console.log(error);
      return {error: getErrorMessageFromCode(error.code)};
    }
  };

  const deleteUser = async (): Promise<string | void> => {
    try {
      return await Auth.deleteUser();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAttributes = async (
    userAttributes: any,
  ): Promise<string | void> => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return await Auth.updateUserAttributes(user, userAttributes);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
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
    handleResetPassword,
    handleResetPasswordSubmit,
    deleteUser,
    updateUserAttributes,
  };
};

export default useAuth;
