import { createSlice } from '@reduxjs/toolkit';

import { useReduxSelector } from '../hooks/reduxHooks';

import reducerNames from './reducerNames';
import { ReduxState } from './reduxStore';

import type { UserInfoType } from '@/typings/auth.types';

interface GlobalState {
  userInfo: UserInfoType;
  menuItems: any[];
}
const initialState: GlobalState = {
  userInfo: {
    userName: '',
  },
  menuItems: [],
};

const globalReducer = createSlice({
  name: reducerNames.global,
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
export default globalReducer.reducer;

export const { setMenuItems, setUserInfo } = globalReducer.actions;
export const useGlobalState = () => {
  return useReduxSelector((state: ReduxState) => state?.global ?? {});
};
