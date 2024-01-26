import {create} from 'zustand';

interface TimerStore {
  timerActive?: boolean;
  timerHidden?: boolean;
  toggleVisibility: (toggleVisibility: boolean) => void;
  startTimer: (timerActive: boolean) => void;
  resetStore: () => void;
}

const useTimerStore = create<TimerStore>()(set => ({
  timerActive: false,
  timerHidden: false,
  toggleVisibility: (hideTimer): void => {
    set({timerHidden: hideTimer});
  },
  startTimer: (timerActive): void => {
    set({timerActive});
  },
  resetStore: (): void => {
    set({
      timerActive: false,
    });
  },
}));

export default useTimerStore;
