import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { memo, useEffect } from "react";
import { useQuery } from "react-query";
import { addTrip, getDefaultTripView, HomeQueryKes } from "./apis";
const Home = () => {
  const { t } = useTranslation();
  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  };
  const { data: defaultViews } = useQuery([HomeQueryKes.GET_DEFAULT_TRIP_VIEW], getDefaultTripView);
  useQuery([HomeQueryKes.ADD_TRIP], addTrip, {
    onError: (error) => {
      console.error("Failed to add trip:", error);
    },
    retry: false,
  });

  return (
    <div className={styles.home}>
      <div className={styles.slog}>
        <span className={styles.title}>{t("home.title")}</span>
        <span className={styles.subTitle}>{t("home.subTitle")}</span>
      </div>
      <div className={styles.destinations}>
        <div className={styles.title}>{t("home.destinations")}</div>
        <ImageList variant="quilted" cols={4} rowHeight={121}>
          {defaultViews?.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
              <ImageListItemBar title={t(item?.title)} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default memo(Home);
