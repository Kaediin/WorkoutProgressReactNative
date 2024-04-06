import React, {PropsWithChildren, useEffect, useState} from 'react';
import useTimerStore from '../stores/timerStore';
import Constants from '../utils/Constants';
import {
  NativeModules,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import usePreferenceStore from '../stores/preferenceStore';
import PopupModal from '../components/common/PopupModal';
import useRouteStore from '../stores/routeStore';
// @ts-ignore
import BackgroundTimer from 'react-native-background-timer';
import {Pause} from '../icons/svg';
import CircularProgress from 'react-native-circular-progress-indicator';
import Sound from 'react-native-sound';

const {AudioSessionManager} = NativeModules;

const WorkoutTimerProvider: React.FC<PropsWithChildren> = props => {
  const isiOS = Platform.OS === 'ios';
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
        if (isiOS) {
          // Needed to keep the app active in background
          playSilence();
        }
        // Decrement every second
        if (!isPaused && secs > 0) {
          return secs - 1;
        } else if (secs === 0) {
          // Set to a negative to 'disable the timer'
          return -1;
        }
        return secs;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isPaused) {
      BackgroundTimer.stopBackgroundTimer();
    } else if (timerActive) {
      toggleTimer();
    }
  }, [isPaused]);

  // Checks if countdown = 0 and stop timer if so
  useEffect(() => {
    if (countdown === -1) {
      BackgroundTimer.stopBackgroundTimer();
      startTimer(false);
      Vibration.vibrate(10, false);
      if (preference?.playTimerCompletionSound && isiOS) {
        playSound();
      }
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
        case 'exercisesscreen':
          setHeight(220);
          return;
        default:
          setHeight(160);
          return;
      }
    }
  }, [routeName, timerActive]);

  const playSilence = (): void => {
    Sound.setCategory('Playback', true);
    const sound = new Sound('silence.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound with an option to mix with other sounds
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing silence');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        sound.release(); // Release the audio player resource once the sound is finished
      });
    });
  };

  const playSound = (): void => {
    if (isiOS) {
      // Activate the audio session before playing the sound. This ducks the volume of media currently playing
      AudioSessionManager.activateAudioSession();
    }

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

        if (isiOS) {
          // Deactivate the audio session after the sound finishes playing. This highers the volume of the media playing
          AudioSessionManager.deactivateAudioSession();
        }
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
          onPress={() => {
            setIsPaused(!isPaused);
          }}
          onLongPress={() => setShowClearCountdownPopup(true)}>
          <View style={styles.innerCircleCountdown}>
            {!isPaused ? (
              <CircularProgress
                value={countdown}
                maxValue={
                  preference?.timerDuration || Constants.DEFAULT_DURATION
                }
                radius={30}
              />
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
    right: 35,
    zIndex: 100,
  },
  innerCircleCountdown: {
    backgroundColor: Constants.PRIMARY_GRADIENT[0],
    width: 45,
    height: 45,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkoutTimerProvider;
