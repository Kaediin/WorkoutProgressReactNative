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
import {AuthStackParamList} from '../AppRoute';
import {Gender} from '../../types/Type';
import {isValidEmail, isValidPassword} from '../../utils/String';
import useAuth from '../../hooks/useAuth';
import DropDownPicker from 'react-native-dropdown-picker';
import {defaultStyles} from '../../utils/DefaultStyles';
import ClickableText from '../../components/common/ClickableText';
import AppText from '../../components/common/AppText';

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
              value={firstName}
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
              value={middleName}
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
              value={lastName}
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
              value={email}
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
            <AppText style={[defaultStyles.footnote, styles.footnote]}>
              Biological gender is only used for personalised content based on
              your tracked workouts
            </AppText>
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
              value={password}
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
              value={passwordConfirmation}
              placeholder="Confirm password"
              textContentType="newPassword"
              autoComplete="password-new"
              placeholderTextColor="darkgrey"
              secureTextEntry
              maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
            />
          </View>
          <AppText style={[defaultStyles.footnote, styles.footnote]}>
            Your password should contain at least eight characters: one digit,
            one upper case, one lower case, and one special character.
          </AppText>
          <View>
            <AppText style={styles.errorMessage}>{errorMessage}</AppText>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.continueButton}>
          <GradientButton
            title={'Create'}
            onClick={async () => {
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
    marginTop: 20,
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
  footnote: {
    marginBottom: 5,
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
