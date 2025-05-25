import _ from 'lodash';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import envConfig from '@/config';
import getLocale from '@/shared/utils/getLocale';
import createSRTime from '@/shared/utils/SRTime';
import type { UserInfoType } from '@/typings/auth.types';
import type { DestinationItem } from '@/typings/destination.types';
import StorageKeys from '@/typings/storage.types';
import type {
  MapProcessStatusItem,
  TripFormType,
  TripProcessStatus,
} from '@/typings/trip.types';

type GlobalState = {
  destinations: DestinationItem[];
  tripStatus: TripProcessStatus;
  userInfo: UserInfoType;
  latestTrip: TripFormType;
};
type GlobalActions = {
  setDestination: (data: DestinationItem[]) => void;
  setTripStatus: (mapStatusItem: MapProcessStatusItem) => void;
  setUserInfo: (userInfo: UserInfoType) => void;
  setLatestTrip: (trip: TripFormType) => void;
  setDefaultTrip: () => void;
};
export type GlobalStoreSlice = GlobalState & GlobalActions;
const defaultTrip = {
  mapInfo: [
    {
      from: `${envConfig?.map?.homeStart[getLocale()]}`,
      startTime: createSRTime(),
      to: '',
      allMileage: 0, // Updated to a valid number
      spendTime: null,
    },
  ],
};
const initialState: GlobalState = {
  tripStatus: {
    isFillMapDate: true,
    isEdit: false,
    isView: false,
    isInfoOpen: false,
  },
  latestTrip: defaultTrip,
  destinations: [],
  userInfo: {
    userName: '',
  },
};
const globalStorePersist = persist<GlobalStoreSlice>(
  (set) => ({
    ...initialState,
    setDestination: (data = []) =>
      set((state) => ({
        destinations: _.uniqBy(
          [...(state?.destinations ?? []), ...data],
          'value',
        ),
      })),
    setTripStatus: (mapStatusItem: MapProcessStatusItem) =>
      set((state) => ({
        tripStatus: { ...state.tripStatus, ...mapStatusItem },
      })),
    setUserInfo: (userInfo: UserInfoType) => set(() => ({ userInfo })),
    setLatestTrip: (latestTrip: TripFormType) => set(() => ({ latestTrip })),
    setDefaultTrip: () => set(() => ({ latestTrip: defaultTrip })),
  }),
  {
    name: StorageKeys.globalState,
    storage: createJSONStorage(() => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        return window.sessionStorage;
      }
      return undefined;
    }),
  },
);

const globalStore = create<GlobalStoreSlice>()(globalStorePersist);
export default globalStore;
