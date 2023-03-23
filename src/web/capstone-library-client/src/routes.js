import { useRoutes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MainLayout from "./layout/MainLayout/MainLayout";
import AddBook from "./views/AddBook/AddBook";
import BookPage from "./views/BookPage/BookPage";
import Category from "./views/Category/Category";
import DetailBook from "./views/DetailBook/DetailBook";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import Error from "./views/Home/Error";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Order from "./views/Order/Order";
import AddPost from "./views/Post/AddPost";
import Post from "./views/Post/Post";
import DetailPost from "./views/Post/PostDetail";
import Register from "./views/Register/Register";
import Setting from "./views/Setting/Setting";

export default function Route() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/book",
          element: <BookPage />,
        },
        {
          path: "/detail-book/:id",
          element: <DetailBook />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/post",
          element: <Post />
        },
        {
          path: "/detail-post/:id",
          element: <DetailPost />,
        },
        {
          path: "/user",
          element: <PrivateRoute />,
          children: [
            {
              path: "profile",
              element: <Setting />,
            },
            {
              path: "add-book",
              element: <AddBook />,
            },
            {
              path: "order",
              element: <Order />,
            },
            {
              path: "add-post",
              element: <AddPost />
            },
            {
              path: "category",
              element: <Category />
            }
          ],
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);
}
