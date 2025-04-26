import envConfig from "@/config";
import LocaleKeys from "@/shared/constants/localeKey";
import storage from "@/shared/utils/storage";
import globalStore from "@/store/globalStore";
import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosRequestHeaders } from "axios";
import { generateSign, getUTCTimestamp } from "./encrypt";
import httpErrorHandler from "./errorHandle";
import { type HttpResponseType, commonHeader } from "./types";
const Http = axios.create({
  timeout: 20000,
  baseURL: envConfig?.http?.baseURL,
});
// Define Headers
const getHttpHeaders = (config: Record<string, any>) => {
  const timestamp = `${getUTCTimestamp()}`;
  return {
    Accept: "application/json",
    "Access-Token": storage.get(commonHeader?.["access-token"]),
    "X-timestamp": `${timestamp}`,
    "X-sign": generateSign({ config, timestamp }),
    Locale: globalStore?.getState()?.locale ?? LocaleKeys.zh_CN,
  };
};

// Success Request Interceptor
const interceptorsReq = (config: AxiosRequestHeaders) => {
  // @ts-ignore
  config.headers = {
    ...(config?.headers ?? {}),
    ...getHttpHeaders(config),
  };
  return config;
};

// Error Response Interceptor
// @ts-ignore
Http.interceptors.request.use(interceptorsReq, (err) => {
  httpErrorHandler(err);
  return Promise.reject(err?.message);
});

// Success Response Interceptor
const interceptorsResSuccess = (response: AxiosResponse<HttpResponseType>) => {
  if (response?.data?.status >= 200 && response?.data?.status < 400 && response?.data?.isSuccess) {
    return Promise.resolve(response?.data?.data);
  }
  httpErrorHandler(response?.data);
  return Promise.reject();
};
// 响应拦截处理
// @ts-ignore
Http.interceptors.response.use(interceptorsResSuccess, (error) => {
  httpErrorHandler(error?.response?.data);
  return Promise.reject(error);
});
const httpService = {
  async get<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.get<T>(url, { params, ...config });
  },
  delete<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.delete<T>(url, { params, ...config });
  },
  post<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.post<T>(url, data, { ...config });
  },
  put<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.put<T>(url, data, { ...config });
  },
};
export default httpService;
