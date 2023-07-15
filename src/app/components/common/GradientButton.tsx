import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface GradientButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  gradients?: string[];
  outlineBackgroundColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const stylesGrad = StyleSheet.create({
  outlineContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 38,
    width: 244,
    borderRadius: Constants.BORDER_RADIUS_LARGE,
    color: 'black',
  },
  linearGradient: {
    height: 44,
    width: 250,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: Constants.BORDER_RADIUS_LARGE,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
  titleOutline: {
    color: 'black',
  },
  opacity: {opacity: 0.2},
});

const GradientButton: React.FC<GradientButtonProps> = props => {
  return props.disabled ? (
    <LinearGradient
      colors={props.gradients ?? Constants.SECONDARY_GRADIENT}
      locations={[0, 1]}
      style={[props.styles, stylesGrad.opacity, stylesGrad.linearGradient]}>
      <Text style={stylesGrad.title}>{props.title}</Text>
    </LinearGradient>
  ) : (
    <TouchableOpacity
      style={props.styles}
      onPress={props.onClick}
      activeOpacity={0.6}>
      <LinearGradient
        colors={props.gradients ?? Constants.SECONDARY_GRADIENT}
        locations={[0, 1]}
        style={stylesGrad.linearGradient}>
        {props.outlineBackgroundColor ? (
          <View
            style={[
              stylesGrad.outlineContainer,
              {backgroundColor: props.outlineBackgroundColor},
            ]}>
            <Text style={[stylesGrad.title, stylesGrad.titleOutline]}>
              {props.title}
            </Text>
          </View>
        ) : (
          <Text style={stylesGrad.title}>{props.title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
