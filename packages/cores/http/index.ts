import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosRequestHeaders,
} from 'axios';

import getLocale from '../../utils/getLocale';
import storage from '../../utils/storage';

import { generateSign, getUTCTimestamp } from './encrypt';
import httpErrorHandler from './errorHandle';
import { type HttpResponseType, commonHeader } from './types';

import envConfig from '@/config';

const Http = axios.create({
  timeout: 20000,
  baseURL: envConfig?.http?.baseURL,
});
// Define Headers
const getHttpHeaders = (config: Record<string, any>) => {
  const timestamp = `${getUTCTimestamp()}`;
  return {
    Accept: 'application/json',
    'Access-Token': storage.get(commonHeader?.['access-token']),
    'X-timestamp': `${timestamp}`,
    'X-sign': generateSign({ config, timestamp }),
    Locale: getLocale(),
  };
};

// Success Request Interceptor
const interceptorsReq = (config: AxiosRequestHeaders) => {
  const updatedConfig = {
    ...config,
    headers: {
      ...(config?.headers ?? {}),
      ...getHttpHeaders(config),
    },
  };
  return updatedConfig;
};

// Request Interceptor
// @ts-ignore
Http.interceptors.request.use(interceptorsReq, (err) => {
  httpErrorHandler(err);
  return Promise.reject(err?.message);
});

// Response Interceptor
const interceptorsResSuccess = (response: AxiosResponse<HttpResponseType>) => {
  if (
    response?.data?.status >= 200 &&
    response?.data?.status < 400 &&
    response?.data?.isSuccess
  ) {
    return Promise.resolve(response?.data?.data);
  }
  httpErrorHandler(response?.data);
  return Promise.reject();
};
// @ts-ignore
Http.interceptors.response.use(interceptorsResSuccess, (error) => {
  httpErrorHandler(error?.response?.data);
  return Promise.reject(error);
});
const httpService = {
  async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return Http.get(url, { params, ...config });
  },
  delete<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return Http.delete(url, { params, ...config });
  },
  post<T>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return Http.post(url, data, { ...config });
  },
  put<T>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return Http.put(url, data, { ...config });
  },
};
export default httpService;
