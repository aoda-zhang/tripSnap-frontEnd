import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { ReduxState, AppDispatch } from '@/store/reduxStore';

export const useReduxDispatch = () => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
