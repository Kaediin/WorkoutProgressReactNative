import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';

interface FloatingButtonProps {
  onClick?: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({onClick}) => {
  return (
    <LinearGradient
      colors={Constants.POSITIVE_GRADIENT}
      style={styles.container}>
      <TouchableOpacity onPress={onClick} style={styles.touchableOpacity}>
        <Text style={styles.textColor}>+</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 999,
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
  },
  textColor: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: 'white',
  },
  touchableOpacity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
});

export default FloatingButton;
