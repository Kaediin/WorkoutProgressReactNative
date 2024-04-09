import {create} from 'zustand';
import {HealthValue} from 'react-native-health';

interface AppleHealthStore {
  authStatus: HealthValue | undefined;
  setAuthStatus: (authStatus: HealthValue) => void;

  resetStore: () => void;
}

const useAppleHealthStore = create<AppleHealthStore>()(set => ({
  authStatus: undefined,
  setAuthStatus: (authStatus): void => set({authStatus}),

  resetStore: (): void => {
    set({
      authStatus: undefined,
    });
  },
}));

export default useAppleHealthStore;
