import { createBrowserRouter } from "react-router-dom";
import { FeedPage } from "./pages/feed";
import { HomePage } from "./pages/home";
import { Layout } from "./pages/layout";
import { AuthPage } from "./pages/auth";
import { PostPage } from "./pages/post";
import { AddPostPage } from "./pages/add-post";

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
    path: "/feed",
    element: <Layout />,
    errorElement: <div>console.error();</div>,
    children: [
      {
        path: "/feed/",
        element: <FeedPage />,
      },
      {
        path: "/feed/add-post",
        element: <AddPostPage />,
      },
      {
        path: "/feed/post/:postId",
        element: <PostPage />,
      },
    ],
  },
]);
