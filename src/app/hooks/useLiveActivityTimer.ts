import React, {useCallback, useEffect, useMemo} from 'react';
import {
  NativeEventEmitter,
  NativeModule,
  NativeModules,
  Platform,
  Vibration,
} from 'react-native';
// @ts-ignore
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';
import usePreferenceStore from '../stores/preferenceStore';
import useTimerStore from '../stores/timerStore';

const {AudioSessionManager, TimerWidgetModule} = NativeModules;

const TimerEventEmitter = new NativeEventEmitter(
  NativeModules.TimerEventEmitter as NativeModule,
);

const useLiveActivityTimer = () => {
  // Constants
  const isiOS = Platform.OS === 'ios';
  const preference = usePreferenceStore(state => state.preference);
  const setIsTimerPlaying = useTimerStore(state => state.setIsTimerPlaying);

  // State
  const [duration, setDuration] = React.useState(0);
  const [elapsedTimeInMs, setElapsedTimeInMs] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Refs
  const endTime = React.useRef<number | null>(null);
  const pausedTime = React.useRef<number | null>(null);
  const intervalId = React.useRef<NodeJS.Timeout | null>(null);

  const remainingTime = useMemo(
    () => Math.abs(duration - Math.floor(elapsedTimeInMs / 1000)),
    [elapsedTimeInMs, duration],
  );

  const play = useCallback((durationGoal: number) => {
    setIsPlaying(true);
    // Already playing, returning early
    if (intervalId.current) {
      return;
    }

    // First time playing, set the end time
    setDuration(durationGoal);
    if (!endTime.current) {
      endTime.current = Date.now();
    }

    startBGSilence();
    if (pausedTime.current) {
      // If the timer is paused, we need to update the start time
      const elapsedSincePaused = Date.now() - pausedTime.current;
      endTime.current = endTime.current! + elapsedSincePaused;
      pausedTime.current = null;
      TimerWidgetModule.resume(durationGoal);
    } else {
      TimerWidgetModule.startLiveActivity(endTime.current / 1000, durationGoal);
    }

    intervalId.current = setInterval(() => {
      setElapsedTimeInMs(Date.now() - endTime.current!);
    }, 32);
  }, []);

  const pause = useCallback((durationGoal: number) => {
    console.log(durationGoal);
    setIsPlaying(false);
    setDuration(durationGoal);
    removeInterval();
    if (endTime.current && !pausedTime.current && durationGoal) {
      pausedTime.current = Date.now();
      TimerWidgetModule.pause(pausedTime.current / 1000, durationGoal);
      setElapsedTimeInMs(pausedTime.current! - endTime.current!);
    }
  }, []);

  const reset = useCallback(() => {
    console.log('reset');
    // Stop bg silence
    BackgroundTimer.stopBackgroundTimer();
    setIsPlaying(false);
    removeInterval();
    endTime.current = null;
    pausedTime.current = null;
    setElapsedTimeInMs(0);
    TimerWidgetModule.stopLiveActivity();
  }, []);

  const startBGSilence = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      // setCountdown(secs => {
      if (isiOS) {
        // Needed to keep the app active in background
        playSilence();
      }
    }, 1000);
  };

  // Checks if countdown = 0 and stop timer if so
  useEffect(() => {
    if (remainingTime === 0 && isPlaying) {
      reset();
      Vibration.vibrate(10, false);
      if (preference?.playTimerCompletionSound && isiOS) {
        playSound();
      }
    }
  }, [remainingTime, isPlaying]);

  const playSilence = (): void => {
    Sound.setCategory('Playback', true);
    const sound = new Sound('silence.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound with an option to mix with other sounds
      sound.play(success => {
        if (!success) {
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

  useEffect(() => {
    setIsTimerPlaying(!!endTime.current);
  }, [endTime.current]);

  useEffect(() => {
    const pauseSubscription = TimerEventEmitter.addListener('onPause', pause);
    const resumeSubscription = TimerEventEmitter.addListener('onResume', play);
    const resetSubscription = TimerEventEmitter.addListener('onReset', reset);

    return () => {
      pauseSubscription.remove();
      resumeSubscription.remove();
      resetSubscription.remove();
    };
  }, [pause, reset, play]);

  function removeInterval() {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }

  return {
    play,
    pause,
    reset,
    remainingTime,
    isPlaying,
    isActive: !!endTime.current,
  };
};

export default useLiveActivityTimer;
