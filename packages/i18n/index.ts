import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LocaleKeys from '../constants/localeKey';
import getLocale from '../utils/getLocale';

import enUS from './en-US.json';
import zhCN from './zh-CN.json';

const defaultLanguage = LocaleKeys['en-US'];
const languageResources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
};
const currentLanguage = getLocale(
  defaultLanguage,
  Object.keys(languageResources),
);

i18n.use(initReactI18next).init({
  resources: languageResources as { [key: string]: { translation: any } },
  lng: currentLanguage as string,
  fallbackLng: defaultLanguage as string,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
