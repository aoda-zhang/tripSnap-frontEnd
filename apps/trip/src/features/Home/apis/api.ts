import httpService from '@shared/cores/http';

type TripViewType = {
  img: string;
  title: string;
  rows?: number;
  cols?: number;
};
export const getDefaultTripView = (): Promise<TripViewType[]> => {
  return httpService.get('document/v1/default-trip-views');
};
export const getDefaultDynamicMenu = () => {
  // return httpService.get('document/v1/default-dynamic-menu');
  // Image this data from API server side
  return [
    {
      label: 'common.brand',
      isAvailableOnMobile: true,
      to: '/',
      classNames: ['brand'],
      type: 'link',
    },
    {
      label: 'common.record',
      to: '/trip/basic',
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
      isOnlyMobile: true,
      component: 'AlignJustify',
      action: 'openSidebarMenu',
      props: {
        size: 30,
      },
      type: 'component',
    },
    {
      label: 'common.darkMode',
      component: 'DarkModeToggle',
      classNames: ['item'],
      type: 'component',
    },
  ];
};
