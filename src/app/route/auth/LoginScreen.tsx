import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import useAuth from '../../hooks/useAuth';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../AppRoute';
import Loader from '../../components/common/Loader';
import GradientBackground from '../../components/common/GradientBackground';
import Constants from '../../utils/Constants';
import useAuthStore, {AuthState} from '../../stores/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = props => {
  const authState: AuthState = useAuthStore(state => state.state);

  const {signIn} = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>();

  useEffect(() => {
    if (cognitoUser) {
      console.log(`[LoginScreen] Challenge: ${cognitoUser.challengeName}`);
    }
  }, [cognitoUser]);

  useEffect(() => {
    if (authState === AuthState.USER_NOT_CONFIRMED && email) {
      props.navigation.navigate('ConfirmUser', {email: email});
    }
  }, [authState]);

  return (
    <GradientBackground>
      {loading ? (
        <Loader />
      ) : !cognitoUser ? (
        <View style={styles.loginView}>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              textContentType="emailAddress"
              autoComplete="email"
              placeholderTextColor="darkgrey"
              keyboardType="email-address"
              inputMode="email"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              textContentType="password"
              placeholder="Password"
              inputMode="text"
              placeholderTextColor="darkgrey"
              autoComplete="password-new"
              secureTextEntry
            />
            <View style={styles.loginButton}>
              <GradientButton
                title={'Login'}
                onClick={async () => {
                  setLoading(true);
                  setCognitoUser(await signIn(email, password));
                  setLoading(false);
                }}
              />
            </View>
          </View>
          <View style={styles.loginSignupButton}>
            <GradientButton
              title={'Signup'}
              onClick={() => props.navigation.navigate('Signup')}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  loginView: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  loginSignupButton: {
    position: 'absolute',
    width: '100%',
    bottom: 100,
    left: 20,
    opacity: 0.7,
  },
  input: {
    margin: 5,
    padding: Constants.CONTAINER_PADDING,
    backgroundColor: 'white',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  loginButton: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
  },
});

export default LoginScreen;
