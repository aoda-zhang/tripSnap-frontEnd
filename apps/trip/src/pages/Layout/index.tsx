import { type FC, memo } from "react";
import { Outlet, useMatches, useNavigate } from "react-router-dom";

import storageTool from "@/shared/utils/storage";
import globalStore from "@/store/globalStore";
import StorageKeys from "@/typings/storage.types";
import classNames from "classnames";

import TripStore from "@/pages/Trip/store";
import { RouterHandles } from "@/routes";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import AvatarMenu from "../../shared/components/AvatarMenu";
import styles from "./index.module.scss";
import "./index.css";
import LangSwitcher from "@/shared/components/LangSwitcher";

const Layout: FC = () => {
  const { userInfo } = globalStore();
  const matches = useMatches();
  const currentRouter = matches?.[matches?.length - 1];
  const isMenuAvaliable = currentRouter?.handle?.[RouterHandles.isMenuAvaliable] ?? true;
  const isLogin = storageTool.get(StorageKeys.accessToken);
  const isNoToken = currentRouter?.handle?.[RouterHandles.noToken] ?? false;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setStep = TripStore(state => state.setStep);

  const Header = () => (
    <>
      {isMenuAvaliable && (
        <header className={styles.header}>
          <>
            <button
              // className="text-[1.25rem] font-bold cursor-pointer"
              className={classNames([styles.brand])}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("common.brand")}
            </button>
            <div className={styles.right}>
              <button
                className={styles.item}
                onClick={() => {
                  setStep(1);
                  navigate("/trip/step1");
                }}
              >
                {t("common.record")}
              </button>
              <span className={styles.item}>{t("common.history")}</span>
              {!isLogin && (
                <button
                  className={classNames([styles.item, styles.login])}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {t("common.login")}
                </button>
              )}

              {isLogin && <AvatarMenu userInfo={userInfo} />}
              <LangSwitcher />
            </div>
          </>
        </header>
      )}
    </>
  );
  const Content = () => {
    // if (!(isNoToken && isLogin)) {
    //   return <Navigate to="/login" replace />;
    // }
    return (
      <>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
        <Footer />
      </>
    );
  };
  const Footer = () => (
    <div className={styles.footer}>
      {t("common.brand")} ©{dayjs().year()}
    </div>
  );
  return (
    <div className={styles.layout}>
      {/* <div className="tripLayout"> */}
      <Content />
    </div>
  );
};
export default memo(Layout);
