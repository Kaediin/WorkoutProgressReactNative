import {create} from 'zustand';

interface TimerStore {
  isTimerPlaying?: boolean;
  setIsTimerPlaying: (isPlaying: boolean) => void;
  timerHidden?: boolean;
  toggleVisibility: (toggleVisibility: boolean) => void;
  resetStore: () => void;
}

const useTimerStore = create<TimerStore>()(set => ({
  isTimerPlaying: false,
  timerHidden: false,
  setIsTimerPlaying: (isPlaying): void => {
    set({isTimerPlaying: isPlaying});
  },
  toggleVisibility: (hideTimer): void => {
    set({timerHidden: hideTimer});
  },

  resetStore: (): void => {
    set({
      isTimerPlaying: false,
      timerHidden: false,
    });
  },
}));

export default useTimerStore;
