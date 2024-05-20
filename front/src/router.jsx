import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard";
import { HomePage } from "./pages/home";
import { Layout } from "./pages/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>console.error();</div>,
  },
  {
    path: "/dashboard",
    // element: <DashboardPage />,
    element: <Layout />,
    errorElement: <div>console.error();</div>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
