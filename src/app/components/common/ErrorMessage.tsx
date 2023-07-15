import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Constants from '../../utils/Constants';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  return <Text style={styles.errorMessage}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    margin: Constants.CONTAINER_PADDING,
    textDecorationLine: 'underline',
  },
});

export default ErrorMessage;
