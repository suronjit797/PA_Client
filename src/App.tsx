import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { routes } from "./routes/Routes";
import Swal from "sweetalert2";
import { setAuth } from "./redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { Bounce, ToastContainer } from "react-toastify";

import { gql } from "../src/__generated__/gql";
import { client } from "./graphql";

const GET_ROCKET_INVENTORY = gql(/* GraphQL */ `
  query Users($limit: Int!) {
    users(limit: $limit) {
      _id
      name
      email
    }
  }
`);

// antd theming
const customDarkTheme = {
  token: {
    colorBgBase: "#2c2c2c",
    colorTextBase: "#f7f7f7",
    colorWarning: "#ffc107",
    colorError: "#dc3545",
    colorSuccess: "#198754",
    colorPrimary: "#0d6efd",
    colorPrimaryHover: "#0c60d0",
    colorBgDisabled: "#4b93fd",
    colorInfo: "#0dcaf0",
    wireframe: false,
    fontSize: 16,
    sizeStep: 5,
  },
  algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
};

function App() {
  const dispatch = useAppDispatch();

  // client.setLink()

  // use without lazy
  // const queryClient = new QueryClient({
  //   queryCache: new QueryCache({
  //     onError: (error) => {
  //       if (error?.response?.status === 401) {
  //         dispatch(setAuth({ token: null, user: {} }));
  //         localStorage.clear();
  //       }
  //     },
  //   }),
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false,
  //     },
  //   },
  // });

  // net error
  useEffect(() => {
    if (!navigator.onLine) {
      Swal.fire({
        icon: "error",
        title: "No Internet Connection!",
        text: "Please make sure your internet connection on and try again",
        confirmButtonText: "Try again",
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <>
      <ConfigProvider theme={customDarkTheme}>
        <div className="">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
          <ConfigProvider>
            <RouterProvider router={routes}></RouterProvider>
          </ConfigProvider>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
