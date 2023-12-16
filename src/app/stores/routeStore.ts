import {create} from 'zustand';

interface RouteStore {
  routeName?: string;
  setRouteName: (routeName: string) => void;
  resetStore: () => void;
}

const useRouteStore = create<RouteStore>()(set => ({
  routeName: '',
  setRouteName: (routeName): void => {
    set({routeName});
  },
  resetStore: (): void => {
    set({
      routeName: '',
    });
  },
}));

export default useRouteStore;
