import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/features/authSlice";
import { IoMdLogOut } from "react-icons/io";
import { useGetRoutes } from "../../utils/NavHelper";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [routes] = useGetRoutes();
  const { user } = useSelector((state) => state.auth);

  // handle logout
  const handleLogout = () => {
    dispatch(setAuth({ token: null, user: {} }));
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      {/* Logo */}
      <div className="py-3 text-center bg-secondary px-3 custom_shadow h-12 flex items-center justify-center">
        <Link className="font-bold " to="/">
          Personal Assistant
        </Link>
        <div className="bars"></div>
      </div>
      {/* nav */}
      <div className="main_nav px-1 py-2 ">
        {routes.map((item, index) => {
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

      <div className="py-3 flex justify-between items-center bg-secondary  px-3 custom_shadow h-16">
        <Link className="font-bold " to="/profile">
          <h5 className="font-bold">{user?.name}</h5>
          <div className="capitalize"> ({user?.role})</div>
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
