import React, {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {StyleSheet} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

interface GradientBackgroundProps {
  gradient?: string[];
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const GradientBackground: React.FC<GradientBackgroundProps> = props => {
  return (
    <LinearGradient
      colors={props.gradient ?? Constants.PRIMARY_GRADIENT}
      style={[styles.container, props.styles]}>
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
