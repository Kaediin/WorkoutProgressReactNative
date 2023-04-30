import React, {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../utils/Constants';
import {StyleSheet} from 'react-native';

interface GradientBackgroundProps {
  gradient?: string[];
  children: ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = props => {
  return (
    <LinearGradient
      colors={props.gradient ?? Constants.PRIMARY_GRADIENT}
      style={styles.container}>
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
