import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransactionFn } from "../../transtackQuery/transactionApis";
import { Button, Table, Tag } from "antd";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { searchQueryFormat, transactionQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { serialNumber } from "../../utils/helpers";

const rowColor = {
  income: "green",
  expense: "red",
  give: "orange",
  take: "violet",
  save: "sky",
  withdraw: "fuchsia",
};

const StyledTable = styled(Table)`
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

function TransactionsList({ setIsModalOpen, setEditData, data }) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useSearchQuery(transactionQueries);

  const { limit, page } = searchQuery;

  const {
    mutate: remove,
    isError,
    error,
    isPending: removePending,
  } = useMutation({
    mutationKey: "removeTransaction",
    mutationFn: deleteTransactionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
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

  // todo: have to make dynamically filter
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
        <Tag key={index} className={`capitalize w-16 text-center font-bold border-0 bg-${rowColor[record?.type]}-600`}>
          {record?.type}
        </Tag>
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
          className={`${
            record?.isPending ? "bg-yellow-400 text-yellow-800" : "bg-teal-600"
          } border-0 w-16 text-center font-bold`}
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
            // rowClassName={(item) => {
            //   return `bg-${rowColor[item?.type] || "green"}-600 `;
            // }}
            rowClassName="border-0"
            bordered={false}
            columns={columns}
            dataSource={data?.data}
            responsive={true}
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
        )}
      </div>
    </>
  );
}

export default TransactionsList;

TransactionsList.propTypes = {
  setIsModalOpen: PropTypes.func,
  setEditData: PropTypes.func,
  queryParams: PropTypes.object,
  data: PropTypes.array,
  setQueryParams: PropTypes.func,
};
