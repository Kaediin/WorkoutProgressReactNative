import React from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback} from 'react-native';

interface AnimatedPressableProps {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  onPress,
  children,
  disabled,
  ...props
}) => {
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 1.05];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = (): void => {
    Animated.spring(animation, {
      toValue: 1,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (): void => {
    Animated.spring(animation, {
      toValue: 0,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      disabled={disabled}
      {...props}>
      <Animated.View style={[styles.animatedView, {transform: [{scale}]}]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    alignItems: 'center',
    width: '100%',
  },
});

export default AnimatedPressable;
