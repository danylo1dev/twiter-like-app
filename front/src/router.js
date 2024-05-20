import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard";
import { HomePage } from "./pages/home";
import { Layout } from "./pages/layout";
import { AuthPage } from "./pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>console.error();</div>,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <div>console.error();</div>,
  },
  {
    path: "/dashboard",
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
