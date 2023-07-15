import React, {useEffect, useMemo, useState} from 'react';
import Constants from '../../utils/Constants';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../AppRoute';
import {Gender} from '../../types/Type';
import Modal from 'react-native-modal';
import GradientTextInput from '../../components/common/GradientTextInput';
import {isValidEmail} from '../../utils/String';
import useAuth from '../../hooks/useAuth';
import useAuthStore, {AuthState} from '../../stores/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = props => {
  const authState: AuthState = useAuthStore(state => state.state);

  const {signUp} = useAuth();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<Gender>();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const buttonEnabled = useMemo<boolean>(
    () =>
      firstName.length > 0 &&
      lastName.length > 0 &&
      isValidEmail(email) &&
      gender !== undefined,
    [firstName, lastName, email, gender],
  );

  useEffect(() => {
    setModalVisible(false);
  }, [gender]);

  useEffect(() => {
    if (authState === AuthState.USER_NOT_CONFIRMED && email) {
      props.navigation.navigate('ConfirmUser', {email: email});
    }
  }, [authState]);

  return (
    <LinearGradient colors={Constants.PRIMARY_GRADIENT}>
      <View style={styles.signupContainer}>
        <View style={styles.signupForm}>
          <View style={styles.signupInputContainer}>
            <GradientTextInput
              // gradient={
              //   firstName.length < 1 ? Constants.ERROR_GRADIENT : undefined
              // }
              borderRadius={Constants.BORDER_RADIUS_SMALL}
              style={styles.input}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First name"
              textContentType="givenName"
              autoComplete="name"
              placeholderTextColor="darkgrey"
            />
          </View>
          <View style={styles.signupInputContainer}>
            <GradientTextInput
              borderRadius={Constants.BORDER_RADIUS_SMALL}
              style={styles.input}
              onChangeText={setMiddleName}
              value={middleName}
              placeholder="Middle name"
              textContentType="middleName"
              autoComplete="name"
              placeholderTextColor="darkgrey"
            />
          </View>
          <View style={styles.signupInputContainer}>
            <GradientTextInput
              // gradient={
              //   lastName.length < 1 ? Constants.ERROR_GRADIENT : undefined
              // }
              borderRadius={Constants.BORDER_RADIUS_SMALL}
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
              placeholder="Last name"
              textContentType="familyName"
              autoComplete="name"
              placeholderTextColor="darkgrey"
            />
          </View>
          <View style={styles.signupInputContainer}>
            <GradientTextInput
              // gradient={
              //   isValidEmail(email) ? undefined : Constants.ERROR_GRADIENT
              // }
              borderRadius={Constants.BORDER_RADIUS_SMALL}
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
          </View>
          <View style={styles.signupInputContainer}>
            <LinearGradient
              style={{borderRadius: Constants.BORDER_RADIUS_SMALL}}
              colors={Constants.SECONDARY_GRADIENT}
              // colors={
              // gender ? Constants.SECONDARY_GRADIENT : Constants.ERROR_GRADIENT
            >
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.signupButton, styles.input]}>
                  {/* eslint-disable-next-line react-native/no-inline-styles */}
                  <Text style={{color: gender ? '#000000' : '#a9a9a9'}}>
                    {gender ? gender : 'Gender'}
                  </Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          <View style={styles.continueButton}>
            <GradientButton
              title={'Continue'}
              onClick={async () => {
                const {error} = await signUp(
                  firstName,
                  middleName,
                  lastName,
                  email,
                  gender!,
                );
                if (error) {
                  setErrorMessage(error);
                }
              }}
              disabled={!buttonEnabled}
            />
          </View>
        </View>
        <View style={styles.backButton}>
          <GradientButton
            title={'Go back'}
            onClick={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalStyle}>
        <LinearGradient colors={Constants.PRIMARY_GRADIENT}>
          <View style={styles.modalInnerContainer}>
            <View style={styles.modalButton}>
              <GradientButton
                title={'Male'}
                onClick={() => setGender(Gender.Male)}
              />
            </View>
            <View style={styles.modalButton}>
              <GradientButton
                title={'Female'}
                onClick={() => setGender(Gender.Female)}
              />
            </View>
            <View>
              <GradientButton
                title={'Other'}
                onClick={() => setGender(Gender.Other)}
              />
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  signupContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  signupForm: {},
  input: {
    margin: 5,
    padding: Constants.CONTAINER_PADDING,
    backgroundColor: 'white',
  },
  linearGradient: {
    marginVertical: 5,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  modalStyle: {
    justifyContent: 'center',
  },
  modalInnerContainer: {
    padding: 20,
  },
  modalButton: {
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    width: '100%',
    left: 20,
    bottom: 100,
  },
  continueButton: {
    marginTop: 20,
  },
  signupInputContainer: {
    marginBottom: 5,
  },
  errorMessage: {
    color: 'red',
  },
  signupButton: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
});
export default SignupScreen;
