import React, { useState } from "react";
import InventoryTable from "../../components/inventoryPage_Components/InventoryTable";
import MainLayout from "../../components/mainLayout";
import ProductForm from "../../components/inventoryPage_Components/ProductForm";
import ProductsPage from "../../components/inventoryPage_Components/ProductsPage";
import { Button, Modal } from "antd";
import "./inventoryPage.scss";

const InventoryPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleProductsPage = () => {
    setShowProducts((prev) => !prev);
  };

  return (
    <MainLayout>
      <div className="main_inventorypage">
        <div>
          <Button
            type="primary"
            onClick={showModal}
            style={{ marginBottom: 20 }}
          >
            Iniciar movimento
          </Button>
          <Button
            type="primary"
            onClick={showModal}
            style={{ marginBottom: 20 }}
          >
            Cadastros
          </Button>
          <Button
            type="primary"
            style={{ marginBottom: 20 }}
            onClick={toggleProductsPage}
          >
            {showProducts ? "Voltar" : "Itens"}
          </Button>
        </div>

        {/* Renderiza tabela ou lista de produtos */}
        {showProducts ? <ProductsPage /> : <InventoryTable />}

        {/* Modal para o formulário */}
        <Modal
          title="Cadastro de Produto"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <ProductForm onSuccess={handleCancel} />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default InventoryPage;
