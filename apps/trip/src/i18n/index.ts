import LocaleKeys from '@shared/constants/localeKey';
import getLocale from '@shared/utils/getLocale';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
  resources: languageResources,
  lng: currentLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
