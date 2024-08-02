import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { searchQueryFormat, todoQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { Button, Form, Spin } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { ReloadOutlined } from "@ant-design/icons";
import RoutineList from "./RoutineList";
import RoutineForm from "./RoutineForm";

const Routine = () => {
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useSearchQuery(todoQueries);
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({});
  const [editData, setEditData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, isPending } = useQuery({
    //   queryKey: ["todo", searchQuery],
    //   queryFn: () => getAllTodoFn({ ...searchQuery, user: user._id }),
  });

  const handleClear = () => {
    form.resetFields();
    setFormData({});
    setSearchQuery({});
  };
  return (
    <div>
      <Spin spinning={false}>
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

            <RoutineList {...{ isModalOpen, setIsModalOpen, editData, setEditData, data }} />
            {isModalOpen && <RoutineForm {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />}
            {/* <Drawer
            title={<div className="text-end">Filter</div>}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <TodoFilter {...{ form, formData, setFormData }} />
          </Drawer> */}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Routine;
