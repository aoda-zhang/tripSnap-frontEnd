import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

import ReducerNames from '@/constants/reducerNames';
import tripReducer from '@/features/Trip/tripReducer';

// Register the reducers here
const rootReducer = combineReducers({
  [ReducerNames.trip]: tripReducer,
});

const persistConfig = {
  key: ReducerNames.root,
  storage,
  whitelist: [ReducerNames.trip], // Only persist `trip` slice
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

// Extract the RootState and AppDispatch types for use throughout the app
// ReduxState represents the entire Redux state tree; use this type for typing selectors and state in components
export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
