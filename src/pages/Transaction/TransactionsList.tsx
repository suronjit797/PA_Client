import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransactionFn } from "../../transtackQuery/transactionApis";
import { Table, TableProps, Tag } from "antd";
import styled from "styled-components";
import Swal from "sweetalert2";
import { searchQueryFormat, transactionQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { serialNumber } from "../../utils/helpers";
import React from "react";
import { ITransaction } from "./TransactionsInterface";

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
  data: any;
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

  // const columns: ColumnsType<ITransaction> = [
  const columns: TableProps<ITransaction>["columns"] = [
    {
      title: "No.",
      render: (text, record, index) => <span key={index}>{serialNumber(Number(page), Number(limit), index)}</span>,
      dataIndex: "index", // Add this line
      align: "center",
      width: "100px",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      render: (text, record, index) => (
        <Tag key={index} className={`capitalize w-16 text-center font-bold border-0 bg-${rowColor[record?.type]}-600`}>
          {record?.type}
        </Tag>
      ),
      dataIndex: "type", // Add this line
      key: "type",
      align: "center",
    },
    // ... other columns
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
        {Array.isArray(data?.data) && (
          <StyledTable
            className="bg-secondary border-0"
            rowClassName="border-0"
            bordered={false}
            dataSource={data?.data}
            columns={columns}
            pagination={{
              current: page ? +page : 1,
              pageSize: limit ? +limit : 10,
              total: data?.meta?.total,
              onChange: handleTableChange,
              pageSizeOptions: [10, 20, 50],
              showSizeChanger: true,
              responsive: true,
              className: "px-3",
            }}
          />
        )}
      </div>
    </>
  );
}

export default TransactionsList;
