import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTransactionFn, getAllTransactionFn } from "../../transtackQuery/transactionApis";
import { Button, Spin, Table, Tag } from "antd";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { searchQueryFormat, transactionQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { serialNumber } from "../../utils/helpers";
import { useSelector } from "react-redux";

const rowColor = {
  income: "green",
  expense: "red",
  give: "orange",
  take: "violet",
};

const StyledTable = styled(Table)`
  .ant-table-thead th.ant-table-cell {
    background-color: rgb(243 243 243 / 98%);
  }
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
`;

function TransactionsList({ setIsModalOpen, setEditData }) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useSearchQuery(transactionQueries);
  const { user } = useSelector((state) => state.auth);

  const { limit, page } = searchQuery;

  const { data, isPending } = useQuery({
    queryKey: ["Transactions", searchQuery],
    queryFn: () => getAllTransactionFn({ ...searchQuery, user: user._id }),
  });

  const {
    mutate: remove,
    isError,
    error,
    isPending: removePending,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: deleteTransactionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Transactions"] });
    },
  });

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };
  const handleRemove = (id) => {
    remove(id);
    // setEditData(data)
  };

  const handleTableChange = (page, limit) => {
    setSearchQuery(searchQueryFormat({ ...searchQuery, page, limit }));
  };

  const columns = [
    {
      title: "No.",
      render: (text, record, index) => <span key={index}>{serialNumber(page, limit, index)}</span>,
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
        <span key={index} className={`capitalize  text-${rowColor[record?.type]}-600`}>
          {record?.type}
        </span>
      ),
      key: "type",
      align: "center",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },

    {
      title: "Status",
      render: (text, record, index) => (
        <Tag
          key={index}
          className={`${record?.isPending ? "bg-red-400" : "bg-green-400"} text-white w-16 text-center font-bold`}
        >
          {record?.isPending ? "Pending" : "Done"}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Actions",
      render: (text, record, index) => (
        <div key={index} className="flex gap-3 items-center justify-center">
          <Button onClick={() => handleEdit(record)} shape="circle" type="primary" icon={<FaPenAlt />} />
          <Button
            disabled={removePending}
            onClick={() => handleRemove(record._id)}
            shape="circle"
            danger
            type="primary"
            icon={<FaTrashAlt />}
          />
        </div>
      ),
      align: "center",
      width: 150,
    },
  ];

  if (isError) {
    Swal.fire("", error.response?.data?.message || "Delete failed", "error");
  }

  return (
    <Spin spinning={isPending}>
      <span className="text-green-600 bg-green-100 bg-"></span>
      <span className="text-red-600 bg-red-100 bg-"></span>
      <span className="text-orange-600 bg-orange-100 bg-"></span>
      <span className="text-violet-600 bg-violet-100 bg-"></span>
      <div className="pt-4">
        {Array.isArray(data?.data) && (
          <StyledTable
            rowClassName={(item) => {
              return `bg-${rowColor[item?.type] || "green"}-100 `;
            }}
            columns={columns}
            dataSource={data?.data}
            pagination={{
              current: page || 1,
              pageSize: limit || 10,
              total: data?.meta?.total,
              onChange: handleTableChange,
              pageSizeOptions: [10, 20, 50],
              showSizeChanger: true,
              responsive: true,
            }}
          />
        )}
      </div>
    </Spin>
  );
}

export default TransactionsList;

TransactionsList.propTypes = {
  setIsModalOpen: PropTypes.func,
  setEditData: PropTypes.func,
  queryParams: PropTypes.object,
  setQueryParams: PropTypes.func,
};
