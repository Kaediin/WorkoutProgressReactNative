import {create} from 'zustand';

export enum AuthState {
  USER_NOT_CONFIRMED = 'USER_NOT_CONFIRMED',
  USER_CONFIRMED = 'USER_CONFIRMED',
  ONBOARDING = 'ONBOARDING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  INITIAL_LOAD = 'INITIAL_LOAD',
  UNKNOWN = 'UNKNOWN',
}

interface AuthStore {
  state: AuthState;
  setState: (state: AuthStore['state']) => void;

  authToken?: string;
  setAuthToken: (authToken: AuthStore['authToken']) => void;

  // otpCode: string;
  // setOtpCode: (otpCode: AuthStore['otpCode']) => void;

  resetStore: () => void;
}

const useAuthStore = create<AuthStore>()(set => ({
  state: AuthState.INITIAL_LOAD,
  setState: (state): void => {
    console.log('[authStore] Settings state to ' + state);
    set({state});
  },

  authToken: undefined,
  setAuthToken: (authToken): void => set({authToken}),

  // otpCode: '',
  // setOtpCode: (otpCode): void => set({otpCode}),

  resetStore: (): void =>
    set({
      state: AuthState.UNAUTHENTICATED,
      authToken: undefined,
      // otpCode: '',
    }),
}));

export default useAuthStore;
