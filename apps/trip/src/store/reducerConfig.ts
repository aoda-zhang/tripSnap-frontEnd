// All reducers should be registered here for centralized management and scalability
import storage from 'redux-persist/lib/storage';

import globalReducer from './globalReducer';
import reducerNames from './reducerNames';

import tripReducer from '@/features/Trip/tripReducer';

export const combinedReducers = {
  [reducerNames.trip]: tripReducer,
  [reducerNames.global]: globalReducer,
};

// List of reducers to be persisted
// NOTE: Do NOT persist the root reducer, as it would persist the entire state tree, causing redundancy and potential compatibility issues
const persistReducers = [reducerNames.global, reducerNames.trip];

// redux-persist configuration object
// storage: Specifies the storage engine (here, localStorage)
// whitelist: Only reducers in this list will be persisted, improving security and flexibility
export const persistConfig = {
  key: reducerNames.root,
  storage,
  whitelist: persistReducers,
};
