import { Button, Spin, Table, TableColumnsType } from "antd";
import userRole, { authAccess } from "../../utils/userRole";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserModalForm from "./UserModalForm";
import { useAppSelector } from "../../redux/store";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { IUser } from "./UsersInterface";

// GraphQL Queries and Mutations
const ALL_USERS = gql(`
  query UsersList($pagination: PaginationInput, $query: UserQuery) {
    users(pagination: $pagination, query: $query) {
      meta {
        page
        limit
        total
      }
      data {
        _id
        name
        email
        role
      }
    }
  }
`);

const REMOVE_USER = gql(`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      _id
    }
  }
`);

const initialColumns: TableColumnsType<IUser> = [
  {
    title: "No.",
    render: (_, __, index) => index + 1,
    align: "center",
    width: "100px",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    render: (_, user) => <span className="capitalize"> {user.role} </span>,
    align: "center",
    key: "role",
  },
];

const UserList: React.FC = () => {
  // Redux
  const { isLogin, user } = useAppSelector((state) => state.auth);

  // States
  const [columns, setColumns] = useState<TableColumnsType<IUser>>(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<IUser | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // GraphQL Hooks
  const {
    loading,
    data: allUsers,
    refetch,
  } = useQuery(ALL_USERS, { variables: { pagination: { page, limit }, query: {} } });
  const [deleteUser] = useMutation(REMOVE_USER, { refetchQueries: ["UsersList"] });

  const { data, meta } = allUsers?.users || {};

  // Handlers
  const editHandler = (record: IUser) => {
    setEditData(record);
    setIsModalOpen(true);
  };

  const deleteHandler = (deleteUserId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser({ variables: { deleteUserId } });
          toast.success("User deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete user!");
        }
      }
    });
  };

  const actionColumn: TableColumnsType<IUser> = [
    {
      title: "Action",
      render: (_: string, record: IUser) => (
        <>
          <Button type="primary" onClick={() => editHandler(record)}>
            <EditOutlined />
          </Button>
          <Button className="ml-2" type="primary" danger onClick={() => deleteHandler(record._id)}>
            <DeleteOutlined />
          </Button>
        </>
      ),
      align: "center",
      width: "150px",
    },
  ];

  useEffect(() => {
    if (isLogin && authAccess(userRole.admin).includes(user?.role)) {
      setColumns([...initialColumns, ...actionColumn]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  const handleTableChange = (current: number, size?: number) => {
    if (current) setPage(current);
    if (size) setLimit(size);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-2">
        <h1 className="items-center select-none cursor-pointer" onDoubleClick={() => refetch()}>
          User List
        </h1>
        <button className="font-semibold ms-auto" onClick={() => setIsModalOpen(true)}>
          Create User
        </button>
      </div>
      <Spin spinning={loading}>
        <div>
          <Table<IUser>
            dataSource={data || []}
            columns={columns}
            rowKey={(record) => record._id}
            pagination={
              10 >= Number(meta?.total)
                ? false
                : {
                    current: page,
                    pageSize: limit,
                    total: meta?.total,
                    onChange: handleTableChange,
                    showSizeChanger: true, 
                    pageSizeOptions:[10, 25, 50]
                  }
            }
          />
        </div>
      </Spin>
      {isModalOpen && (
        <UserModalForm
          {...{ isModalOpen, editData, setEditData, setIsModalOpen, mode: Boolean(editData) ? "edit" : "create" }}
        />
      )}
    </div>
  );
};

export default UserList;
