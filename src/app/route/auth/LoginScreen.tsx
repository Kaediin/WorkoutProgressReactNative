import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import useAuth from '../../hooks/useAuth';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../AppRoute';
import Loader from '../../components/common/Loader';
import GradientBackground from '../../components/common/GradientBackground';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';
import {errorCodeToMessage} from '../../utils/String';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = props => {
  const {signIn} = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>();

  useEffect(() => {
    if (cognitoUser) {
      console.log(`[LoginScreen] Challenge: ${cognitoUser.challengeName}`);
    }
  }, [cognitoUser]);

  return (
    <GradientBackground>
      {loading ? (
        <Loader />
      ) : !cognitoUser ? (
        <View style={styles.loginView}>
          <View style={styles.header}>
            <Image
              source={require('../../icons/logo_no_bg.png')}
              alt=""
              style={styles.logo}
            />
          </View>
          <View style={styles.body}>
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
              <Text style={defaultStyles.error}>{error}</Text>
              <View style={styles.loginButton}>
                <GradientButton
                  title={'Login'}
                  onClick={async () => {
                    setLoading(true);
                    const {user, error: signInError} = await signIn(
                      email,
                      password,
                    );
                    if (signInError) {
                      setError(errorCodeToMessage(signInError));
                    } else {
                      setCognitoUser(user);
                    }
                    setLoading(false);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.noAccountText}>
              No account yet? Click here to sign up!
            </Text>
            <View style={styles.warmup}>
              <GradientButton
                title={'Signup'}
                onClick={() => props.navigation.navigate('Signup')}
              />
            </View>
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
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 200,
    height: 200,
  },
  input: {
    margin: 5,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    backgroundColor: 'white',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  loginButton: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
  },
  noAccountText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
  warmup: {
    opacity: 0.9,
  },
});

export default LoginScreen;
