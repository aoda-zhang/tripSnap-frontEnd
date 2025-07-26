import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { ReduxState, AppDispatch } from '@/app/reduxStore';

export const useReduxDispatch = () => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
