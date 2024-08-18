/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button, Select, InputNumber, Switch } from "antd";
import { useEffect } from "react";
import { createTransactionFn, updateTransactionFn } from "../../transtackQuery/transactionApis";
import { transactionsOptions } from "../../utils/SelectOption";
import { ITransaction } from "./TransactionsInterface";
import { FormProps } from "antd/es/form";
import { SelectProps } from "antd/es/select";

// Define the props for the TransactionForm component
interface TransactionFormProps {
  isModalOpen: boolean;
  editData: Partial<ITransaction> | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<Partial<ITransaction>>>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isModalOpen, editData, setIsModalOpen, setEditData }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Use TypeScript to annotate the mutation hooks
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
      form.setFieldsValue(editData);
    }
  }, [editData]);

  const handleCancel = () => {
    setEditData({});
    setIsModalOpen(false);
  };

  const onFinish: FormProps<ITransaction>["onFinish"] = async (values) => {
    try {
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
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="TransactionForm"
        initialValues={{ isPending: false }}
        onFinish={onFinish}
        onFinishFailed={(value) => console.log("failed", value)}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required!" }]}>
          <Input placeholder="Input Title" />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true, message: "Type is required" }]}>
          <Select placeholder="Select Type" options={transactionsOptions as SelectProps["options"]} />
        </Form.Item>

        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Amount is required!" }]}>
          <InputNumber placeholder="Input Amount" className="w-full" />
        </Form.Item>

        {/* {!editData?._id && (
          <Form.Item name="isPending" label="Status">
            <Switch defaultChecked={editData?.isPending} />
          </Form.Item>
        )} */}

        <div className="flex justify-end space-x-2">
          <Button key="back" htmlType="button" danger onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={createPending || updatePending} key="submit" type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TransactionForm;
