import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  gradients?: string[];
}

const stylesGrad = StyleSheet.create({
  linearGradient: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const GradientButton: React.FC<GradientButtonProps> = props => {
  return props.disabled ? (
    <LinearGradient
      colors={props.gradients ?? Constants.SECONDARY_GRADIENT}
      locations={[0, 1]}
      style={[{opacity: 0.2}, stylesGrad.linearGradient]}>
      <Text style={stylesGrad.title}>{props.title}</Text>
    </LinearGradient>
  ) : (
    <TouchableOpacity onPress={props.onClick} activeOpacity={0.6}>
      <LinearGradient
        colors={props.gradients ?? Constants.SECONDARY_GRADIENT}
        locations={[0, 1]}
        style={stylesGrad.linearGradient}>
        <Text style={stylesGrad.title}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
