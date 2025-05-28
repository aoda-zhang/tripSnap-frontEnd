import storage from '@shared/utils/storage';
import { useMutation } from 'react-query';
import { NavigateFunction } from 'react-router-dom';

import * as AuthAPI from './apis';

import StorageKeys from '@/typings/storage.types';

export const useUserRegister = (navigate: NavigateFunction) => {
  return useMutation(AuthAPI.register, {
    onSuccess: async (isRegrester, value) => {
      if (isRegrester) {
        const loginInfo = await AuthAPI.login({
          userName: value?.userName,
          password: value?.password,
        });
        await storage.set(StorageKeys.accessToken, loginInfo.accessToken);
        await storage.set(StorageKeys.refreshToken, loginInfo.refreshToken);
        navigate('/trip');
      }
    },
  });
};

export const useUserLogin = (navigate: NavigateFunction) => {
  return useMutation(AuthAPI.register, {
    onSuccess: async (isRegrester, value) => {
      if (isRegrester) {
        const loginInfo = await AuthAPI.login({
          userName: value?.userName,
          password: value?.password,
        });
        await storage.set(StorageKeys.accessToken, loginInfo.accessToken);
        await storage.set(StorageKeys.refreshToken, loginInfo.refreshToken);
        navigate('/trip');
      }
    },
  });
};
