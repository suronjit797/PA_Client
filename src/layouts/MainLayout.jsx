import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  // const [header]

  return (
    <div className="flex">
      <header
        className="w-80 main_header capitalize z-50 bg-secondary h-screen overflow-hidden custom_shadow"
      >
        <Header />
      </header>
      <div className="flex flex-col  h-screen overflow-y-auto w-full scroll">
        <main className="body px-6">
          <Outlet />
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
