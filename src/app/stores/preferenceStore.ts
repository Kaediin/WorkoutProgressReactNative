import {PreferenceFragment} from '../graphql/operations';
import {create} from 'zustand';

interface PreferenceStore {
  preference?: PreferenceFragment;
  setPreference: (preference: PreferenceStore['preference']) => void;
  resetStore: () => void;
}

const usePreferenceStore = create<PreferenceStore>()(set => ({
  preference: undefined,
  setPreference: (preference): void => {
    set({preference});
  },
  resetStore: (): void => {
    set({
      preference: undefined,
    });
  },
}));
export default usePreferenceStore;
