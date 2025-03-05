import "normalize.css";
import "@/shared/assets/styles/default.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";

import RouterOptions from "./router";
import globalStore from "./store/globalStore";

const App = () => {
  const { i18n } = useTranslation();
  const locale = globalStore((state) => state?.locale);
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);
  return <RouterProvider router={RouterOptions} />;
};

export default App;
