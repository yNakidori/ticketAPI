import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/configPage_Components/ProfileHeader";
import UserManagement from "../../components/configPage_Components/UserManagement";
import GroupManagement from "../../components/configPage_Components/GroupManagement";
import AddUserModal from "../../components/configPage_Components/AddUserModal";
import AddGroupModal from "../../components/configPage_Components/AddGroupModal";
import profilavatar from "../../assets/images/face-1.jpg";
import UserEdit from "../../components/configPage_Components/UserEdit";
import SupportPointEdit from "../../components/configPage_Components/SupportPointsEdit";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { message, Row, Col } from "antd";
import "./configPage.scss";
import SideBar from "../../assets/Sidebar";

const ConfigPage = () => {
  const [user, setUser] = useState(null); // Dados do usuário logado
  const [hasPermission, setHasPermission] = useState(false); // Permissão do grupo
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [isUserModalVisible, setIsUserModalVisible] = useState(false); // Modal de usuários
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false); // Modal de grupos

  // Funções para gerenciar usuários e grupos
  const handleAddUser = () => {
    message.success("Usuário adicionado com sucesso!");
    setIsUserModalVisible(false);
  };

  const handleAddGroup = () => {
    message.success("Grupo adicionado com sucesso!");
    setIsGroupModalVisible(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);

            setHasPermission(userData.groups?.includes("TI"));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>; // Exibe um loading enquanto os dados são carregados
  }

  return (
    <div className="main-content">
      <SideBar />
      {/* Cabeçalho do perfil */}
      <ProfileHeader
        imageURL={profilavatar}
        fullName={user ? user.name : "Usuário"}
      />

      {/* Componente de chat 
      <div className="chat-component">
        <ChatComponent />
      </div>
      */}

      {/* Renderiza os elementos da página */}
      <Row gutter={[24, 0]} className="equal-height-row">
        {hasPermission && (
          <>
            {/* Gerenciamento de usuários */}
            <Col span={24} md={12} className="mb-24 equal-height-col">
              <UserManagement
                users={user?.users || []}
                onAddUserClick={() => setIsUserModalVisible(true)}
              />
            </Col>

            {/* Gerenciamento de grupos */}
            <Col span={24} md={12} className="mb-24 equal-height-col">
              <GroupManagement
                groups={user?.groups || []}
                onAddGroupClick={() => setIsGroupModalVisible(true)}
              />
            </Col>

            {/* Modais */}
            <AddUserModal
              visible={isUserModalVisible}
              onOk={handleAddUser}
              onCancel={() => setIsUserModalVisible(false)}
            />
            <AddGroupModal
              visible={isGroupModalVisible}
              onOk={handleAddGroup}
              onCancel={() => setIsGroupModalVisible(false)}
            />
          </>
        )}

        {!hasPermission && (
          <Col span={24}>
            <p>
              Você não tem permissão para acessar as configurações de usuários
              ou grupos. Utilize outras funcionalidades disponíveis.
            </p>
          </Col>
        )}
      </Row>

      {/* Editar usuários e pontos de apoio */}
      <Row gutter={[24, 0]} className="equal-height-row">
        <Col span={24} md={12} className="mb-24 equal-height-col">
          <UserEdit />
        </Col>
        {hasPermission && (
          <Col span={24} md={12} className="mb-24 equal-height-col">
            <SupportPointEdit />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ConfigPage;
