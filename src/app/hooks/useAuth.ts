import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';
import {useEffect, useState} from 'react';

export enum CognitoResponse {
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  MFA_SETUP = 'MFA_SETUP',
  USER_NOT_CONFIRMED = 'UserNotConfirmedException',
  PASSWORD_RESET_REQUIRED = 'PasswordResetRequiredException',
  NOT_AUTHORIZED = 'NotAuthorizedException',
  USER_NOT_FOUND = 'UserNotFoundException',
  SUCCESS = 'SUCCESS',
  MFA_CODE_ERROR = 'MFA_CODE_ERROR',
  PASSWORD_RESET_REQUIRED_FP = 'PASSWORD_RESET_REQUIRED_FP',
  TOO_MANY_ATTEMPTS_FP = 'TOO_MANY_ATTEMPTS_FP',
  INVALID_PASSWORD_FP = 'INVALID_PASSWORD_FP',
  PASSWORD_RESET_SUCCESS_FP = 'PASSWORD_RESET_SUCCESS_FP',
  OTHER_FP = 'OTHER_FP',
  UNKNOWN = 'UNKNOWN',
}

const useAuth = (): {
  signIn: (username: string, password: string) => Promise<CognitoUser | null>;
} => {
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    if (authToken) {
      console.log('AuthToken: ' + authToken);
    }
  }, [authToken]);

  const signIn = async (
    username: string,
    password: string,
  ): Promise<CognitoUser | null> => {
    try {
      const cognitoUser: CognitoUser = await Auth.signIn(username, password);
      console.log(cognitoUser);
      setAuthToken(
        cognitoUser.getSignInUserSession()?.getAccessToken().getJwtToken || '',
      );
      return cognitoUser;
    } catch (error) {
      console.log('error signing in', error);
    }
    return null;
  };

  return {
    signIn,
  };
};

export default useAuth;
