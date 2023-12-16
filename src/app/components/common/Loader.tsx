import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999,
  },
});

interface LoaderProps {
  isLoading?: boolean;
  style?: ViewStyle;
  size?: ActivityIndicatorProps['size'];
  dark?: boolean;
}

const Loader: React.FC<LoaderProps> = ({isLoading, style, size, dark}) => {
  if (isLoading === false) {
    return null;
  }

  return (
    <View style={style ? style : styles.container}>
      <ActivityIndicator
        size={size || 'large'}
        color={dark ? 'black' : 'white'}
        animating
      />
    </View>
  );
};

export default Loader;
