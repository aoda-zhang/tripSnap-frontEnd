import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import envConfig, { EnvVariables } from '@/config';

type ActionBuilder<State, Actions> = (
  set: (
    partial:
      | Partial<State & Actions>
      | ((state: State & Actions) => Partial<State & Actions>),
    replace?: boolean,
  ) => void,
  get: () => State & Actions,
) => Actions;

type CreateStoreOptions<State, Actions> = {
  name: string;
  state: State;
  actions: ActionBuilder<State, Actions>;
  enablePersist?: boolean;
  useSessionStorage?: boolean;
  partialize?: (state: State & Actions) => Partial<State>;
};

const createStoreSlice = <State, Actions>({
  name,
  state,
  actions,
  enablePersist = false,
  useSessionStorage = true,
  // partialize,
}: CreateStoreOptions<State, Actions>) => {
  const base = immer<State & Actions>((set, get) => ({
    ...state,
    ...actions(set, get),
  }));

  const storage = createJSONStorage(() => {
    return useSessionStorage ? sessionStorage : localStorage;
  });

  let storeCreator = base;

  if (envConfig?.env !== EnvVariables.prod) {
    storeCreator = devtools(storeCreator, { name });
  }

  if (enablePersist) {
    storeCreator = persist(storeCreator, {
      name,
      storage,
      // partialize,
    });
  }

  return create<State & Actions>()(storeCreator);
};

export default createStoreSlice;
