import TransactionFilter from "./TransactionFilter";
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import TransactionsList from "./TransactionsList";
import TransactionSummary from "./TransactionSummary";
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
        <div className="col-span-4">
          {/* secondary nav for create and filter */}
          <div className="mb-3 flex items-center justify-between gap-3 bg-card  p-3 rounded-md">
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

          {/* summary */}
          <TransactionSummary />

          {/* list */}
          <TransactionsList {...{ isModalOpen, setIsModalOpen, editData, setEditData, data }} />
          {isModalOpen && <TransactionForm {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />}

          {/* filter drawer */}
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
