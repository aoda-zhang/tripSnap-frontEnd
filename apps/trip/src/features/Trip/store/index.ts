import StorageKeys from '@/typings/storage.types';
import createStore, { SetFn } from '@/utils/createStoreSlice';

interface TripState {
  tripStep: number;
  transportationOptions: { label: string; value: string | number }[];
}
interface TripAction {
  actions: {
    setStep: (step: number) => void;
  };
}

const initState: TripState = {
  tripStep: 1,
  transportationOptions: [
    { label: 'dasdsa', value: 23 },
    { label: 'da', value: 'dadsa' },
  ],
};
export const setStep = (set: SetFn<TripState>) => (step: number) => {
  set(() => ({ tripStep: step }));
};
const useTripStore = createStore<TripState, TripAction>(
  (set) => ({
    ...initState,
    actions: {
      setStep: setStep(set),
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
