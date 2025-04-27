import _ from "lodash";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import envConfig from "@/config";
import type LocaleKeys from "@/shared/constants/localeKey";
import createSRTime from "@/shared/utils/SRTime";
import getLocale from "@/shared/utils/getLocale";
import type { UserInfoType } from "@/typings/auth.types";
import type { DestinationItem } from "@/typings/destination.types";
import StorageKeys from "@/typings/storage.types";
import type { MapProcessStatusItem, TripFormType, TripProcessStatus } from "@/typings/trip.types";
type GlobalStage = {
  destinations: DestinationItem[];
  tripStatus: TripProcessStatus;
  locale: LocaleKeys;
  userInfo: UserInfoType;
  latestTrip: TripFormType;
};
type GlobalAction = {
  setDestination: (data: DestinationItem[]) => void;
  setTripStatus: (mapStatusItem: MapProcessStatusItem) => void;
  setUserInfo: (userInfo: UserInfoType) => void;
  setLocale: (locale: LocaleKeys) => void;
  setLatestTrip: (trip: TripFormType) => void;
  setDefaultTrip: () => void;
};
const defaultTrip = {
  mapInfo: [
    {
      from: `${envConfig?.map?.homeStart[getLocale()]}`,
      startTime: createSRTime(),
      to: "",
      allMileage: null,
      spendTime: null,
    },
  ],
};
const initialState: GlobalStage = {
  tripStatus: {
    isFillMapDate: true,
    isEdit: false,
    isView: false,
    isInfoOpen: false,
  },
  locale: getLocale(),
  latestTrip: defaultTrip,
  destinations: [],
  userInfo: {
    userName: "",
  },
};
const globalStorePersist = persist<GlobalStage & GlobalAction>(
  (set) => ({
    ...initialState,
    setDestination: (data = []) =>
      set((state) => ({
        destinations: _.uniqBy([...(state?.destinations ?? []), ...data], "value"),
      })),
    setTripStatus: (mapStatusItem: MapProcessStatusItem) =>
      set((state) => ({ tripStatus: { ...state.tripStatus, ...mapStatusItem } })),
    setUserInfo: (userInfo: UserInfoType) => set(() => ({ userInfo })),
    setLatestTrip: (latestTrip: TripFormType) => set(() => ({ latestTrip })),
    setDefaultTrip: () => set(() => ({ latestTrip: defaultTrip })),
    setLocale: (locale: LocaleKeys) => set(() => ({ locale })),
  }),
  {
    name: StorageKeys.globalState,
    storage: createJSONStorage(() => sessionStorage),
  },
);

const globalStore = create<GlobalStage & GlobalAction>()(globalStorePersist);
export default globalStore;
