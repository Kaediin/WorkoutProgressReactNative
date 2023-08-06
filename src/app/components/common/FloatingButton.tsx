import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';

interface FloatingButtonProps {
  onClick?: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({onClick}) => {
  return (
    <View style={defaultStyles.shadow}>
      <LinearGradient
        colors={Constants.SECONDARY_GRADIENT}
        style={[styles.container]}>
        <TouchableOpacity onPress={onClick} style={styles.touchableOpacity}>
          <Text style={styles.textColor}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
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
