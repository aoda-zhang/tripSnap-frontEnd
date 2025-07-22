import GuardRoute from '@shared/components/GuardRoute';
import RootLayout from '@shared/components/RootLayout';
import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { useMenuItems } from './globalStore';

import routeKeys from '@/constants/routeKeys';

const RootLayoutWithProps = () => {
  const menuItems = useMenuItems();
  return <RootLayout menuItems={menuItems} />;
};
const Home = lazy(() => import('@/features/Home'));
const TripLayout = lazy(() => import('@/features/Trip/tripLayout'));
const TripStep1 = lazy(() => import('@/features/Trip/Step1'));
const TripStep2 = lazy(() => import('@/features/Trip/Step2'));
const TripDetail = lazy(() => import('@/features/Trip/Detail'));
const History = lazy(() => import('@/features/History'));
const Login = lazy(() => import('@/features/Auth/Login'));
const Register = lazy(() => import('@/features/Auth/Register'));
const NotFund = lazy(() => import('@shared/components/NotFund'));
const routeOptions = [
  {
    path: routeKeys.home,
    element: <RootLayoutWithProps />,
    children: [
      {
        path: routeKeys.home,
        index: true,
        element: (
          <GuardRoute isRequireUserLogin={false}>
            <Home />
          </GuardRoute>
        ),
      },
      {
        path: routeKeys.trip,
        element: (
          <GuardRoute>
            <TripLayout />
          </GuardRoute>
        ),
        children: [
          {
            path: routeKeys.tripStep1,
            element: (
              <GuardRoute>
                <TripStep1 />
              </GuardRoute>
            ),
          },
          {
            path: routeKeys.tripStep2,
            element: (
              <GuardRoute>
                <TripStep2 />
              </GuardRoute>
            ),
          },
        ],
      },
      {
        path: routeKeys.tripDetail,
        element: (
          <GuardRoute>
            <TripDetail />
          </GuardRoute>
        ),
      },
      {
        path: routeKeys.history,
        element: (
          <GuardRoute>
            <History />
          </GuardRoute>
        ),
      },
    ],
  },
  {
    path: routeKeys.login,
    element: <Login />,
  },
  {
    path: routeKeys.register,
    element: <Register />,
  },
  {
    path: routeKeys.notFund,
    element: <NotFund />,
  },

  {
    path: '*',
    element: <Navigate to={routeKeys.notFund} replace />,
  },
];
const routes = createBrowserRouter(routeOptions);

const AppRouterProvider = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouterProvider;
