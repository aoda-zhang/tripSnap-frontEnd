import StorageKeys from '@/typings/storage.types';
import createStore from '@/utils/createStore';

type TripState = {
  tripStep: number;
  transportationOptions: { label: string; value: string | number }[];
};
type TripAction = {
  setStep: (step: number) => void;
};

const initState: TripState = {
  tripStep: 1,
  transportationOptions: [
    { label: 'dasdsa', value: 23 },
    { label: 'da', value: 'dadsa' },
  ],
};
export const setStepAction =
  (set: any): TripAction['setStep'] =>
  (step) => {
    set(() => ({ tripStep: step }));
  };

const useTripStore = createStore<TripState, TripAction>({
  name: StorageKeys.tripRecord,
  enablePersist: true,
  state: initState,
  actions: () => ({
    setStep: setStepAction,
  }),
});

export default useTripStore;
