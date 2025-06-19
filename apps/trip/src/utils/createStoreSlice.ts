import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CreateStoreOptions<State = Record<string, any>> {
  enablePersist?: boolean;
  persistKey?: string;
  partializeFields?: (keyof State)[];
  version?: number;
}

export type SetFn<T> = (fn: (state: T) => void) => void;

const pickPersistFields = <T extends unknown>(state: T, keys: (keyof T)[]) => {
  return keys.reduce((acc, key) => {
    acc[key] = state[key];
    return acc;
  }, {} as Partial<T>);
};

const partialize = <State>(state: State, options: CreateStoreOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { actions, ...rest } = state as State & {
    actions?: Record<string, any>;
  };
  if ((options?.partializeFields ?? []).length > 0) {
    return pickPersistFields<State>(
      state,
      (options.partializeFields ?? []) as (keyof State)[],
    );
  }
  return rest;
};

const createStoreSlice = <State, Actions>(
  initializer: (
    set: (...args: any) => void,
    get: () => State & Actions,
  ) => State & Actions,
  options: CreateStoreOptions = {},
) => {
  let storeCreator = subscribeWithSelector(immer(initializer)) as any;

  // Devtool for develop
  if (process.env.NODE_ENV !== 'production') {
    storeCreator = devtools(storeCreator) as any;
  }

  // Persist settings
  if (options.enablePersist && options.persistKey) {
    storeCreator = persist(storeCreator, {
      name: options.persistKey,
      version: options.version ?? 1,
      partialize: (state) => partialize(state, options),
    });
  }

  const useStore = create<State & Actions>()(storeCreator);
  return useStore;
};

export default createStoreSlice;
