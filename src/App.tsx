import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { routes } from "./routes/Routes";
import Swal from "sweetalert2";
import { Bounce, ToastContainer } from "react-toastify";

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
            autoClose={2000}
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
