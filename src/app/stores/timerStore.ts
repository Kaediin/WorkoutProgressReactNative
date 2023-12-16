import {create} from 'zustand';

interface TimerStore {
  timerActive?: boolean;
  startTimer: (timerActive: boolean) => void;
  resetStore: () => void;
}

const useTimerStore = create<TimerStore>()(set => ({
  timerActive: false,
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
