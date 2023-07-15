import React, {useEffect, useMemo, useState} from 'react';
import Constants from '../../utils/Constants';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
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
import useAuthStore, {AuthState} from '../../stores/authStore';
import DropDownPicker from 'react-native-dropdown-picker';
import {defaultStyles} from '../../utils/DefaultStyles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = props => {
  const authState: AuthState = useAuthStore(state => state.state);

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
      gender !== undefined &&
      isValidPassword(password) &&
      password === passwordConfirmation,
    [firstName, lastName, email, gender, password, passwordConfirmation],
  );

  useEffect(() => {
    if (authState === AuthState.USER_NOT_CONFIRMED && email) {
      props.navigation.navigate('ConfirmUser', {email: email});
    }
  }, [authState]);

  return (
    <LinearGradient colors={Constants.PRIMARY_GRADIENT}>
      <View style={styles.signupContainer}>
        <Text
          style={[
            defaultStyles.h1,
            defaultStyles.whiteTextColor,
            defaultStyles.textAlignCenter,
            defaultStyles.container,
          ]}>
          Signup
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}>
          <View style={styles.signupForm}>
            <View style={styles.signupInputContainer}>
              <TextInput
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
              <TextInput
                style={styles.input}
                onChangeText={setMiddleName}
                value={middleName}
                placeholder="Middle name (optional)"
                textContentType="middleName"
                autoComplete="name"
                placeholderTextColor="darkgrey"
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
              />
            </View>
            <View style={[styles.signupInputContainer, styles.zIndex]}>
              <Text style={[defaultStyles.footnote, styles.footnote]}>
                Biological gender is only used for personalised content based on
                your tracked workouts
              </Text>
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
              />
            </View>
            <Text style={[defaultStyles.footnote, styles.footnote]}>
              Your password should contain at least eight characters: one digit,
              one upper case, one lower case, and one special character.
            </Text>
            <View>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.backButton}>
          <View style={styles.continueButton}>
            <GradientButton
              title={'Create'}
              onClick={async () => {
                if (!gender) {
                  return;
                }
                const {cognitoUser, error} = await signUp(
                  firstName,
                  middleName,
                  lastName,
                  email,
                  gender,
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
          <GradientButton
            title={'Go back'}
            onClick={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>
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
    padding: Constants.CONTAINER_PADDING,
    backgroundColor: 'white',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  continueButton: {
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    width: '100%',
    left: 20,
    bottom: 100,
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
});
export default SignupScreen;
