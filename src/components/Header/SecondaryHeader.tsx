import { Button } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { searchQueryFormat, useSearchQuery } from "../../utils/useSearchQuery";
import { ReloadOutlined } from "@ant-design/icons";
import React from "react";

interface Props {
  total: Number;
  setIsModalOpen: (pre: boolean) => boolean;
  setIsDrawerOpen: (pre: boolean) => boolean;
  handleClear: () => void;
  queries: object;
}

const SecondaryHeader: React.FC<Props> = ({ total = 0, setIsModalOpen, setIsDrawerOpen, handleClear, queries }) => {
  const [searchQuery] = useSearchQuery(queries);

  return (
    <div className="mb-3 flex items-center justify-between gap-3 bg-card  p-3 rounded-md">
      <div className="font-bold"> Total Transactions: {total.toString()} </div>
      <div className="flex gap-3">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen((pre) => !pre);
          }}
          icon={<FaPlus />}
        />
        <Button type="" icon={<FaFilter />} onClick={() => setIsDrawerOpen((pre) => !pre)} />
        {Object?.keys(searchQueryFormat(searchQuery)).length > 0 && (
          <Button type="primary" danger icon={<ReloadOutlined />} onClick={handleClear} />
        )}
      </div>
    </div>
  );
};

export default SecondaryHeader;
