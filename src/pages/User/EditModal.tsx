// import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import { IUser } from "./UsersInterface";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__";

interface IProps {
  isModalOpen: boolean;
  editData: IUser;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UPDATE_USER = gql(`
  mutation UpdateUser($id: ID!, $body: UpdateUserInput) {
    updateUser(id: $id, body: $body) {
      name
    }
  }
`);

const EditModal: React.FC<IProps> = ({ isModalOpen, editData, setIsModalOpen }) => {
  const [form] = Form.useForm();

  console.log(editData);
  const [updateUser] = useMutation(UPDATE_USER, { refetchQueries: ["UsersList"] });

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      updateUser({ variables: { id: editData._id, body: values } });
      //   onSave(values);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Validation Failed:", error);
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
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
          <Input />
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
      </Form>
    </Modal>
  );
};

export default EditModal;
