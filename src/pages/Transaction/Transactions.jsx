import TransactionFilter from "./TransactionFilter";
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import TransactionsList from "./TransactionsList";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import { Button, Spin, Drawer, Form } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactionFn } from "../../transtackQuery/transactionApis";
import { searchQueryFormat, transactionQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { ReloadOutlined } from "@ant-design/icons";

const initData = { range: [] };

function Transactions() {
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useSearchQuery(transactionQueries);
  const [form] = Form.useForm();

  const [formData, setFormData] = useState(initData);
  const [editData, setEditData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["transactions", searchQuery],
    queryFn: () => getAllTransactionFn({ ...searchQuery, user: user._id }),
  });

  const handleClear = () => {
    form.resetFields();
    setFormData(initData);
    setSearchQuery({});
  };

  return (
    <Spin spinning={isPending}>
      <div className="">
        {/* {isHeaderModalOpen && (
          <div className="">
            
          </div>
        )} */}
        <div className="col-span-4">
          {/* <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold"> Transactions </h4>
          <Button onClick={() => setIsModalOpen(!isModalOpen)} type="primary">
            Create
          </Button>
        </div> */}
          <div className="mb-3 flex justify-between gap-3 bg-card  p-3 rounded-md">
            <div className="font-bold"> Total Transactions: {data?.meta?.total || 0} </div>
            <div className="flex gap-3">
              <Button
                type="primary"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
                icon={<FaPlus />}
              />
              <Button type="" icon={<FaFilter />} onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
              {Object?.keys(searchQueryFormat(searchQuery)).length > 0 && (
                <Button type="primary" danger icon={<ReloadOutlined />} onClick={handleClear} />
              )}
            </div>
          </div>
          <Summary />
          <TransactionsList {...{ isModalOpen, setIsModalOpen, editData, setEditData, data }} />
          {isModalOpen && <TransactionForm {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />}
          <Drawer
            title={<div className="text-end">Filter</div>}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <TransactionFilter {...{ form, formData, setFormData }} />
          </Drawer>
        </div>
      </div>
    </Spin>
  );
}

export default Transactions;
