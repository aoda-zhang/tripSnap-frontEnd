import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ActionBuilder<S, A> = (
  set: (
    partial: Partial<S & A> | ((state: S & A) => Partial<S & A>),
    replace?: boolean,
  ) => void,
  get: () => S & A,
) => A;

type CreateStoreOptions<S, A> = {
  name: string;
  state: S;
  actions: ActionBuilder<S, A>;
  enablePersist?: boolean;
  useSessionStorage?: boolean;
};

const createStoreSlice = <S, A>({
  name,
  state,
  actions,
  enablePersist = false,
  useSessionStorage = true,
}: CreateStoreOptions<S, A>) => {
  // Create a base store with immer for immutability
  const base = immer<S & A>((set, get) => ({
    ...state,
    ...actions(set, get),
  }));

  const storage = createJSONStorage(() => {
    try {
      return useSessionStorage ? sessionStorage : localStorage;
    } catch {
      return undefined;
    }
  });

  let storeCreator = base;

  if (process.env.NODE_ENV !== 'production') {
    // Enable devtools only in development mode
    storeCreator = devtools(storeCreator, { name });
  }

  if (enablePersist) {
    // Enable persistence if specified
    storeCreator = persist(storeCreator, {
      name,
      storage,
    });
  }

  return create<S & A>()(storeCreator);
};

export default createStoreSlice;
