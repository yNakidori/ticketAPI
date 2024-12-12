import React, { useEffect, useState } from "react";
import CollapsibleTable from "../../components/inventoryPage_Components/CollapsibleTable";
import MainLayout from "../../components/mainLayout";
import ProductForm from "../../components/inventoryPage_Components/ProductForm";
import ProductsPage from "../../components/inventoryPage_Components/ProductsPage";
import { Button, Modal } from "antd";
import "./inventoryPage.scss";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

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

          // Verifica se o usuário tem permissão
          const allowedGroups = ["Processos", "Gerência"]; // Grupos permitidos
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
    <MainLayout>
      {hasPermission ? (
        <div className="main_inventorypage">
          <div>
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
          {showProducts ? <ProductsPage /> : <CollapsibleTable />}

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
        <div>
          <p>
            Você não tem permissão para acessar o inventário. Utilize outras
            funcionalidades disponíveis.
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default InventoryPage;
