import { type RouteObject, createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import History from "@/pages/History";
import Home from "@/pages/Home";
import Trip from "@/pages/Trip";
import Step1 from "@/pages/Trip/Step1";
import Step2 from "@/pages/Trip/Step2";
import Step3 from "@/pages/Trip/Step3";
import ErrorPage from "@/shared/components/Error";
import Layout from "@/shared/components/Layout";

export enum RouterHandles {
  isMenuAvaliable = "isMenuAvaliable",
  noToken = "noToken",
}

const routerOptions: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, handle: { [RouterHandles.noToken]: true } },
      {
        path: "trip",
        element: <Trip />,
        children: [
          {
            path: "step1",
            element: <Step1 />,
          },
          {
            path: "step2",
            element: <Step2 />,
          },
          {
            path: "step3",
            element: <Step3 />,
          },
        ],
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "error",
    element: <ErrorPage />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const BrowerRouters: any = createBrowserRouter(routerOptions);

export default BrowerRouters;
