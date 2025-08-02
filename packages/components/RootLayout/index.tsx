import { memo } from 'react';
import { Outlet, useMatches } from 'react-router-dom';

import styles from './index.module.css';
import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutHeader from './RootLayoutHeader';
import { MenuItemType } from './RootLayoutMenuRender';
import RootLayoutSidebar from './RootLayoutSidebar';

export const RootLayoutHandles = {
  isMenuAvailable: 'isMenuAvailable',
  requireUserLogin: 'requireUserLogin',
};

export interface LayoutProps {
  // userInfo: {
  //   [key: string]: any;
  // };
  menuItems: MenuItemType[];
}

const RootLayout = ({ menuItems = [] }: LayoutProps) => {
  const matches = useMatches();
  const currentRouter = matches?.[(matches?.length ?? 0) - 1] as {
    handle?: Record<string, any>;
  };
  const isMenuAvailable =
    currentRouter?.handle?.[RootLayoutHandles.isMenuAvailable] ?? true;

  return (
    <div className={styles.layout}>
      <RootLayoutHeader isMenuAvailable={isMenuAvailable} menuItems={menuItems}>
        <RootLayoutSidebar menuItems={menuItems} />
      </RootLayoutHeader>
      <main className={styles.content}>
        <Outlet />
      </main>
      <RootLayoutFooter />
    </div>
  );
};

export default memo(RootLayout);
