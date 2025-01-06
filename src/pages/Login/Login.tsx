/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input } from "antd";
import { setAuth } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { gql } from "../../__generated__";

const USER_LOGIN = gql(`
  mutation Login($body: LoginInput) {
    login(body: $body) {
      accessToken
    }
  }
`);

const GET_PROFILE_QUERY = gql(`
  query getProfile {
    profile {
      name
      email
      role
    }
  }
`);

const Login = () => {
  const navigate = useNavigate();
  const [login] = useMutation(USER_LOGIN);

  // redux
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);

  const [getProfile] = useLazyQuery(GET_PROFILE_QUERY);

  // navigate to home if login
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const handleLogin = async (values: { email: string; password: string }) => {
    const { data } = await login({ variables: { body: values } });
    console.log({ data });

    if (data?.login?.accessToken) {
      const token = `Bearer ${data.login.accessToken}`;
      const { data: profileData } = await getProfile({
        context: {
          headers: {
            Authorization: token,
          },
        },
      });

      console.log({ profileData });

      if (profileData?.profile) {
        dispatch(
          setAuth({
            token,
            user: profileData.profile,
          })
        );

        toast.success("Login successful!");
        navigate("/");
      }
    }
  };

  return (
    <div className=" bg-[url('/photo/photo2.webp')] h-screen bg-cover bg-opacity-50 backdrop-blur-xl bg-center md:grid md:grid-cols-7 min-h-screen text-white p-6 overflow-y-auto items-center ">
      <div className=" md:col-span-3 flex flex-col justify-center gap-4 p-14 h-full bg-black bg-opacity-15 rounded-xl ">
        <div className="text-4xl  items-center text-[#BDE4A7] font-semibold text-center mb-4">Log In</div>
        <Form
          name="register"
          className=" "
          onFinish={handleLogin}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label={<span style={{ fontSize: "16px", color: "white" }}>E-mail</span>}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input className="" placeholder="Input Email" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: "16px", color: "white" }}>Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "min length 6",
              },
            ]}
          >
            <Input.Password placeholder="Input Password" />
          </Form.Item>

          <Form.Item>
            <Button className="btn btn-primary" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className=" flex justify-around mt-2 mb-0 align-middle">
          <h1 className=" h-[2px] my-auto rounded w-[40%] bg-gray-500" /> or
          <h1 className=" h-[2px] rounded my-auto w-[40%] bg-gray-500" />
        </div>
        <div className="text-xl mt-0 text-center font-semibold">
          Don't have an account?{" "}
          <Link to="/register" className=" text-xl text-[#BDE4A7] font-semibold">
            Sing Up
          </Link>
        </div>
      </div>
      <div className=" col-span-4"></div>
    </div>
  );
};

export default Login;
