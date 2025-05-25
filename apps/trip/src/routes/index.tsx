import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export enum RouterHandles {
  isMenuAvaliable = 'isMenuAvaliable',
  noToken = 'noToken',
}
const Layout = lazy(() => import('@/features/Layout'));
const Home = lazy(() => import('@/features/Home'));
const Trip = lazy(() => import('@/features/Trip/tripLayout'));
const Step1 = lazy(() => import('@/features/Trip/Step1'));
const Step2 = lazy(() => import('@/features/Trip/Step2'));
const History = lazy(() => import('@/features/History'));
const Login = lazy(() => import('@/features/Auth/Login'));
const Register = lazy(() => import('@/features/Auth/Register'));
const ErrorPage = lazy(() => import('@/shared/components/Error'));

const routeOptions = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', index: true, element: <Home />, handle: { [RouterHandles.noToken]: true } },
      {
        path: 'trip',
        element: <Trip />,
        children: [
          {
            path: 'step1',
            element: <Step1 />,
          },
          {
            path: 'step2/:id',
            element: <Step2 />,
          },
        ],
      },
      {
        path: 'history',
        element: <History />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'error',
    element: <ErrorPage />,
  },

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
const routes = createBrowserRouter(routeOptions);
export default routes;
