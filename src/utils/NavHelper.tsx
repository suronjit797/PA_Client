import { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { useSelector } from "react-redux";
import userRole, { authAccess } from "./userRole";
import { ImBlog } from "react-icons/im";
import { SlCalender, SlEvent } from "react-icons/sl";
import { LuListTodo } from "react-icons/lu";
import { GiPayMoney, GiStairsGoal } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { PiNotebookLight } from "react-icons/pi";
import { MdAltRoute, MdOutlineConnectWithoutContact } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export const generalRouts = [
  { name: "Home", path: "/", icon: <GoHome /> },
  { name: "Calendar", path: "/calender", icon: <SlCalender /> },
  { name: "Daily Routine", path: "/routine", icon: <MdAltRoute /> },
  { name: "Transaction", path: "/transaction", icon: <GiPayMoney /> },
  { name: "Todo", path: "/todo", icon: <LuListTodo /> },
  { name: "Goals & Milestones", path: "/goals", icon: <GiStairsGoal /> },
  { name: "Blog", path: "/blog", icon: <ImBlog /> },
  { name: "Diary", path: "/diary", icon: <PiNotebookLight /> },
  { name: "Contact", path: "/contact", icon: <MdOutlineConnectWithoutContact /> },
  { name: "Password Manager", path: "/passwords", icon: <RiLockPasswordLine /> },
  { name: "Events", path: "/event", icon: <SlEvent /> },
];
export const adminRouts = [
  { name: "User", path: "/user", icon: <FaUserAstronaut /> },
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
