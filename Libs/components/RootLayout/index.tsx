import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useMatches } from 'react-router-dom';

import StorageKeys from '../../constants/storageKeys';
import storageTool from '../../utils/storage';

import styles from './index.module.css';
import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutHeader from './RootLayoutHeader';

export const RootLayoutHandles = {
  isMenuAvailable: 'isMenuAvailable',
  noToken: 'noToken',
};

export interface LayoutProps {
  userInfo: {
    [key: string]: any;
  };
}

const RootLayout = ({ userInfo }: LayoutProps) => {
  const matches = useMatches();
  const currentRouter = matches?.[matches?.length ?? 0 - 1] as {
    handle?: Record<string, any>;
  };
  const isMenuAvailable =
    currentRouter?.handle?.[RootLayoutHandles.isMenuAvailable] ?? true;
  const isLogin = storageTool.get(StorageKeys.accessToken);
  const { t } = useTranslation();

  return (
    <div className={styles.layout}>
      <RootLayoutHeader
        isMenuAvailable={isMenuAvailable}
        isLogin={isLogin}
        userInfo={userInfo}
        t={t}
      />
      <main className={styles.content}>
        <Outlet />
      </main>
      <RootLayoutFooter t={t} />
    </div>
  );
};

export default memo(RootLayout);
