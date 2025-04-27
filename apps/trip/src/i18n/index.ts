import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_US from "./en_US.json";
import zh_CN from "./zh_CN.json";

i18n.use(initReactI18next).init({
  resources: {
    en_US: { ...en_US },
    zh_CN: { ...zh_CN },
  },
  lng: "zh_CN",
  fallbackLng: "zh_CN",

  interpolation: {
    escapeValue: false,
  },
});
