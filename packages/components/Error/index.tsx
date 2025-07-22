// import systemError from '@assets/images/system_error.png';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import StorageKeys from '../../constants/storageKeys';
import storageTool from '../../utils/storage';

import styles from './index.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    storageTool.clearAll();
  }, []);
  const loginAgain = () => {
    storageTool.remove(StorageKeys.accessToken);
    storageTool.remove(StorageKeys.refreshToken);
    navigate('/login');
  };
  return (
    <div className={styles.error}>
      {/* <img src={systemError} alt="" /> */}
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
