import type { UserInfoType } from '@/typings/auth.types';
import StorageKeys from '@/typings/storage.types';
import type {} from '@/typings/trip.types';
import createStoreSlice from '@/utils/createStore';

type GlobalState = {
  userInfo: UserInfoType;
  menuItems: any[];
};
type GlobalActions = {
  setUserInfo: (userInfo: UserInfoType) => void;
};
const initialState: GlobalState = {
  userInfo: {
    userName: '',
  },
  menuItems: [
    {
      label: 'common.brand',
      isAvailableOnMobile: true,
      to: '/',
      classNames: ['brand'],
      type: 'link',
    },
    {
      label: 'common.record',
      to: '/trip/step1',
      classNames: ['item'],
      type: 'link',
    },
    {
      label: 'common.history',
      to: '/trip/history',
      classNames: ['item'],
      type: 'link',
    },
    {
      label: 'common.login',
      to: '/login',
      classNames: ['item', 'login'],
      type: 'link',
    },
    {
      label: 'common.language',
      component: 'LangSwitcher',
      type: 'component',
    },
    {
      label: 'common.mobileMenu',
      isOnlyMobile: true,
      component: 'AlignJustify',
      action: 'openSidebarMenu',
      props: {
        size: 30,
      },
      type: 'component',
    },
  ],
};
const useGlobalStore = createStoreSlice<GlobalState, GlobalActions>({
  name: StorageKeys.globalState,
  state: initialState,
  actions: (set) => ({
    setUserInfo: (userInfo: UserInfoType) => set(() => ({ userInfo })),
  }),
});
export default useGlobalStore;
