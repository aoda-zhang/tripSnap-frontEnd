import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';

import errorImg from '@/shared/assets/images/500.png';
import storage from '@/shared/utils/storage';
import storageTool from '@/shared/utils/storage';
import StorageKeys from '@/typings/storage.types';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    storageTool.clearAll();
  }, []);
  const loginAgain = () => {
    storage.remove(StorageKeys.accessToken);
    storage.remove(StorageKeys.refreshToken);
    navigate('/login');
  };
  return (
    <div className={styles.error}>
      <img src={errorImg} alt="" />
      <div>
        {t('map.sys_error')}
        <span
          className={styles.login}
          role="button"
          tabIndex={0}
          onClick={loginAgain}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              loginAgain();
            }
          }}
        >
          {t('map.login_again')}
        </span>
        !!
      </div>
    </div>
  );
};
export default memo(ErrorPage);
