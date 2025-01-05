/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation } from "react-router-dom";
import "./MainLayout.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useGetRoutes } from "../utils/NavHelper";
import { useEffect, useState } from "react";
import { FaBars, FaMoon } from "react-icons/fa";
import { setTheme } from "../redux/features/themeSlice";
import { FaSun } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../redux/store";

const MainLayout = () => {
  const location = useLocation();
  const [routes] = useGetRoutes();
  const dispatch = useAppDispatch();

  const { isDark } = useAppSelector(state=> state.theme)

  // state
  const [currentPage, setCurrentPage] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(true);

  // effects
  useEffect(() => {
    if (location?.pathname && Array.isArray(routes)) {
      const findRoute = routes.find((route) => route.path === location.pathname);
      setCurrentPage(findRoute);
    }
  }, [location?.pathname]);

  return (
    <div className="flex">
      <header
        className={`${
          isNavOpen ? "w-80 opacity-100" : "w-0 opacity-0"
        } main_header capitalize z-50 bg-secondary h-screen overflow-hidden custom_shadow transition-all ease-out duration-200 text-nowrap select-none`}
      >
        <Header />
      </header>
      <div className="w-full h-screen overflow-hidden">
        {/* body header */}
        <div className="py-3 font-bold flex justify-between items-center px-3 custom_shadow h-12">
          <div
            className=" select-none p-2 rounded cursor-pointer hover:bg-[#ffffff15] active:bg-[#ffffff30]"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <FaBars />
          </div>
          <div className="w-full text-center">{currentPage?.name}</div>
          <div
            className=" select-none p-2 rounded cursor-pointer hover:bg-[#ffffff15] active:bg-[#ffffff30]"
            onClick={() => dispatch(setTheme())}
          >
            {/* <MoreOutlined /> */}
            {
              isDark ? <FaMoon /> : <FaSun />
            }
          </div>
        </div>

        {/* main body */}
        <main className="body px-4 h-screen overflow-y-auto relative scroll py-4 ">
          <Outlet />
        </main>

        {/* body footer */}
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
