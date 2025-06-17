import { Drawer } from '@mui/material';
import { useMemo } from 'react';

import { useRootLayoutHeaderContext } from './RootLayoutHeader';
import RootLayoutMenuRender, { MenuItemType } from './RootLayoutMenuRender';

interface RootLayoutSidebarProps {
  menuItems: MenuItemType[];
}

const RootLayoutSidebar = ({ menuItems }: RootLayoutSidebarProps) => {
  const rootHeaderContext = useRootLayoutHeaderContext();
  const getMenuOptions = useMemo(() => {
    return (
      menuItems?.filter(
        (item) => !(item?.isAvailableOnMobile || item?.isOnlyMobile),
      ) ?? []
    );
  }, [menuItems]);

  return (
    <Drawer
      open={rootHeaderContext?.isSidebarAvailable}
      anchor="right"
      onClose={rootHeaderContext?.onCloseSidebar}
      className="root-layout-sidebar"
    >
      <RootLayoutMenuRender menuItems={getMenuOptions} />
    </Drawer>
  );
};
export default RootLayoutSidebar;
