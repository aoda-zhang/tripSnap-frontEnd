import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import * as HomeAPI from './api';
import styles from './index.module.scss';

const Home = () => {
  const { t } = useTranslation();
  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  };
  const { data: defaultViews } = useQuery(
    [HomeAPI.HomeQueryKes.GET_DEFAULT_TRIP_VIEW],
    HomeAPI.getDefaultTripView,
  );

  return (
    <div className={styles.home}>
      <div className={styles.slog}>
        <span className={styles.title}>{t('home.title')}</span>
        <span className={styles.subTitle}>{t('home.subTitle')}</span>
      </div>
      <div className={styles.destinations}>
        <div className={styles.title}>{t('home.destinations')}</div>
        {defaultViews && (
          <ImageList variant="quilted" cols={4} rowHeight={121}>
            {defaultViews.map((item) => (
              <ImageListItem
                key={item?.title}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  src={srcset(item.img, 121, item.rows, item.cols).src}
                  srcSet={srcset(item.img, 121, item.rows, item.cols).srcSet}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar title={t(item?.title)} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </div>
    </div>
  );
};

export default memo(Home);
