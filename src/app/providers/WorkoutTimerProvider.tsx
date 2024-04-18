import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';
import useTimerStore from '../stores/timerStore';
import Constants from '../utils/Constants';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import usePreferenceStore from '../stores/preferenceStore';
import ConfirmModal from '../components/common/ConfirmModal';
import useRouteStore from '../stores/routeStore'; // @ts-ignore
import {Pause} from '../icons/svg';
import CircularProgress from 'react-native-circular-progress-indicator';
import useLiveActivityTimer from '../hooks/useLiveActivityTimer';

export const TimerContext = React.createContext({
  toggle: (resetTimer: boolean) => {},
});

const WorkoutTimerProvider: React.FC<PropsWithChildren> = props => {
  // Hook for live activities
  const {reset, play, pause, remainingTime, isPlaying, isActive} =
    useLiveActivityTimer();

  const preference = usePreferenceStore(state => state.preference);
  const hideTimer = useTimerStore(state => state.timerHidden);
  const [showClearCountdownPopup, setShowClearCountdownPopup] = useState(false);
  const routeName = useRouteStore(state => state.routeName);

  const [height, setHeight] = useState<number>(220);

  const timerDuration = useMemo(
    () => preference?.timerDuration ?? Constants.DEFAULT_DURATION,
    [preference?.timerDuration],
  );

  const toggle = (resetTimer: boolean) => {
    if (resetTimer) {
      reset();
    } else {
      play(timerDuration);
    }
  };

  useEffect(() => {
    if (routeName && isPlaying) {
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
  }, [routeName, isPlaying]);

  return (
    <TimerContext.Provider value={{toggle}}>
      <ConfirmModal
        message={'Are you sure you want to clear the countdown?'}
        isOpen={showClearCountdownPopup}
        type={'WARNING'}
        onDismiss={() => setShowClearCountdownPopup(false)}
        onConfirm={() => {
          reset();
          setShowClearCountdownPopup(false);
        }}
      />
      {isActive && (
        <TouchableOpacity
          // Conditionally hide button offscreen
          style={[styles.countDownCircle, {bottom: hideTimer ? -100 : height}]}
          onPress={() => {
            if (isPlaying) {
              console.log(
                '[WorkoutTimerProvider] Pausing timer',
                timerDuration,
              );
              pause(timerDuration);
            } else {
              // Resume
              play(timerDuration);
            }
          }}
          onLongPress={() => setShowClearCountdownPopup(true)}>
          <View style={styles.innerCircleCountdown}>
            {isPlaying ? (
              <CircularProgress
                value={remainingTime}
                maxValue={timerDuration}
                radius={30}
              />
            ) : (
              <Pause />
            )}
          </View>
        </TouchableOpacity>
      )}
      {props.children}
    </TimerContext.Provider>
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
