/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button, Select, InputNumber, Switch } from "antd";
import { useEffect } from "react";
import { createTransactionFn, updateTransactionFn } from "../../transtackQuery/transactionApis";
import { transactionsOptions } from "../../utils/SelectOption";
import { FormInstance } from "antd/es/form";
import { SelectProps } from "antd/es/select";

interface Transaction {
  _id?: string;
  title: string;
  type: string;
  amount: number;
  isPending: boolean;
}

interface TransactionFormProps {
  isModalOpen: boolean;
  editData: Transaction | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isModalOpen, editData, setIsModalOpen, setEditData }) => {
  const [form] = Form.useForm<FormInstance>();
  const queryClient = useQueryClient();

  const { mutate: create, isPending: createPending } = useMutation({
    mutationKey: ["createTransaction"],
    mutationFn: createTransactionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationKey: ["updateTransaction"],
    mutationFn: updateTransactionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  useEffect(() => {
    if (editData?._id) {
      form.setFieldsValue({ ...editData });
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
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title={`${editData?._id ? "Edit" : "Create"} Transaction`}
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
      <Form form={form} layout="vertical" name="TransactionForm" initialValues={{ isPending: false }}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required!" }]}>
          <Input placeholder="Input Title" />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true, message: "Type is required" }]}>
          <Select placeholder="Select Type" options={transactionsOptions as SelectProps["options"]} />
        </Form.Item>

        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Amount is required!" }]}>
          <InputNumber placeholder="Input Amount" className="w-full" />
        </Form.Item>

        <Form.Item name="isPending" label="Is Pending?" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionForm;
