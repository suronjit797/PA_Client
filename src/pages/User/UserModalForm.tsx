// import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import { ICreateUser, IUser } from "./UsersInterface";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__";
import { toast } from "react-toastify";

interface IProps {
  isModalOpen: boolean;
  mode: "edit" | "create";
  editData: IUser | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const UPDATE_USER = gql(`
  mutation UpdateUser($id: ID!, $body: UpdateUserInput) {
    updateUser(id: $id, body: $body) {
      name
    }
  }
`);

const CREATE_USER = gql(`
  mutation RegisterUser($body: CreateUserInput!) {
    register(body: $body) {
      _id
      name
    }
  }
`);

const UserModalForm: React.FC<IProps> = ({ isModalOpen, editData, setIsModalOpen, setEditData, mode }) => {
  const [form] = Form.useForm();

  console.log(editData);
  const [updateUser] = useMutation(UPDATE_USER, { refetchQueries: ["UsersList"] });
  const [createUser] = useMutation(CREATE_USER, { refetchQueries: ["UsersList"] });

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(undefined);
  };

  const handleOk = async () => {
    try {
      const values: ICreateUser = await form.validateFields();
      console.log(values);
      if (mode === "edit" && editData) {
        await updateUser({ variables: { id: editData._id, body: values } });
      } else {
        delete values.confirm;
        await createUser({ variables: { body: values } });
      }

      toast.success(`User ${mode === "edit" ? "updated" : "created"} successfully`);
    } catch (error) {
      console.log("Validation Failed:", error);
    } finally {
      setIsModalOpen(false);
      setEditData(undefined);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="edit_user">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
          <Input placeholder="Input Name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
          <Input placeholder="Input Email" />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please input the role!" }]}>
          <Select
            placeholder="Select Role"
            style={{
              width: "100%",
            }}
            options={[
              {
                value: "admin",
                label: "Admin",
              },
              {
                value: "student",
                label: "Student",
              },
            ]}
          />
        </Form.Item>
        {mode === "create" && (
          <>
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
          </>
        )}
      </Form>
    </Modal>
  );
};

export default UserModalForm;
