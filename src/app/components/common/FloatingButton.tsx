import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';
import {Retry} from '../../icons/svg';

interface FloatingButtonProps {
  onClick?: () => void;
  secondary?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  secondary,
}) => {
  return (
    <View
      style={[
        defaultStyles.shadow,
        secondary ? styles.alignmentSecondary : styles.alignment,
      ]}>
      <LinearGradient
        colors={Constants.SECONDARY_GRADIENT}
        style={[styles.container]}>
        <TouchableOpacity
          onPress={onClick}
          style={
            secondary
              ? styles.alignmentTouchableOpacity
              : styles.touchableOpacity
          }>
          {secondary ? <Retry /> : <Text style={styles.textColor}>+</Text>}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  alignment: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
  },
  container: {
    borderRadius: 999,
  },
  textColor: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: 'white',
  },
  secondaryTextColor: {
    fontWeight: 'bold',
    fontSize: 10,
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
  alignmentTouchableOpacity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  alignmentSecondary: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    width: 40,
    height: 40,
  },
});

export default FloatingButton;
