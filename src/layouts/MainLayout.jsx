import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col  min-h-screen">
      <header>
        <Header />
      </header>
      <main className="body">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
