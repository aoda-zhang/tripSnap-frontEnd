import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import envConfig from '@/config';

dayjs.extend(utc);
export type SignParams = {
  config: Record<string, any>;
  timestamp: string;
};
export const getUTCTimestamp = () => {
  return Math.floor(dayjs.utc().valueOf() / 1000);
};
const formatUrl = (url: string) => {
  return url
    .replace(envConfig?.http?.apiPrefix, '')
    .replace(/\//g, '')
    ?.toLowerCase();
};
export const generateSign = ({ config, timestamp }: SignParams): string => {
  const { data, url = '', method = '' } = config;
  const bodyString = data ? JSON.stringify(data) : '';
  return CryptoJS.HmacSHA256(
    `${formatUrl(url)}>${bodyString}+${method?.toUpperCase()}|${timestamp}`,
    envConfig?.http?.auth?.privateKey,
  ).toString(CryptoJS.enc.Hex);
};
