import envConfig from "@/config";
import LocaleKeys from "@/shared/constants/localeKey";
import storage from "@/shared/utils/storage";
import globalStore from "@/store/globalStore";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from "axios";
import { generateHMAC, getUTCTimestamp } from "./encrypt";
import httpErrorHandler from "./errorHandle";
import { HttpResponseType, commonHeader } from "./types";
const Http = axios.create({
  timeout: 20000,
  baseURL: envConfig?.http?.baseURL,
});
// 自定义请求头 函数式调用可及时更新local获取的参数
const getHttpHeaders = (config: Record<string, any>) => {
  const timestamp = `${getUTCTimestamp()}`;
  return {
    Accept: "application/json",
    "Access-Token": storage.get(commonHeader?.["access-token"]),
    "X-timestamp": `${timestamp}`,
    "X-Api-Key": generateHMAC({ config, timestamp }),
    Locale: globalStore?.getState()?.locale ?? LocaleKeys.zh_CN,
  };
};

// 成功请求config处理
const interceptorsReq = (config: AxiosRequestHeaders) => {
  // @ts-ignore
  config.headers = {
    ...(config?.headers ?? {}),
    ...getHttpHeaders(config),
  };
  return config;
};

// 请求拦截处理
// @ts-ignore
Http.interceptors.request.use(interceptorsReq, (err) => {
  httpErrorHandler(err);
  return Promise.reject(err?.message);
});

// 成功响应拦截处理
const interceptorsResSuccess = (response: AxiosResponse<HttpResponseType>) => {
  if (response?.data?.status >= 200 && response?.data?.status < 400 && response?.data?.isSuccess) {
    return Promise.resolve(response?.data?.data);
  } else {
    httpErrorHandler(response?.data);
    return Promise.reject();
  }
};
// 响应拦截处理
// @ts-ignore
Http.interceptors.response.use(interceptorsResSuccess, (error) => {
  httpErrorHandler(error?.response?.data);
  return Promise.reject(error);
});
const httpService = {
  async getAPI<T extends unknown>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.get<T>(url, { params, ...config });
  },
  deleteAPI<T extends unknown>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.delete<T>(url, { params, ...config });
  },
  postAPI<T extends unknown>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.post<T>(url, data, { ...config });
  },
  putAPI<T extends unknown>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    // @ts-ignore
    return Http.put<T>(url, data, { ...config });
  },
};
export default httpService;
