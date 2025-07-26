import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Step1FormType } from './Step1/validation';
import { Step2FormType } from './Step2';

import ReducerNames from '@/constants/reducerNames';
import { useReduxSelector } from '@/hooks/reduxHooks';

interface TripState {
  tripStep: number;
  transportationOptions: { label: string; value: string | number }[];
  tripStep1Data: Step1FormType | {};
  tripStep2Data?: (Step2FormType & { tripImages: string[] }) | {};
  tripImages: string[];
}

const initialState: TripState = {
  tripStep: 1,
  transportationOptions: [
    { label: 'dasdsa', value: 23 },
    { label: 'da', value: 'dadsa' },
  ],
  tripStep1Data: {},
  tripStep2Data: {},
  tripImages: [],
};

const tripSlice = createSlice({
  name: ReducerNames.trip,
  initialState,
  reducers: {
    setStep: (state: TripState, action: PayloadAction<{ step: number }>) => {
      state.tripStep = action.payload.step;
    },
    setTripStep1Data: (
      state: TripState,
      action: PayloadAction<{ tripStep1Data: Step1FormType }>,
    ) => {
      state.tripStep1Data = action.payload.tripStep1Data;
    },
    setTripStep2Data: (
      state: TripState,
      action: PayloadAction<{
        tripStep2Data: Step2FormType;
      }>,
    ) => {
      state.tripStep2Data = action.payload.tripStep2Data;
    },
    setTripImageIDs: (
      state: TripState,
      action: PayloadAction<{ tripImages: string[] }>,
    ) => {
      state.tripImages = action.payload.tripImages;
    },
  },
});

export const { setStep, setTripStep1Data, setTripStep2Data, setTripImageIDs } =
  tripSlice.actions;

export const useTripState = () => {
  return useReduxSelector((state) => state.trip ?? {});
};
export default tripSlice.reducer;
