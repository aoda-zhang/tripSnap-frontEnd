import LocaleKeys from "../constants/localeKey";

const getLocale = (): LocaleKeys => {
  return LocaleKeys?.[navigator?.language?.replace(/-/g, "_")] ?? LocaleKeys.en_US;
};
export default getLocale;
