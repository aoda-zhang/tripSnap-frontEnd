import type { UserInfoType } from '@/typings/auth.types';
import StorageKeys from '@/typings/storage.types';
import type {} from '@/typings/trip.types';
import createStoreSlice from '@/utils/createStoreSlice';

type GlobalState = {
  userInfo: UserInfoType;
  menuItems: any[];
};
type GlobalActions = {
  setUserInfo: (userInfo: UserInfoType) => void;
  setMenuItems: (menuItems: any[]) => void;
};
const initialState: GlobalState = {
  userInfo: {
    userName: '',
  },
  menuItems: [],
};
const useGlobalStore = createStoreSlice<GlobalState, GlobalActions>({
  name: StorageKeys.globalState,
  state: initialState,
  enablePersist: true,
  // useSessionStorage: true,
  actions: (set) => ({
    setUserInfo: (userInfo: UserInfoType) => set(() => ({ userInfo })),
    setMenuItems: (menuItems: any[]) => set(() => ({ menuItems })),
  }),
});
export default useGlobalStore;
