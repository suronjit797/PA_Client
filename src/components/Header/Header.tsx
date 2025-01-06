import { Link, NavLink, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/features/authSlice";
import { IoMdLogOut } from "react-icons/io";
import { useGetRoutes } from "../../utils/NavHelper";
import { FaRegCircleUser } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [routes] = useGetRoutes();
  const { user } = useAppSelector((state) => state.auth);

  // handle logout
  const handleLogout = () => {
    dispatch(setAuth({ token: null, user: {} }));
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex flex-col h-screen">
      {/* Logo */}
      <div className="py-3 text-center bg-secondary px-3 custom_shadow h-12 flex items-center justify-center">
        <Link className="font-bold " to="/">
          Personal Assistant
        </Link>
        <div className="bars"></div>
      </div>
      {/* nav */}
      <div className="px-1 py-2 overflow-y-auto scroll ">
        { Array.isArray(routes) && routes.map((item, index) => {
          return (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `cursor-pointer mb-1 flex hover:bg-[#ffffff15] active:bg-[#ffffff30] transition-all easy items-center px-3 py-2 rounded-md ${
                  isActive ? "bg-active" : ""
                }`
              }
              to={item.path}
            >
              <span className="text-lg w-7">{item.icon} </span>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="py-3 mt-auto flex justify-between items-center bg-secondary  px-3 custom_shadow h-12">
        <Link className="font-bold flex items-center space-x-3" to="/profile">
          <FaRegCircleUser className="text-3xl" />
          <div>
            <h5 className="font-bold">{user?.name}</h5>
            <div className="capitalize text-xs"> ({user?.role})</div>
          </div>
        </Link>
        <div
          onClick={handleLogout}
          className="logout text-xl p-2 rounded cursor-pointer text-red-500 hover:bg-[#ffffff15] active:bg-[#ffffff30] "
        >
          <IoMdLogOut />
        </div>
      </div>
    </div>
  );
};

export default Header;
