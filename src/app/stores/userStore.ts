import {UserFragment} from '../graphql/operations';
import {create} from 'zustand';

interface UserStore {
  me?: UserFragment;
  setMe: (me: UserStore['me']) => void;

  resetStore: () => void;
}

const useUserStore = create<UserStore>()(set => ({
  me: undefined,
  setMe: (me): void => {
    set({me});
  },

  resetStore: (): void => {
    set({
      me: undefined,
    });
  },
}));

export default useUserStore;
