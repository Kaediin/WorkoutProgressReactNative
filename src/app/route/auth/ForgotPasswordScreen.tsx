import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../AppRoute';
import GradientBackground from '../../components/common/GradientBackground';
import {StyleSheet, TextInput, View} from 'react-native';
import Constants from '../../utils/Constants';
import GradientButton from '../../components/common/GradientButton';
import {defaultStyles} from '../../utils/DefaultStyles';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/common/Loader';
import {isValidPassword} from '../../utils/String';
import AppText from '../../components/common/AppText';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const {handleResetPassword, handleResetPasswordSubmit} = useAuth();

  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const passwordChangeSubmitEnabled = useMemo(
    () => isValidPassword(password) && password === passwordConfirmation,
    [password, passwordConfirmation],
  );
  const onResetClicked = async (): Promise<void> => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setShowVerificationCode(false);
    const {success, error} = await handleResetPassword(email);
    if (error) {
      setError(error);
    }
    if (success) {
      setShowVerificationCode(true);
      setSuccessMessage(
        `Verification code sent to ${success.CodeDeliveryDetails.AttributeName}: ${success.CodeDeliveryDetails.Destination}`,
      );
    }
    setLoading(false);
  };

  const onResetSubmit = async (): Promise<void> => {
    setLoading(true);
    if (email && verificationCode && isValidPassword(password)) {
      const {success, error} = await handleResetPasswordSubmit(
        email,
        verificationCode,
        password,
      );

      if (error) {
        setError(error);
      }

      if (success) {
        navigation.goBack();
      }
    } else if (!email) {
      setError('Email is incorrect');
    } else if (!verificationCode) {
      setError('Verification code is incorrect');
    } else if (!isValidPassword(password)) {
      setError('Password is incorrect');
    }

    setLoading(false);
  };

  return (
    <GradientBackground>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.centerContainer}>
          <AppText style={[defaultStyles.h2, defaultStyles.marginBottom]}>
            Forgot password
          </AppText>
          {!showVerificationCode || !email ? (
            <>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                defaultValue={email}
                placeholder="Email"
                textContentType="emailAddress"
                autoComplete="email"
                placeholderTextColor="darkgrey"
                keyboardType="email-address"
                inputMode="email"
              />
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                onChangeText={setVerificationCode}
                defaultValue={verificationCode}
                placeholder="Confirmation code"
                inputMode="text"
                placeholderTextColor="darkgrey"
              />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                defaultValue={password}
                placeholder="Password"
                textContentType="newPassword"
                autoComplete="password-new"
                placeholderTextColor="darkgrey"
                secureTextEntry
                maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
              />
              <TextInput
                style={styles.input}
                onChangeText={setPasswordConfirmation}
                defaultValue={passwordConfirmation}
                placeholder="Confirm password"
                textContentType="newPassword"
                autoComplete="password-new"
                placeholderTextColor="darkgrey"
                secureTextEntry
                maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
              />
              <AppText style={[defaultStyles.footnote, styles.containerWidth]}>
                Your password should contain at least eight characters: one
                digit, one upper case, one lower case, and one special
                character.
              </AppText>
            </>
          )}
          {(error || successMessage) &&
            (error ? (
              <View style={styles.containerWidth}>
                <AppText style={styles.errorMessage}>{error}</AppText>
              </View>
            ) : (
              <View style={[styles.containerWidth, defaultStyles.marginTop]}>
                <AppText>{successMessage}</AppText>
              </View>
            ))}
          <View>
            <GradientButton
              styles={[styles.containerWidth, defaultStyles.marginTop]}
              title={
                showVerificationCode
                  ? 'Confirm password change'
                  : 'Request password change'
              }
              onClick={
                showVerificationCode && passwordChangeSubmitEnabled
                  ? onResetSubmit
                  : onResetClicked
              }
              disabled={
                showVerificationCode ? !passwordChangeSubmitEnabled : !email
              }
            />
          </View>
        </View>
      )}
    </GradientBackground>
  );
};

const CONTAINER_WIDTH = 300;

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  input: {
    margin: 5,
    width: CONTAINER_WIDTH,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    backgroundColor: 'white',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  containerWidth: {
    width: CONTAINER_WIDTH,
  },
  errorMessage: {
    color: 'red',
  },
});

export default ForgotPasswordScreen;
