import { type FC, memo } from "react";
import { Navigate, Outlet, useMatches, useNavigate } from "react-router-dom";

import storageTool from "@/shared/utils/storage";
import globalStore from "@/store/globalStore";
import StorageKeys from "@/typings/storage.types";
import classNames from "classnames";

import TripStore from "@/pages/Trip/store";
import { RouterHandles } from "@/router";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import AvatarMenu from "../AvatarMenu";
import styles from "./index.module.scss";

const Layout: FC = () => {
  const { userInfo } = globalStore();
  const matches = useMatches();
  const currentRouter = matches?.[matches?.length - 1];
  const isMenuAvaliable = currentRouter?.handle?.[RouterHandles.isMenuAvaliable] ?? true;
  const isLogin = storageTool.get(StorageKeys.accessToken);
  const isNoToken = currentRouter?.handle?.[RouterHandles.noToken] ?? false;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setStep = TripStore((state) => state.setStep);

  if (!isNoToken && !isLogin) {
    return <Navigate to="/login" replace />;
  }

  const Header = () => (
    <>
      {isMenuAvaliable && (
        <header className={styles.header}>
          <>
            <span
              className={classNames([styles.brand])}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("common.brand")}
            </span>
            <div className={styles.right}>
              <span
                className={styles.item}
                onClick={() => {
                  setStep(1);
                  navigate("/trip/step1");
                }}
              >
                {t("common.record")}
              </span>
              <span className={styles.item}>{t("common.history")}</span>
              {!isLogin && (
                <span
                  className={classNames([styles.item, styles.login])}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {t("common.login")}
                </span>
              )}

              {isLogin && <AvatarMenu userInfo={userInfo} />}
            </div>
          </>
        </header>
      )}
    </>
  );
  const Footer = () => (
    <div className={styles.footer}>
      {t("common.brand")} ©{dayjs().year()}
    </div>
  );
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default memo(Layout);
