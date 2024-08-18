import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoFn, updateTodoFn } from "../../transtackQuery/todoApis";
import { Button, Table } from "antd";
import { FaPenAlt, FaThumbsDown, FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";
import { searchQueryFormat, todoQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { serialNumber } from "../../utils/helpers";
import { ITodo } from "./TodoInterface";

interface TodoListProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<Partial<ITodo>>>;
  data: any;
}

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

const TodoList: React.FC<TodoListProps> = ({ setIsModalOpen, setEditData, data }) => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useSearchQuery(todoQueries);

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: updateTodoFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const { limit, page } = searchQuery;

  const {
    mutate: remove,
    isError,
    error,
    isPending: removePending,
  } = useMutation({
    mutationKey: ["removeTodo"],
    mutationFn: deleteTodoFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
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
      // sorter: () => 1,
      sorter: (a, b, order) =>
        setSearchQuery(searchQueryFormat({ ...searchQuery, page, limit, sortBy: "title", sortOrder: order + "ing" })),
    },

    {
      title: "Status",
      render: (text, record, index) => (
        <Button
          key={index}
          className={` cursor-pointer select-none border-0 min-w-24 font-normal text-center !shadow-none text-xs`}
          type="primary"
          danger={!record?.isDone}
          onClick={() => update({ _id: record?._id, isDone: !record?.isDone })}
          loading={updatePending}
          icon={record?.isDone ? <FaThumbsUp /> : <FaThumbsDown />}
        >
          {record?.isDone ? "Done" : "Pending"}
        </Button>
      ),
      align: "center",
      width: 100,
      sorter: (a, b, order) =>
        setSearchQuery(searchQueryFormat({ ...searchQuery, page, limit, sortBy: "isDone", sortOrder: order + "ing" })),
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
      <div className="mt-4 todo">
        {Array.isArray(data?.data) && (
          <StyledTable
            className="bg-secondary border-0"
            rowClassName={(record) => `border-0 ${record.isDone && "line-through"}`}
            bordered={false}
            columns={columns}
            dataSource={data?.data}
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
        )}
      </div>
    </>
  );
};

export default TodoList;

