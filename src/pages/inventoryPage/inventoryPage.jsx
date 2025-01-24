import React, { useEffect, useState } from "react";
import CollapsibleTable from "../../components/inventoryPage_Components/CollapsibleTable";
import AuxCollapsibleTable from "../../components/inventoryPage_Components/AuxCollapsibleTable";
import SideBar from "../../assets/Sidebar";
import ProductForm from "../../components/inventoryPage_Components/ProductForm";
import AuxForm from "../../components/inventoryPage_Components/AuxForm";
import ProductsPage from "../../components/inventoryPage_Components/ProductsPage";
import AuxPage from "../../components/inventoryPage_Components/AuxPage";
import { Button, Modal } from "antd";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./inventoryPage.scss";

const InventoryPage = () => {
  const [user, setUser] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [formType, setFormType] = useState("main");

  const fetchUserData = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);

          const allowedGroups = ["Processos", "Gerência"];
          const userGroups = userData.groups || [];
          setHasPermission(
            userGroups.some((group) => allowedGroups.includes(group))
          );
        }
      }
    } catch (error) {
      console.error("Erro ao carregar os dados do usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleProductsPage = () => {
    setShowProducts((prev) => !prev);
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  return (
    <>
      <SideBar />
      {hasPermission ? (
        <div className="main_inventorypage">
          <div className="inventory-controls">
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginBottom: 5, marginRight: 20, marginTop: 25 }}
            >
              Cadastros
            </Button>
            <Button
              type="primary"
              style={{ marginBottom: 5, marginTop: 25 }}
              onClick={toggleProductsPage}
            >
              {showProducts ? "Voltar" : "Estoque"}
            </Button>
          </div>

          {/* Renderiza tabela ou lista de produtos */}
          <div className="inventory-content">
            <div className="table-container">
              {showProducts ? <ProductsPage /> : <CollapsibleTable />}
            </div>
            <div className="table-container">
              {showProducts ? <AuxPage /> : <AuxCollapsibleTable />}
            </div>
          </div>

          {/* Modal para o formulário */}
          <Modal
            title="Cadastro de Produto"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ marginBottom: 16 }}>
              <Button
                type={formType === "main" ? "primary" : "default"}
                onClick={() => handleFormTypeChange("main")}
                style={{ marginRight: 10 }}
              >
                Estoque Principal
              </Button>
              <Button
                type={formType === "aux" ? "primary" : "default"}
                onClick={() => handleFormTypeChange("aux")}
              >
                Estoque Auxiliar
              </Button>
            </div>

            {/* Renderiza o formulário com base no tipo selecionado */}
            {formType === "main" ? (
              <ProductForm onSuccess={handleCancel} />
            ) : (
              <AuxForm onSuccess={handleCancel} />
            )}
          </Modal>
        </div>
      ) : (
        <div className="no-permission">
          <p>
            Você não tem permissão para acessar o inventário. Utilize outras
            funcionalidades disponíveis.
          </p>
        </div>
      )}
    </>
  );
};

export default InventoryPage;
