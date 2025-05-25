import httpService from '@/shared/cores/http';
import { AuthFieldType, LoginInfo } from '@/typings/auth.types';

export const register = (userInfo: AuthFieldType) => {
  return httpService.post('/auth/register', userInfo);
};

export const login = (userInfo: Omit<AuthFieldType, 'phoneNumber'>) => {
  return httpService.post<LoginInfo>('/auth/v1/login', userInfo);
};

export const refreshToken = (token: { refreshToken: string }) => {
  return httpService.post<LoginInfo>('/auth/v1/refresh', token);
};
