import Drawer from '@mui/material/Drawer';
import classNames from 'classnames';
import { TFunction } from 'i18next';
import { AlignJustify } from 'lucide-react';
import { cloneElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // 可扩展

import useIsMobile from '../../../hooks/useIsMobile';
// import AvatarMenu from '../../AvatarMenu';
import LangSwitcher from '../../LangSwitcher';
import styles from '../index.module.css';

type HeaderActionKey =
  | 'openMobileMenu'
  | 'logout'
  | 'goToProfile'
  | 'toggleDarkMode';

interface HeaderMenuItem {
  label: string;
  to?: string;
  classNames?: string[];
  onlyDesktop?: boolean;
  onlyMobile?: boolean;
  component?: any;
  action?: string; // Explicitly type the action property
  props?: Record<string, any>;
  type: 'link' | 'component';
}

// Image this menu options is from dynamic backend API
const HeaderMenuOptions: HeaderMenuItem[] = [
  {
    label: 'common.record',
    to: '/trip/step1',
    classNames: ['item'],
    type: 'link',
  },
  {
    label: 'common.history',
    to: '/trip/history',
    classNames: ['item'],
    type: 'link',
  },
  {
    label: 'common.login',
    to: '/login',
    classNames: ['item', 'login'],
    type: 'link',
  },
  {
    label: 'common.language',
    component: 'LangSwitcher',
    type: 'component',
  },
  {
    label: 'common.mobileMenu',
    onlyMobile: true,
    component: 'AlignJustify',
    action: 'openMobileMenu',
    props: {
      size: 40,
    },
    type: 'component',
  },
];

const HeaderComponentMappings = {
  LangSwitcher: <LangSwitcher />,
  AlignJustify: <AlignJustify />,
};

const HeaderMenu = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isMobileAvailable, setMobileAvailable] = useState(false);
  const HeaderActionMappings: Record<HeaderActionKey, () => void> = {
    openMobileMenu: () => {
      console.log('打开侧边栏！');

      setMobileAvailable(true);
    },
    logout: () => {
      console.log('用户退出登录');
    },
    goToProfile: () => {
      console.log('跳转用户中心');
    },
    toggleDarkMode: () => {
      console.log('切换深色模式');
    },
  };

  const getMenus = useMemo(() => {
    if (isMobile) {
      return HeaderMenuOptions?.filter((item) => item?.onlyMobile);
    }
    return HeaderMenuOptions?.filter((item) => !item?.onlyMobile);
  }, [isMobile]);

  return (
    <>
      {getMenus.map((item) => {
        if (item.type === 'link' && item.to) {
          return (
            <Link
              key={item.to}
              to={item.to}
              className={classNames(item.classNames)}
            >
              {t(item.label)}
            </Link>
          );
        }

        if (item.type === 'component' && item.component) {
          const Component =
            HeaderComponentMappings[
              item.component as keyof typeof HeaderComponentMappings
            ];
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (!item.action) return;
                const actionFn =
                  HeaderActionMappings[item.action as HeaderActionKey];
                actionFn?.();
              }}
            >
              {Component && cloneElement(Component, item.props ?? {})}
            </button>
          );
        }

        return null;
      })}
      <Drawer open={isMobileAvailable} anchor="right">
        <HeaderMenu />
      </Drawer>
    </>
  );
};

export interface RootLayoutHeaderProps {
  isMenuAvailable: boolean;
  t: TFunction<'translation', undefined>;
}

const RootLayoutHeader = ({ isMenuAvailable, t }: RootLayoutHeaderProps) => {
  if (!isMenuAvailable) return null;

  return (
    <header className={styles.header}>
      <Link className={classNames([styles.brand])} to="/">
        {t('common.brand')}
      </Link>

      <div className={styles.right}>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default RootLayoutHeader;
