import classNames from 'classnames';
import { AlignJustify } from 'lucide-react';
import { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import LangSwitcher from '../LangSwitcher';

import styles from './index.module.css';
import { useRootLayoutHeaderContext } from './RootLayoutHeader';

const HeaderActionKeys = {
  openSidebarMenu: 'openSidebarMenu',
  toggleDark: 'toggleDark',
};

export interface MenuItemType {
  label: string;
  to?: string;
  classNames?: string[];
  isAvailableOnMobile?: boolean;
  isOnlyMobile?: boolean;
  component?: any;
  action?: string; // Explicitly type the action property
  props?: Record<string, any>;
  type: 'link' | 'component';
}

export interface MenuRenderType {
  menuItems: MenuItemType[];
}
const RootLayoutMenuRender = (props: MenuRenderType) => {
  const HeaderComponentMappings = {
    LangSwitcher: <LangSwitcher />,
    AlignJustify: <AlignJustify />,
  };
  const { menuItems } = props;
  const rootHeaderContext = useRootLayoutHeaderContext();
  const { t } = useTranslation();

  const toggleDark = (theme: string) => {
    return `props_${theme}`;
  };

  const handleHeaderAction = (action: string, actionProps: any) => {
    switch (action) {
      case HeaderActionKeys.openSidebarMenu:
        rootHeaderContext?.onOpenSidebar?.();
        break;
      case HeaderActionKeys.toggleDark:
        toggleDark(actionProps);
        break;
      // Add more cases for different actions as needed
      default:
        console.warn(`Unknown header action: ${action}`);
    }
  };

  return menuItems?.map((item) => {
    const itemClassNames = item?.classNames?.map((name) => styles?.[name]);
    if (item.type === 'link' && item.to) {
      return (
        <Link key={item.to} to={item.to} className={classNames(itemClassNames)}>
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
        <div
          className={classNames(itemClassNames)}
          key={item?.label}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!item.action) return;
            handleHeaderAction(item.action, item?.props ?? {});
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!item.action) return;
              handleHeaderAction(item.action, item?.props ?? {});
            }
          }}
        >
          {Component && cloneElement(Component, item.props ?? {})}
        </div>
      );
    }

    return null;
  });
};

export default RootLayoutMenuRender;
