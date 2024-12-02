import React, { useState } from "react";
import InventoryTable from "../../components/inventoryPage_Components/InventoryTable";
import ProductForm from "../../components/inventoryPage_Components/ProductForm";
import { Table, Tag, Button, Modal } from "antd";
import "./inventoryPage.scss";

const InventoryPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="main_inventorypage">
      <div>
        <Button type="primary" onClick={showModal} style={{ marginBottom: 20 }}>
          Cadastros
        </Button>
      </div>
      <InventoryTable />
    </div>
  );
};

export default InventoryPage;
