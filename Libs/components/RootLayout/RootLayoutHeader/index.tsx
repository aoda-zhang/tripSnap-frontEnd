import classNames from 'classnames';
import { TFunction } from 'i18next';
import { Link } from 'react-router-dom';

import AvatarMenu from '../../AvatarMenu';
import LangSwitcher from '../../LangSwitcher';
import styles from '../index.module.css';

export interface RootLayoutHeaderProps {
  isMenuAvaliable: boolean;
  isLogin: boolean;
  userInfo: {
    [key: string]: any;
  };
  t: TFunction<'translation', undefined>;
}

const RootLayoutHeader = ({
  isMenuAvaliable,
  isLogin,
  userInfo,
  t,
}: RootLayoutHeaderProps) => {
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

export default RootLayoutHeader;
