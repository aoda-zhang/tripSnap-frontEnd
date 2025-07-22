import { ReactNode, useMemo, createContext, useContext, useState } from 'react';

import useIsMobile from '../../../hooks/useIsMobile';

import styles from './index.module.css';
import RootLayoutMenuRender, { MenuItemType } from './RootLayoutMenuRender';

export interface RootLayoutHeaderProps {
  isMenuAvailable: boolean;
  menuItems: MenuItemType[];
  children: ReactNode;
}

interface RootHeaderContextType {
  isSidebarAvailable: boolean;
  onOpenSidebar: () => void;
  onCloseSidebar: () => void;
}

const RootLayoutHeaderContext = createContext<RootHeaderContextType | null>(
  null,
);

export const useRootLayoutHeaderContext = () => {
  const context = useContext(RootLayoutHeaderContext);
  if (!context) {
    return null;
  }
  return context;
};

const RootLayoutHeader = ({
  isMenuAvailable,
  menuItems,
  children,
}: RootLayoutHeaderProps) => {
  const isMobile = useIsMobile();
  const [isSidebarAvailable, setSidebarAvailable] = useState(false);

  const onOpenSidebar = () => setSidebarAvailable(true);
  const onCloseSidebar = () => setSidebarAvailable(false);

  const sidebarContextValue = useMemo(
    () => ({ isSidebarAvailable, onOpenSidebar, onCloseSidebar }),
    [isSidebarAvailable],
  );
  const getMenuOptions = useMemo(() => {
    if (isMobile) {
      return (
        menuItems?.filter(
          (item) => item?.isAvailableOnMobile || item?.isOnlyMobile,
        ) ?? []
      );
    }
    return menuItems?.filter((item) => !item?.isOnlyMobile) ?? [];
  }, [menuItems, isMobile]);

  if (!isMenuAvailable) return null;

  return (
    <RootLayoutHeaderContext.Provider value={sidebarContextValue}>
      <header className={styles.header}>
        <RootLayoutMenuRender menuItems={getMenuOptions} />
        {children}
      </header>
    </RootLayoutHeaderContext.Provider>
  );
};

export default RootLayoutHeader;
