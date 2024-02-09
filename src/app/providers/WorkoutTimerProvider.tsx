import React, {PropsWithChildren, useEffect, useState} from 'react';
import useTimerStore from '../stores/timerStore';
import Constants from '../utils/Constants';
import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import usePreferenceStore from '../stores/preferenceStore';
import PopupModal from '../components/common/PopupModal';
import useRouteStore from '../stores/routeStore';
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';
import {defaultStyles} from '../utils/DefaultStyles';
import {Pause} from '../icons/svg';

const {AudioSessionManager} = NativeModules;

const WorkoutTimerProvider: React.FC<PropsWithChildren> = props => {
  const preference = usePreferenceStore(state => state.preference);
  const hideTimer = useTimerStore(state => state.timerHidden);
  const startTimer = useTimerStore(state => state.startTimer);
  const timerActive = useTimerStore(state => state.timerActive);
  const [countdown, setCountdown] = useState<number>(0);
  const [showClearCountdownPopup, setShowClearCountdownPopup] = useState(false);
  const routeName = useRouteStore(state => state.routeName);

  const [height, setHeight] = useState<number>(220);

  const [isPaused, setIsPaused] = useState(false);

  const toggleTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setCountdown(secs => {
        // Decrement every second
        if (secs > 0) {
          return secs - 1;
        } else if (secs === 0) {
          // Set to a negative to 'disable the timer'
          return -1;
        }
        return -1;
      });
    }, 1000);
  };

  // Checks if countdown = 0 and stop timer if so
  useEffect(() => {
    if (countdown === -1) {
      BackgroundTimer.stopBackgroundTimer();
      startTimer(false);
      playSound();
    }
  }, [countdown]);

  useEffect(() => {
    if (timerActive) {
      setCountdown(preference?.timerDuration || Constants.DEFAULT_DURATION);
      setIsPaused(false);
      toggleTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
      setCountdown(0);
    }
  }, [timerActive]);

  useEffect(() => {
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
    // Activate the audio session before playing the sound. This ducks the volume of media currently playing
    AudioSessionManager.activateAudioSession();

    Sound.setCategory('Playback', true);
    const sound = new Sound('done.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound with an option to mix with other sounds
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        sound.release(); // Release the audio player resource once the sound is finished

        // Deactivate the audio session after the sound finishes playing. This highers the volume of the media playing
        AudioSessionManager.deactivateAudioSession();
      });
    });
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
          setShowClearCountdownPopup(false);
        }}
      />
      {timerActive && (
        <TouchableOpacity
          // Conditionally hide button offscreen
          style={[styles.countDownCircle, {bottom: hideTimer ? -100 : height}]}
          onPress={() => setIsPaused(!isPaused)}
          onLongPress={() => setShowClearCountdownPopup(true)}>
          <View style={styles.innerCircleCountdown}>
            {!isPaused ? (
              <Text style={defaultStyles.whiteTextColor}>{countdown}</Text>
            ) : (
              <Pause />
            )}
          </View>
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
