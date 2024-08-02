/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getProfileUserFn } from "../../transtackQuery/userApis";
import { setUser } from "../../redux/features/authSlice";

const Auth = ({ children, roles = [] }) => {
  const { isLogin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileUserFn,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data && Object.keys(data)) {
      dispatch(setUser(data));
    }
  }, [data]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLogin && Array.isArray(roles) && roles.length) {
      const hasAccess = [...roles, "superAdmin"];
      if (!hasAccess.includes(user?.role)) {
        navigate(-1);
      }
    }
  }, [roles, isLogin]);

  return <>{children}</>;
};
Auth.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array,
};

export default Auth;
