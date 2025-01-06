import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { gql } from "../../__generated__";
import { ICreateUser } from "../User/UsersInterface";
import { toast } from "react-toastify";

const REGISTER_USER = gql(`
  mutation RegisterUser($body: CreateUserInput!) {
    register(body: $body) {
      _id
      name
    }
  }
`);
const Register = () => {
  const navigate = useNavigate();

  const [register] = useMutation(REGISTER_USER);

  const postFormData = async (value: ICreateUser) => {
    const body = { ...value, role: "user" };
    delete body?.confirm
    console.log(body)
    await register({ variables: { body } });
    toast.success(`Registration successfully!`);
    navigate("/login");
  };

  return (
    <div className=" bg-[url('/photo/photo1.webp')] bg-cover bg-opacity-50 backdrop-blur-xl bg-center  min-h-screen text-white p-6 overflow-y-auto items-center flex">
      <div className="p-5 p-md-14 ms-auto w-full bg-black bg-opacity-35 rounded-xl max-w-lg">
        <div className="text-4xl text-[#BDE4A7] font-semibold text-center mb-4">Registration</div>
        <Form
          className=" text-white"
          name="register"
          onFinish={postFormData}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={<span style={{ fontSize: "16px", color: "white" }}>Name</span>}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Input name" />
          </Form.Item>

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
            <Input placeholder="Input Email" />
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
            <Input.Password placeholder="Input password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<span style={{ fontSize: "16px", color: "white" }}>Confirm Password</span>}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(" Password does not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button className="btn btn-primary" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="text-xl text-center font-semibold">
          Already Registered? {" "}
          <Link to="/login" className=" text-xl text-[#BDE4A7] font-semibold">
            Sing In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
