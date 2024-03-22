import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import AppText from './AppText';

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
    height: 38,
    width: '100%',
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
  warmup: {opacity: 0.4},
});

const GradientButton: React.FC<GradientButtonProps> = props => {
  return props.disabled ? (
    <LinearGradient
      colors={props.gradients ?? Constants.SECONDARY_GRADIENT}
      locations={[0, 1]}
      style={[stylesGrad.warmup, stylesGrad.linearGradient, props.styles]}>
      <AppText style={stylesGrad.title}>{props.title}</AppText>
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
            <AppText style={[stylesGrad.title, stylesGrad.titleOutline]}>
              {props.title}
            </AppText>
          </View>
        ) : (
          <AppText style={stylesGrad.title}>{props.title}</AppText>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
