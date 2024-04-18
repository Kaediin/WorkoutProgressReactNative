import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import useAuth from '../../hooks/useAuth';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Loader from '../../components/common/Loader';
import GradientBackground from '../../components/common/GradientBackground';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';
import {errorCodeToMessage} from '../../utils/String';
import ClickableText from '../../components/common/ClickableText';
import AppText from '../../components/common/AppText';
import {AuthStackParamList} from '../../stacks/AuthStack';
import useLiveActivityTimer from '../../hooks/useLiveActivityTimer';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = props => {
  const {signIn} = useAuth();
  const {value, reset, play, pause, isPlaying} = useLiveActivityTimer();

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
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholderTextColor="darkgrey"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder="Password"
                textContentType="password"
                placeholderTextColor="darkgrey"
                autoCapitalize="none"
                autoCorrect={false}
                inputMode="text"
                secureTextEntry
              />
              <AppText style={defaultStyles.error}>{error}</AppText>
              <View style={styles.loginButton}>
                <GradientButton
                  title={'Login'}
                  onPress={async () => {
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
              <View style={defaultStyles.marginTop}>
                <ClickableText
                  text={'Forgot your password? Click here!'}
                  onPress={() => props.navigation.navigate('ForgotPassword')}
                />
              </View>
              <View style={{padding: 32, alignItems: 'center'}}>
                <View style={{paddingTop: 32, paddingBottom: 16}}>
                  <Text style={{fontSize: 80, fontVariant: ['tabular-nums']}}>
                    {value}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 48,
                  }}>
                  <View style={{marginRight: 32}}>
                    <GradientButton
                      title={isPlaying ? 'pause' : 'play'}
                      onPress={isPlaying ? pause : play}
                    />
                  </View>
                  <GradientButton title={'Reset'} onPress={reset} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <AppText style={styles.noAccountText}>
              No account yet? Click here to sign up!
            </AppText>
            <View style={styles.warmup}>
              <GradientButton
                title={'Signup'}
                onPress={() => props.navigation.navigate('Signup')}
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
