/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button, Select, InputNumber, Switch } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { createTransactionFn, updateTransactionFn } from "../../transtackQuery/transactionApis";
import { transactionsOptions } from "../../utils/SelectOption";

const TransactionForm = ({ isModalOpen, editData, setIsModalOpen, setEditData }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: create, isPending: createPending } = useMutation({
    mutationKey: "createTransaction",
    mutationFn: createTransactionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Transactions"] });
    },
  });

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationKey: "createTransaction",
    mutationFn: updateTransactionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Transactions"] });
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
      title={`${editData?._id === "edit" ? "Edit" : "Create"} Transaction`}
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
      <Form form={form} layout="vertical" name="TransactionFrom" initialValues={{ isPending: false }}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required!" }]}>
          <Input placeholder="Input Title" />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true, message: "Type is required" }]}>
          <Select placeholder="Select Type" options={transactionsOptions} />
        </Form.Item>

        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Amount is required!" }]}>
          <InputNumber placeholder="Input Amount" className="w-full" />
        </Form.Item>

        <Form.Item
          name="isPending"
          label="Is Pending?"
          rules={[{ required: true, message: "Is Pending is required!" }]}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

TransactionForm.propTypes = {
  editData: PropTypes.object,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  setEditData: PropTypes.func,
};

export default TransactionForm;
