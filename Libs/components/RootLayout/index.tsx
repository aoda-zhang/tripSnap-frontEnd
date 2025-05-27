import classNames from 'classnames';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useMatches } from 'react-router-dom';

import AvatarMenu from '../AvatarMenu';

import styles from './index.module.css';

import { RouterHandles } from '@/routes';
import LangSwitcher from '@/shared/components/LangSwitcher';
import storageTool from '@/shared/utils/storage';
import globalStore from '@/store/globalStore';
import StorageKeys from '@/typings/storage.types';

interface HeaderProps {
  isMenuAvaliable: boolean;
  isLogin: boolean;
  userInfo: Record<string, any>;
  t: TFunction<'translation', undefined>;
}

const Header = ({ isMenuAvaliable, isLogin, userInfo, t }: HeaderProps) => {
  if (!isMenuAvaliable) return null;

  return (
    <header className={styles.header}>
      <Link className={classNames([styles.brand])} to="/">
        {t('common.brand')}
      </Link>

      <div className={styles.right}>
        <Link className={styles.item} to="/trip/step1">
          {t('common.record')}
        </Link>

        <Link className={styles.item} to="/trip/history">
          {t('common.history')}
        </Link>
        {!isLogin && (
          <Link className={classNames([styles.item, styles.login])} to="/login">
            {t('common.login')}
          </Link>
        )}
        {isLogin && <AvatarMenu userInfo={userInfo} />}
        <LangSwitcher />
      </div>
    </header>
  );
};

const Footer = ({ t }: { t: TFunction<'translation', undefined> }) => (
  <div className={styles.footer}>
    {t('common.brand')} ©{dayjs().year()}
  </div>
);

interface ContentProps {
  isMenuAvaliable: boolean;
  isLogin: boolean;
  userInfo: Record<string, any>;
  t: any;
}

const Content = ({ isMenuAvaliable, isLogin, userInfo, t }: ContentProps) => (
  <>
    <Header
      isMenuAvaliable={isMenuAvaliable}
      isLogin={isLogin}
      userInfo={userInfo}
      t={t}
    />
    <main className={styles.content}>
      <Outlet />
    </main>
    <Footer t={t} />
  </>
);

const Layout = () => {
  const { userInfo } = globalStore();
  const matches = useMatches();
  const currentRouter = matches?.[matches?.length ?? 0 - 1] as {
    handle?: Record<string, any>;
  };
  const isMenuAvaliable =
    currentRouter?.handle?.[RouterHandles.isMenuAvaliable] ?? true;
  const isLogin = storageTool.get(StorageKeys.accessToken);
  const { t } = useTranslation();

  return (
    <div className={styles.layout}>
      <Content
        isMenuAvaliable={isMenuAvaliable}
        isLogin={isLogin}
        userInfo={userInfo}
        t={t}
      />
    </div>
  );
};

export { Header, Footer, Content };
export default memo(Layout);
