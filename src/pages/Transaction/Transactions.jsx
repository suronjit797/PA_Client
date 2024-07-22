import { Button } from "antd";
import TransactionSideBar from "./TransactionSideBar";
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import TransactionsList from "./TransactionsList";
import Summary from "./Summary";
import { useSelector } from "react-redux";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const { isHeaderModalOpen } = useSelector((state) => state.helper);

  return (
    <div className="">
      {isHeaderModalOpen && (
        <div className="">
          <TransactionSideBar />
        </div>
      )}
      <div className="col-span-4">
        {/* <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold"> Transactions </h4>
          <Button onClick={() => setIsModalOpen(!isModalOpen)} type="primary">
            Create
          </Button>
        </div> */}
        
        <Summary />
        <TransactionsList {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />
        {isModalOpen && <TransactionForm {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />}
      </div>
    </div>
  );
}

export default Transactions;
