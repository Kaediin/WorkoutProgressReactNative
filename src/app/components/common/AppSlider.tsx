import React from 'react';
import Constants from '../../utils/Constants';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

interface AppSliderProps {
  value: number;
  min?: number;
  max?: number;
  trackMinColor?: string;
  trackMaxColor?: string;
  disabled: boolean;
  onChange?: (value: number) => void;
  step?: number;
  thumbSize?: number;
}

const AppSlider: React.FC<AppSliderProps> = props => {
  return (
    <View style={styles.containerEffort}>
      <View style={styles.containerEffortContent}>
        <LinearGradient
          colors={[
            props.trackMinColor ?? '#00FF00',
            props.trackMaxColor ?? '#FF0000',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.containerEffortLinearGradient}
        />
        <Slider
          value={props.value}
          minimumValue={props.min ?? 0}
          maximumValue={props.max ?? 100}
          step={props.step ?? 1}
          minimumTrackTintColor={'transparent'}
          maximumTrackTintColor={'transparent'}
          onSlidingComplete={props.onChange}
          style={styles.containerEffortSlider}
          disabled={props.disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerEffort: {
    width: '100%',
    position: 'relative',
    height: 50,
  },
  containerEffortContent: {
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerEffortLinearGradient: {
    width: '90%',
    height: 5,
    position: 'absolute',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  containerEffortSlider: {
    width: '100%',
  },
});

export default AppSlider;
