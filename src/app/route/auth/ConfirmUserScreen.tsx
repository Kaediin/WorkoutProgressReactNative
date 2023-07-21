import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import Constants from '../../utils/Constants';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/common/Loader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../AppRoute';
import useAuthStore, {AuthState} from '../../stores/authStore';
import {defaultStyles} from '../../utils/DefaultStyles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ConfirmUser'>;

const ConfirmUserScreen: React.FC<Props> = props => {
  const authState = useAuthStore(state => state.state);
  const {confirmSignUp, requestNewCode} = useAuth();

  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [timerCount, setTimer] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      // @ts-ignore
      setTimer(lastTimerCount => {
        if (lastTimerCount === 0) {
          // nothing to do here
        } else {
          if (timerCount > 0 && !disabled) {
            setDisabled(true);
          }
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        }
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    setDisabled(false);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (authState === AuthState.USER_CONFIRMED) {
      props.navigation.navigate('Login');
    }
  }, [authState]);

  const disableButton = () => {
    setTimer(60);
    setDisabled(true);
  };

  return (
    <GradientBackground>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.loginView}>
          <View>
            <Text style={[defaultStyles.h4, defaultStyles.container]}>
              An email has been sent to you containing a confirmation code
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setConfirmationCode}
              value={confirmationCode}
              placeholder="Confirmation code"
              inputMode="text"
              placeholderTextColor="darkgrey"
            />
            <View>
              {timerCount > 0 && (
                <Text>
                  You can request a new code in {timerCount} second
                  {timerCount === 1 ? '' : 's'}
                </Text>
              )}
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
            <View style={styles.actionButtons}>
              <View style={styles.confirmButton}>
                <GradientButton
                  title={'Confirm'}
                  onClick={async () => {
                    setLoading(true);
                    const {error} = await confirmSignUp(
                      props.route.params.email,
                      confirmationCode,
                    );
                    if (error) {
                      setErrorMessage(error);
                    }
                    setLoading(false);
                  }}
                />
              </View>
              <GradientButton
                title={'Request new code'}
                onClick={async () => {
                  setLoading(true);
                  const {error} = await requestNewCode(
                    props.route.params.email,
                  );
                  if (error) {
                    setErrorMessage(error);
                  } else {
                    disableButton();
                  }
                  setLoading(false);
                }}
                disabled={disabled}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <GradientButton
              title={'Signup'}
              onClick={() => props.navigation.navigate('Signup')}
            />
          </View>
        </View>
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
  footer: {
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
  actionButtons: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
  },
  confirmButton: {
    marginBottom: 10,
  },
});

export default ConfirmUserScreen;
