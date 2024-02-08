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
  const hideTimer = useTimerStore(state => state.timerHidden);
  const startTimer = useTimerStore(state => state.startTimer);
  const timerActive = useTimerStore(state => state.timerActive);
  const [countdown, setCountdown] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showClearCountdownPopup, setShowClearCountdownPopup] = useState(false);
  const routeName = useRouteStore(state => state.routeName);

  const [height, setHeight] = useState<number>(220);

  useEffect(() => {
    if (timerActive) {
      setCountdown(preference?.timerDuration || Constants.DEFAULT_DURATION);
      setIsPaused(false);
    } else {
      setCountdown(0);
    }
  }, [timerActive]);

  useEffect(() => {
    console.log(routeName, timerActive);
    if (routeName && timerActive) {
      switch (routeName.toLowerCase()) {
        case 'draggablebottomopen':
          setHeight(-100);
          return;
        case 'draggablebottomclose':
        case 'workoutdetail':
        case 'workoutsoverview':
          setHeight(210);
          return;
        default:
          setHeight(150);
          return;
      }
    }
  }, [routeName, timerActive]);

  const playSound = (): void => {
    const Sound = require('react-native-sound');
    // try alarm instead, see if that works.
    Sound.setCategory('Ambient', true);
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
          setIsPaused(false);
          setShowClearCountdownPopup(false);
        }}
      />
      {timerActive && (
        <TouchableOpacity
          // Conditionally hide button offscreen
          style={[styles.countDownCircle, {bottom: hideTimer ? -100 : height}]}
          onPress={() => setIsPaused(!isPaused)}
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
            isPlaying={!isPaused}>
            {({remainingTime}) => (
              <View style={styles.innerCircleCountdown}>
                {!isPaused ? (
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
    zIndex: 100,
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
