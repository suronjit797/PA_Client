import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Auth from "../components/Auth/Auth";
import Admin from "../pages/Admin/Admin";
import UserList from "../pages/User/UserList";
import UserCreate from "../pages/User/UserCreate";
import UserUpdate from "../pages/User/UserUpdate";
import Transactions from "../pages/Transaction/Transactions";
import TransactionSummary from "../pages/TransactionSummary/TransactionSummary";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          // is login user
          <Auth>
            <Home />
          </Auth>
        ),
      },
      {
        path: "/admin",
        element: (
          //! is user match his role
          <Auth roles={["admin"]}>
            <Admin />
          </Auth>
        ),
      },
      {
        path: "/user",
        element: (
          //! is user match his role
          <Auth roles={["admin"]}>
            <UserList />
          </Auth>
        ),
      },
      {
        path: "/user/create",
        element: (
          //! is user match his role
          <Auth roles={["admin"]}>
            <UserCreate />
          </Auth>
        ),
      },
      {
        path: "/user/edit/:id",
        element: (
          //! is user match his role
          <Auth roles={["admin"]}>
            <UserUpdate />
          </Auth>
        ),
      },
      // money
      {
        path: "transaction",
        element: (
          <Auth>
            <Transactions />
          </Auth>
        ),
      },
      {
        path: "summary",
        element: (
          <Auth>
            <TransactionSummary />
          </Auth>
        ),
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);
