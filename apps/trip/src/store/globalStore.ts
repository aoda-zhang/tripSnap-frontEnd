import type { UserInfoType } from '@/typings/auth.types';
import StorageKeys from '@/typings/storage.types';
import type {} from '@/typings/trip.types';
import createStoreSlice from '@/utils/createStore';

type GlobalState = {
  userInfo: UserInfoType;
};
type GlobalActions = {
  setUserInfo: (userInfo: UserInfoType) => void;
};
const initialState: GlobalState = {
  userInfo: {
    userName: '',
  },
};
const useGlobalStore = createStoreSlice<GlobalState, GlobalActions>({
  name: StorageKeys.globalState,
  state: initialState,
  actions: (set) => ({
    setUserInfo: (userInfo: UserInfoType) => set(() => ({ userInfo })),
  }),
});
export default useGlobalStore;
