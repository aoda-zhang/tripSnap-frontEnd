import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TripBasic } from './Basic/validation';
import { TripDeatil } from './Detail';

import { useReduxSelector } from '@/hooks/reduxHooks';
import reducerNames from '@/store/reducerNames';

interface TripState {
  tripStep: number;
  transportationOptions: { label: string; value: string | number }[];
  tripInfo: {
    tripBasic: TripBasic | {};
    tripDetail?: (TripDeatil & { tripImages: string[] }) | {};
  };

  tripImages: string[];
}

const initialState: TripState = {
  tripStep: 1,
  transportationOptions: [
    { label: 'dasdsa', value: 23 },
    { label: 'da', value: 'dadsa' },
  ],
  tripInfo: {
    tripBasic: {},
    tripDetail: {},
  },
  tripImages: [],
};

const tripReducer = createSlice({
  name: reducerNames.trip,
  initialState,
  reducers: {
    setStep: (state: TripState, action: PayloadAction<{ step: number }>) => {
      state.tripStep = action.payload.step;
    },
    setTripBasic: (state: TripState, action: PayloadAction<TripBasic>) => {
      if (!state.tripInfo) {
        state.tripInfo = { tripBasic: {}, tripDetail: {} };
      }
      state.tripInfo.tripBasic = action.payload;
    },
    setTripDetail: (state: TripState, action: PayloadAction<TripDeatil>) => {
      state.tripInfo.tripDetail = action.payload;
    },
    setTripImageIDs: (
      state: TripState,
      action: PayloadAction<{ tripImages: string[] }>,
    ) => {
      state.tripImages = action.payload.tripImages;
    },
  },
});

export const { setStep, setTripBasic, setTripDetail, setTripImageIDs } =
  tripReducer.actions;

export const useTripState = (): TripState => {
  return useReduxSelector((state) => state?.trip ?? initialState);
};
export default tripReducer.reducer;
