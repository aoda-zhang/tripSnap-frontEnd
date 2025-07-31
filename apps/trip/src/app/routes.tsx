import GuardRoute from '@shared/components/GuardRoute';
import RootLayout from '@shared/components/RootLayout';
import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import routeKeys from '@/constants/routeKeys';
import { useGlobalState } from '@/store/globalReducer';

const RootLayoutWithProps = () => {
  const { menuItems } = useGlobalState();
  return <RootLayout menuItems={menuItems} />;
};
const Home = lazy(() => import('@/features/Home'));
const TripLayout = lazy(() => import('@/features/Trip/tripLayout'));
const TripBasic = lazy(() => import('@/features/Trip/Basic'));
const TripDetail = lazy(() => import('@/features/Trip/Detail'));
const TripSummary = lazy(() => import('@/features/Trip/Summary'));
const TripSuccess = lazy(() => import('@/features/Trip/Success'));
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
            path: routeKeys.tripBasic,
            element: (
              <GuardRoute>
                <TripBasic />
              </GuardRoute>
            ),
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
            path: routeKeys.tripSummary,
            element: (
              <GuardRoute>
                <TripSummary />
              </GuardRoute>
            ),
          },
          {
            path: routeKeys.tripSuccess,
            element: (
              <GuardRoute>
                <TripSuccess />
              </GuardRoute>
            ),
          },
        ],
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
