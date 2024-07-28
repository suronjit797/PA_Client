/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { createTodoFn, updateTodoFn } from "../../transtackQuery/todoApis";

const TodoForm = ({ isModalOpen, editData, setIsModalOpen, setEditData }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: create, isPending: createPending } = useMutation({
    mutationKey: "createTodo",
    mutationFn: createTodoFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationKey: "updateTodo",
    mutationFn: updateTodoFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  useEffect(() => {
    if (editData?._id) {
      form.setFieldsValue(editData);
    }
  }, [editData]);

  const handleCancel = () => {
    setEditData(null);
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editData?._id) {
        await update({ ...editData, ...values });
      } else {
        await create(values);
      }
      handleCancel();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title={`${editData?._id === "edit" ? "Edit" : "Create"} Todo`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" danger onClick={handleCancel}>
          Cancel
        </Button>,
        <Button disabled={createPending || updatePending} key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="TodoFrom" initialValues={{ isPending: false }}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required!" }]}>
          <Input placeholder="Input Title" />
        </Form.Item>


      </Form>
    </Modal>
  );
};

TodoForm.propTypes = {
  editData: PropTypes.object,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  setEditData: PropTypes.func,
};

export default TodoForm;
