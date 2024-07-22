import { useEffect, useState } from "react";
import { FaHome, FaMoneyBill } from "react-icons/fa";
import { useSelector } from "react-redux";
import userRole, { authAccess } from "./userRole";

export const generalRouts = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Transaction", path: "/transaction", icon: <FaMoneyBill /> },
];
export const adminRouts = [{ name: "User", path: "/user" }];

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
