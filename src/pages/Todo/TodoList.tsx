import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoFn, updateTodoFn } from "../../transtackQuery/todoApis";
import { Button, Table, TableColumnsType } from "antd";
import { FaPenAlt, FaThumbsDown, FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";
import { searchQueryFormat, todoQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { serialNumber } from "../../utils/helpers";
import { ITodo } from "./TodoInterface";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

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
` as any;

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

  const handleEdit = (data: ITodo) => {
    setEditData(data);
    setIsModalOpen(true);
  };
  const handleRemove = (id: string) => {
    remove(id);
    // setEditData(data)
  };

  const handleTableChange = (page: number, limit: number) => {
    setSearchQuery(searchQueryFormat({ ...searchQuery, page, limit }));
  };

  const columns: TableColumnsType<ITodo> = [
    {
      title: "No.",
      render: (_text, _record, index) => (
        <span key={index}>{serialNumber(Number(data?.meta?.page || 1), Number(data?.meta?.limit || 10), index)}</span>
      ),
      align: "center",
      width: "100px",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (_a, _b, order, c) => {
        console.log({ _a, _b, order, c });
        return setSearchQuery(
          searchQueryFormat({ ...searchQuery, page, limit, sortBy: "title", sortOrder: order + "ing" })
        ) as any;
      },
    },

    {
      title: "Status",
      render: (_text, record, index) => (
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
      sorter: (_a, _b, order) =>
        setSearchQuery(
          searchQueryFormat({ ...searchQuery, page, limit, sortBy: "isDone", sortOrder: order + "ing" })
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
    Swal.fire("", (error as any)?.response?.data?.message || "Delete failed", "error");
  }

  return (
    <>
      <div className="mt-4 todo">
        {Array.isArray(data?.data) && (
          <StyledTable
            className="bg-secondary border-0"
            rowClassName={(record: ITodo) => `border-0 ${record.isDone && "line-through"}`}
            bordered={false}
            columns={columns as any}
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
