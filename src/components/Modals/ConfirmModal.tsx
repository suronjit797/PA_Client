import { Modal } from "antd";
import React from "react";

interface IProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  title?: string;
}

const ConfirmModal: React.FC<IProps> = ({ title, isModalOpen, handleCancel, handleOk }) => {
  return (
    <Modal centered title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ConfirmModal;
