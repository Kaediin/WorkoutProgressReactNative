import React, {useMemo, useState} from 'react';
import Constants from '../../utils/Constants';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Gender} from '../../types/Type';
import {isValidEmail, isValidPassword} from '../../utils/String';
import useAuth from '../../hooks/useAuth';
import DropDownPicker from 'react-native-dropdown-picker';
import {defaultStyles} from '../../utils/DefaultStyles';
import ClickableText from '../../components/common/ClickableText';
import AppText from '../../components/common/AppText';
import {AuthStackParamList} from '../../stacks/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = props => {
  const {signUp} = useAuth();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<Gender>();
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [genderPickerOpen, setGenderPickerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const buttonEnabled = useMemo<boolean>(
    () =>
      firstName.length > 0 &&
      lastName.length > 0 &&
      isValidEmail(email) &&
      isValidPassword(password) &&
      password === passwordConfirmation,
    [firstName, lastName, email, password, passwordConfirmation],
  );

  return (
    <LinearGradient colors={Constants.PRIMARY_GRADIENT}>
      <ScrollView style={styles.signupContainer}>
        <AppText style={[defaultStyles.h1, defaultStyles.container]}>
          Signup
        </AppText>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}>
          <View style={styles.signupInputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              defaultValue={firstName}
              placeholder="First name"
              textContentType="givenName"
              autoComplete="name"
              placeholderTextColor="darkgrey"
              maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
            />
          </View>
          <View style={styles.signupInputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setMiddleName}
              defaultValue={middleName}
              placeholder="Middle name (optional)"
              autoCapitalize="none"
              keyboardType="default"
              autoComplete="name-middle"
              placeholderTextColor="darkgrey"
              maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
            />
          </View>
          <View style={styles.signupInputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              defaultValue={lastName}
              placeholder="Last name"
              textContentType="familyName"
              autoComplete="name"
              placeholderTextColor="darkgrey"
              maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
            />
          </View>
          <View style={styles.signupInputContainer}>
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
              maxLength={60}
            />
          </View>
          <View style={[styles.signupInputContainer, styles.zIndex]}>
            <DropDownPicker
              setValue={setGender}
              value={gender || ''}
              placeholder={'Biological gender'}
              items={[
                {
                  label: Gender.Male,
                  value: Gender.Male,
                },
                {
                  label: Gender.Female,
                  value: Gender.Female,
                },
                {
                  label: Gender.Other,
                  value: Gender.Other,
                },
              ]}
              open={genderPickerOpen}
              setOpen={setGenderPickerOpen}
              style={styles.dropdownPicker}
              dropDownContainerStyle={styles.dropdownPicker}
            />
          </View>
          <View style={styles.signupInputContainer}>
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
          </View>
          <View style={styles.signupInputContainer}>
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
          </View>
          <View style={defaultStyles.marginTop}>
            <AppText>Password requirements:</AppText>
            <AppText
              style={[
                {
                  textDecorationLine:
                    password && password === passwordConfirmation
                      ? 'line-through'
                      : 'none',
                },
              ]}>
              - Passwords should match
            </AppText>
            <AppText
              style={[
                {
                  textDecorationLine:
                    password.length >= 8 ? 'line-through' : 'none',
                },
              ]}>
              - Eight characters
            </AppText>
            <AppText
              style={{
                textDecorationLine: /\d/.test(password)
                  ? 'line-through'
                  : 'none',
              }}>
              - One digit
            </AppText>
            <AppText
              style={{
                textDecorationLine: /[A-Z]/.test(password)
                  ? 'line-through'
                  : 'none',
              }}>
              - One upper case character
            </AppText>
            <AppText
              style={{
                textDecorationLine: /[a-z]/.test(password)
                  ? 'line-through'
                  : 'none',
              }}>
              - One lower case character
            </AppText>
            <AppText
              style={{
                textDecorationLine: /[#!?@$%^&*-]/.test(password)
                  ? 'line-through'
                  : 'none',
              }}>
              - One special character: #?!@$%^&*-
            </AppText>
            <View>
              <AppText style={styles.errorMessage}>{errorMessage}</AppText>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.continueButton}>
          <GradientButton
            title={'Create'}
            onPress={async () => {
              const {cognitoUser, error} = await signUp(
                firstName,
                middleName,
                lastName,
                email,
                gender ?? '',
                password,
              );
              if (error) {
                setErrorMessage(error);
              }
              if (cognitoUser) {
                props.navigation.navigate('ConfirmUser', {email: email});
              }
            }}
            disabled={!buttonEnabled}
          />
        </View>
        <ClickableText
          text={'Go back'}
          onPress={() => {
            props.navigation.goBack();
          }}
          styles={[defaultStyles.textAlignCenter, styles.fontSize]}
        />
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  signupContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    marginTop: 50,
  },
  input: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    backgroundColor: 'white',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  continueButton: {
    marginBottom: 20,
  },
  signupInputContainer: {
    marginBottom: 5,
    zIndex: 1,
  },
  errorMessage: {
    color: 'red',
  },
  signupButton: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  genderLinearGradient: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    padding: 5,
  },
  dropdownPicker: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  zIndex: {
    zIndex: 10,
  },
  fontSize: {
    fontSize: 16,
  },
});
export default SignupScreen;
