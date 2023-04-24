import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import GradientButton from '../common/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import useAuth from '../../hooks/useAuth';

const LoginScreen: React.FC = () => {
  const {signIn} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          colors={Constants.GRADIENT}
          style={styles.linearGradient}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            textContentType="emailAddress"
            autoComplete="email"
            keyboardType="email-address"
            inputMode="email"
          />
        </LinearGradient>
        <LinearGradient
          colors={Constants.GRADIENT}
          style={styles.linearGradient}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            textContentType="password"
            placeholder="Password"
            inputMode="text"
            autoComplete="password-new"
            secureTextEntry
          />
        </LinearGradient>
        <GradientButton
          title={'Login'}
          onClick={() => {
            signIn(email, password);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    margin: 5,
    padding: 10,
    color: 'white',
    backgroundColor: 'black',
  },
  linearGradient: {
    marginVertical: 5,
    borderRadius: Constants.BORDER_RADIUS,
  },
});

export default LoginScreen;
