import React, {useEffect, useRef} from 'react';
import {Animated, Easing, EasingFunction, View} from 'react-native';
import ValueXY = Animated.ValueXY;
import Value = Animated.Value;

interface AnimatedViewProps {
  showChildren: boolean;
  children: React.ReactNode;
  animationDuration?: number;
  withOpacityAnimation?: boolean;
  onAfterAnimation?: () => void;
  contentHeight?: number;
  easing?: EasingFunction;
}

const DEFAULT_ANIMATION_DURATION = 500;
const DEFAULT_CONTENT_HEIGHT = 1000;

const ExpandableView: React.FC<AnimatedViewProps> = props => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const maxHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, props.contentHeight ?? DEFAULT_CONTENT_HEIGHT], // value that larger than content's height
  });

  const animate = (
    animatedRef: Value | ValueXY,
    value: number,
    onFinish?: () => void,
  ): void => {
    Animated.timing(animatedRef, {
      toValue: value,
      duration: props.animationDuration ?? DEFAULT_ANIMATION_DURATION,
      easing: props.easing ?? Easing.linear,
      useNativeDriver: false, // Needs to set false to prevent yellow box warning
    }).start(onFinish); // Gets called after completion
  };

  useEffect(() => {
    if (props.showChildren) {
      animate(animatedHeight, 1, props.onAfterAnimation);
      if (props.withOpacityAnimation) {
        animate(animatedOpacity, 1);
      }
    } else if (!props.showChildren) {
      animate(animatedHeight, 0, props.onAfterAnimation);
      if (props.withOpacityAnimation) {
        animate(animatedOpacity, 0);
      }
    }
  }, [props.showChildren]);

  return (
    <View>
      <Animated.View
        style={{
          opacity: props.withOpacityAnimation ? animatedOpacity : 1,
          maxHeight,
          overflow: 'hidden',
        }}>
        {props.children}
      </Animated.View>
    </View>
  );
};

export default ExpandableView;
