import "normalize.css";
import "@/shared/assets/styles/default.css";
import "@/shared/assets/styles/global.css";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import globalStore from "./store/globalStore";
import routes from "./routes";

const App = () => {
  const { i18n } = useTranslation();
  const locale = globalStore(state => state?.locale);
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return (
    // You can define a custom fallback UI here
    <Suspense fallback={<>Loading...</>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
