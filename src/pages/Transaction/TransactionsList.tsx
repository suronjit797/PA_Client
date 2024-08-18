import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransactionFn, updateTransactionFn } from "../../transtackQuery/transactionApis";
import { Button, Table, TableColumnsType, Tag } from "antd";
import styled from "styled-components";
import Swal from "sweetalert2";
import { searchQueryFormat, transactionQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { serialNumber } from "../../utils/helpers";
import React from "react";
import { ITransaction } from "./TransactionsInterface";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { IMeta } from "../../interfaces/interfaces";

const rowColor: { [key: string]: any } = {
  income: "green",
  expense: "red",
  give: "orange",
  take: "violet",
  save: "sky",
  withdraw: "fuchsia",
};

const StyledTable = styled(Table)<any>`
  .ant-table-thead th.ant-table-cell {
    // background-color: rgb(243 243 243 / 98%);
  }
  td.ant-table-cell {
    border: transparent !important;
  }
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
`;

interface TransactionsListProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<Partial<ITransaction>>>;
  data?: {
    data: ITransaction[];
    meta: IMeta;
  };
  isPending: boolean;
}

function TransactionsList({ setIsModalOpen, setEditData, data }: TransactionsListProps) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useSearchQuery(transactionQueries);

  const { limit, page } = searchQuery;

  const {
    mutate: remove,
    isError,
    error,
    isPending: removePending,
  } = useMutation({
    mutationKey: ["removeTransaction"],
    mutationFn: deleteTransactionFn,
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

  const handleEdit = (data: ITransaction) => {
    setEditData(data);
    setIsModalOpen(true);
  };
  const handleRemove = (id: string) => {
    remove(id);
  };

  const handleTableChange = (page: number, limit?: number) => {
    setSearchQuery(searchQueryFormat({ ...searchQuery, page, limit }));
  };

  const columns: TableColumnsType<ITransaction> = [
    {
      title: "No.",
      render: (_text, _record, index) => (
        <span key={index}>{serialNumber(Number(data?.meta?.page || 1), Number(data?.meta?.limit || 10), index)}</span>
      ),
      dataIndex: "index", // Add this line
      align: "center",
      width: "100px",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (_a, _b, order) =>
        setSearchQuery(searchQueryFormat({ ...searchQuery, sortBy: "title", sortOrder: order + "ing" })) as any,
    },

    {
      title: "Type",
      render: (_text, record, index) => (
        <Tag key={index} className={`capitalize w-16 text-center font-bold border-0 bg-${rowColor[record?.type]}-600`}>
          {record?.type}
        </Tag>
      ),
      dataIndex: "type", // Add this line
      key: "type",
      align: "center",
      sorter: (_a, _b, order) =>
        setSearchQuery(
          searchQueryFormat({ ...searchQuery, page, limit, sortBy: "type", sortOrder: order + "ing" })
        ) as any,
    },
    {
      title: "Status",
      render: (_text, record, index) => (
        <Tag
          key={index}
          className={`capitalize cursor-pointer w-16 text-center font-bold border-0 ${
            record?.isPending ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={() => update({ ...record, isPending: !record.isPending })}
        >
          {record?.isPending ? "Pending" : "Done"}
        </Tag>
      ),
      dataIndex: "isPending",
      key: "isPending",
      align: "center",
      sorter: (_a, _b, order) =>
        setSearchQuery(
          searchQueryFormat({ ...searchQuery, page, limit, sortBy: "isPending", sortOrder: order + "ing" })
        ) as any,
    },
    {
      title: "Priority",
      render: (_text, record, index) => (
        <div
          key={index}
          className="text-2xl text-amber-500  cursor-pointer"
          onClick={() => update({ ...record, isImportant: !record.isImportant })}
        >
          {record.isImportant ? <IoMdStar className="mx-auto" /> : <IoMdStarOutline className="mx-auto" />}
        </div>
      ),
      dataIndex: "isImportant",
      key: "isImportant",
      align: "center",
      sorter: (_a, _b, order) =>
        setSearchQuery(
          searchQueryFormat({ ...searchQuery, page, limit, sortBy: "isImportant", sortOrder: order + "ing" })
        ) as any,
    },
    {
      title: "Actions",
      render: (_text, record, index) => (
        <div key={index} className="flex gap-3 items-center justify-center">
          <Button
            onClick={() => handleEdit(record)}
            shape="circle"
            type="primary"
            disabled={removePending || updatePending}
            icon={<FaPenAlt />}
          />
          <Button
            disabled={removePending || updatePending}
            onClick={() => handleRemove(record._id)}
            shape="circle"
            danger
            type="primary"
            icon={<FaTrashAlt />}
          />
        </div>
      ),
      align: "center",
    },
  ];

  if (isError) {
    Swal.fire("", (error as any)?.response?.data?.message || "Delete failed", "error");
  }

  return (
    <>
      <span className="bg-green-600"></span>
      <span className="bg-red-600"></span>
      <span className="bg-orange-600"></span>
      <span className="bg-sky-600"></span>
      <span className="bg-fuchsia-600 "></span>
      <span className="bg-violet-600"></span>
      <div className="pt-4 transactions">
        <StyledTable
          className="bg-secondary border-0"
          rowClassName="border-0"
          bordered={false}
          columns={columns}
          dataSource={Array.isArray(data?.data) ? data?.data : []}
          responsive={true}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          pagination={{
            current: page || 1,
            pageSize: limit || 10,
            total: data?.meta?.total,
            onChange: handleTableChange,
            pageSizeOptions: [10, 20, 50],
            showSizeChanger: true,
            responsive: true,
            className: "px-3",
          }}
        />
      </div>
    </>
  );
}

export default TransactionsList;
