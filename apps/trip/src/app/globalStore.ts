import type { UserInfoType } from '@/typings/auth.types';
import StorageKeys from '@/typings/storage.types';
import type {} from '@/typings/trip.types';
import createStoreSlice, { SetFn } from '@/utils/createStoreSlice';

interface GlobalState {
  userInfo: UserInfoType;
  menuItems: any[];
}
interface GlobalActions {
  actions: {
    setUserInfo: (userInfo: UserInfoType) => void;
    setMenuItems: (menuItems: any[]) => void;
  };
}
const initialState: GlobalState = {
  userInfo: {
    userName: '',
  },
  menuItems: [],
};

export const setMenuItems = (set: SetFn<GlobalState>) => (menuItems: any[]) => {
  set(() => ({ menuItems }));
};

export const setUserInfo =
  (set: SetFn<GlobalState>) => (userInfo: UserInfoType) => {
    set(() => ({ userInfo }));
  };

const useGlobalStore = createStoreSlice<GlobalState, GlobalActions>(
  (set) => ({
    ...initialState,
    actions: {
      setUserInfo: setUserInfo(set),
      setMenuItems: setMenuItems(set),
    },
  }),
  {
    enablePersist: true,
    persistKey: StorageKeys.globalState,
  },
);
// Separate hooks for accessing the store state
export const useUserInfo = () => useGlobalStore((state) => state.userInfo);
export const useMenuItems = () => useGlobalStore((state) => state?.menuItems);

// Separate actions

export const useGlobalActions = () => useGlobalStore((state) => state.actions);
