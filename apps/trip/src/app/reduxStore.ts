import { configureStore } from '@reduxjs/toolkit';

// Constant key names used for dynamically registering reducers
import ReducerNames from '@/constants/ReducerNames';
import tripReducer from '@/features/Trip/tripSlice';

// Create the Redux store and register the trip slice under a dynamic key
export const store = configureStore({
  reducer: {
    [ReducerNames.trip]: tripReducer,
  },
});

// Extract the RootState and AppDispatch types for use throughout the app
// ReduxState represents the entire Redux state tree; use this type for typing selectors and state in components
export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
