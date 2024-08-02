import { Button } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { searchQueryFormat, useSearchQuery } from "../../utils/useSearchQuery";
import { ReloadOutlined } from "@ant-design/icons";

function SecondaryHeader({ total = 0, setIsModalOpen, setIsDrawerOpen, handleClear, queries }) {
  const [searchQuery] = useSearchQuery(queries);

  return (
    <div className="mb-3 flex items-center justify-between gap-3 bg-card  p-3 rounded-md">
      <div className="font-bold"> Total Transactions: {total} </div>
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
}

export default SecondaryHeader;
