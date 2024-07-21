import { Button } from "antd";
import TransactionSideBar from "./TransactionSideBar";
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import TransactionsList from "./TransactionsList";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-5 gap-8 my-4">
        <div className="">
          <TransactionSideBar />
        </div>
        <div className="col-span-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold"> Transactions </h4>
            <Button onClick={() => setIsModalOpen(!isModalOpen)} type="primary">
              {" "}
              Create{" "}
            </Button>
          </div>
          <hr className="my-3 border-purple-700" />
          <TransactionsList {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />
          {isModalOpen && <TransactionForm {...{ isModalOpen, setIsModalOpen, editData, setEditData }} />}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
