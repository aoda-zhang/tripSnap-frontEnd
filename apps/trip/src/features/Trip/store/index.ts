import StorageKeys from '@/typings/storage.types';
import createStore, { SetFn } from '@/utils/createStoreSlice';

interface TripState {
  tripStep: number;
  transportationOptions: { label: string; value: string | number }[];
  tripStep1Data?: Record<string, any>;
  tripStep2Data?: Record<string, any>;
}
interface TripAction {
  actions: {
    setStep: (step: number) => void;
    setTripStep1Data: (data: Record<string, any>) => void;
    setTripStep2Data: (data: Record<string, any>) => void;
  };
}

const initState: TripState = {
  tripStep: 1,
  transportationOptions: [
    { label: 'dasdsa', value: 23 },
    { label: 'da', value: 'dadsa' },
  ],
  tripStep1Data: {},
  tripStep2Data: {},
};
export const setStep = (set: SetFn<TripState>) => (step: number) => {
  set(() => ({ tripStep: step }));
};
// seperate function for complex logic
const setTripStep2Data =
  (set: SetFn<TripState>) => (tripStep2Data: Record<string, any>) => {
    set(() => ({ tripStep2Data }));
  };
const useTripStore = createStore<TripState, TripAction>(
  (set) => ({
    ...initState,
    actions: {
      setStep: setStep(set),
      setTripStep1Data: (tripStep1Data) => {
        // Use immer to update the state immutably
        set((state: TripState) => {
          state.tripStep1Data = tripStep1Data;
        });
      },
      setTripStep2Data: setTripStep2Data(set),
    },
  }),
  {
    enablePersist: true,
    persistKey: StorageKeys.tripRecord,
  },
);

export const useTripStep = () => useTripStore((state) => state.tripStep);

// Actions
export const useTripActions = () => useTripStore((state) => state.actions);

export const useTripStep1Data = () =>
  useTripStore((state) => state.tripStep1Data);

export const useTripStep2Data = () =>
  useTripStore((state) => state.tripStep2Data);
