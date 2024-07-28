import { useEffect, useState } from "react";
import { FaHome, FaMoneyBill, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import userRole, { authAccess } from "./userRole";
import { AiFillWechatWork } from "react-icons/ai";

export const generalRouts = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Transaction", path: "/transaction", icon: <FaMoneyBill /> },
  { name: "Todo", path: "/todo", icon: <AiFillWechatWork /> },
];
export const adminRouts = [
  { name: "User", path: "/user", icon: <FaUser /> },
];

// routes
export const useGetRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const [routes, setRouts] = useState(generalRouts);

  useEffect(() => {
    if (authAccess(userRole.admin).includes(user?.role)) {
      setRouts([...generalRouts, ...adminRouts]);
    }
  }, [user?.role]);

  return [routes, setRouts];
};
