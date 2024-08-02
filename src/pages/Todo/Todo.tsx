import { useState } from "react";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useSelector } from "react-redux";
import { Button, Spin, Drawer, Form } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllTodoFn } from "../../transtackQuery/todoApis";
import { searchQueryFormat, todoQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { ReloadOutlined } from "@ant-design/icons";

function Todo() {
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useSearchQuery(todoQueries);
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({});
  const [editData, setEditData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["todo", searchQuery],
    queryFn: () => getAllTodoFn({ ...searchQuery, user: user._id }),
    
  });

  const handleClear = () => {
    form.resetFields();
    setFormData({});
    setSearchQuery({});
  };

  return (
    <Spin spinning={isPending}>
      <div className="">
        <div className="col-span-4">
          <div className="mb-3 flex items-center justify-between gap-3 bg-card  p-3 rounded-md">
            <div className="font-bold"> Total Todo: {data?.meta?.total || 0} </div>
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

          <TodoList {...{ isModalOpen, setIsModalOpen, editData, setEditData, data }} />
          {isModalOpen && <TodoForm {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />}
          <Drawer
            title={<div className="text-end">Filter</div>}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <TodoFilter {...{ form, formData, setFormData }} />
          </Drawer>
        </div>
      </div>
    </Spin>
  );
}

export default Todo;
