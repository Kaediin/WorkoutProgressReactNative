import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';

interface GradientButtonProps {
  title: string;
  onClick: () => void;
  enabled?: boolean;
  gradients?: string[];
}

const stylesGrad = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 25,
    width: '100%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
  },
  touchableOpacity: {
    alignItems: 'center',
    width: '100%',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '400',
    color: 'white',
  },
});

const GradientButton: React.FC<GradientButtonProps> = props => {
  return (
    <TouchableOpacity
      style={stylesGrad.touchableOpacity}
      onPress={props.onClick}
      activeOpacity={0.6}>
      <View style={stylesGrad.container}>
        <LinearGradient
          colors={Constants.GRADIENT}
          locations={[0, 1]}
          style={stylesGrad.linearGradient}>
          <View>
            <Text style={stylesGrad.title}>{props.title}</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default GradientButton;
