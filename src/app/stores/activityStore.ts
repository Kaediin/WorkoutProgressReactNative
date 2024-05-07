import {create} from 'zustand';

interface ActivityStore {
  refetchActivity?: boolean;
  setRefetchActivity: (refetch: boolean) => void;
}

const useActivityStore = create<ActivityStore>()(set => ({
  refetchActivity: false,
  setRefetchActivity: (refetch): void => {
    set({refetchActivity: refetch});
  },
}));

export default useActivityStore;
