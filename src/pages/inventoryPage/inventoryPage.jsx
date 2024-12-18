import React, { useEffect, useState } from "react";
import CollapsibleTable from "../../components/inventoryPage_Components/CollapsibleTable";
import SideBar from "../../assets/Sidebar";
import ProductForm from "../../components/inventoryPage_Components/ProductForm";
import ProductsPage from "../../components/inventoryPage_Components/ProductsPage";
import { Button, Modal } from "antd";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./inventoryPage.scss";

const InventoryPage = () => {
  const [user, setUser] = useState(null); // Dados do usuário logado
  const [hasPermission, setHasPermission] = useState(false); // Permissão do grupo
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

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

  return (
    <>
      <SideBar />
      {hasPermission ? (
        <div className="main_inventorypage">
          <div className="inventory-controls">
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginBottom: 20, marginRight: 20 }}
            >
              Cadastros
            </Button>
            <Button
              type="primary"
              style={{ marginBottom: 20 }}
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
          </div>

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
