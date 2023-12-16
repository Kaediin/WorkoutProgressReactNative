import React, {PropsWithChildren, useEffect, useState} from 'react';
import useTimerStore from '../stores/timerStore';
import Constants from '../utils/Constants';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ColorFormat,
  CountdownCircleTimer,
} from 'react-native-countdown-circle-timer';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {defaultStyles} from '../utils/DefaultStyles';
import {Pause} from '../icons/svg';
import usePreferenceStore from '../stores/preferenceStore';
import PopupModal from '../components/common/PopupModal';
import useRouteStore from '../stores/routeStore';

const WorkoutTimerProvider: React.FC<PropsWithChildren> = props => {
  const preference = usePreferenceStore(state => state.preference);
  const startTimer = useTimerStore(state => state.startTimer);
  const timerActive = useTimerStore(state => state.timerActive);
  const [countdown, setCountdown] = useState<number>(0);
  const [countdownIsPlaying, setCountdownIsPlaying] = useState(false);
  const [showClearCountdownPopup, setShowClearCountdownPopup] = useState(false);
  const routeName = useRouteStore(state => state.routeName);

  const [height, setHeight] = useState<number>(220);

  useEffect(() => {
    if (timerActive) {
      if (countdown) {
        setCountdown(0);
        setCountdownIsPlaying(false);
      } else {
        setCountdown(preference?.timerDuration || Constants.DEFAULT_DURATION);
        setCountdownIsPlaying(true);
      }
    }
  }, [timerActive]);

  useEffect(() => {
    if (routeName && timerActive) {
      switch (routeName.toLowerCase()) {
        case 'workoutdetail':
        case 'workoutsoverview':
          setHeight(210);
          return;
        default:
          setHeight(150);
          return;
      }
    }
  }, [routeName]);

  const playSound = (): void => {
    const Sound = require('react-native-sound');
    Sound.setCategory('Playback');
    // @ts-ignore
    const completeSound = new Sound('done.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      completeSound.setVolume(1);

      // @ts-ignore
      completeSound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

    completeSound.release();
  };

  return (
    <>
      <PopupModal
        message={'Are you sure you want to clear the countdown?'}
        isOpen={showClearCountdownPopup}
        type={'WARNING'}
        onDismiss={() => setShowClearCountdownPopup(false)}
        onConfirm={() => {
          startTimer(false);
          setCountdown(0);
          setCountdownIsPlaying(false);
          setShowClearCountdownPopup(false);
        }}
      />
      {timerActive && (
        <TouchableOpacity
          style={[styles.countDownCircle, {bottom: height}]}
          onPress={() => setCountdownIsPlaying(!countdownIsPlaying)}
          onLongPress={() => setShowClearCountdownPopup(true)}>
          <CountdownCircleTimer
            duration={countdown}
            // @ts-ignore
            colors={Constants.TIMER_GRADIENT}
            size={58}
            strokeWidth={5}
            trailColor={Constants.PRIMARY_GRADIENT[0] as ColorFormat}
            onComplete={() => {
              startTimer(false);
              setCountdown(0);
              RNReactNativeHapticFeedback.trigger('notificationSuccess', {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: true,
              });
              playSound();
            }}
            isPlaying={countdownIsPlaying}>
            {({remainingTime}) => (
              <View style={styles.innerCircleCountdown}>
                {countdownIsPlaying ? (
                  <Text style={defaultStyles.whiteTextColor}>
                    {remainingTime}
                  </Text>
                ) : (
                  <Pause />
                )}
              </View>
            )}
          </CountdownCircleTimer>
        </TouchableOpacity>
      )}
      {props.children}
    </>
  );
};

const styles = StyleSheet.create({
  countDownCircle: {
    position: 'absolute',
    right: 30,
    // bottom: 210,
    zIndex: 99999,
  },
  innerCircleCountdown: {
    backgroundColor: Constants.PRIMARY_GRADIENT[0],
    width: 50,
    height: 50,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkoutTimerProvider;
