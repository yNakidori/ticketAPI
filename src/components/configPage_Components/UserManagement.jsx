import React, { useEffect, useState } from "react";
import { Card, List, Button, Popconfirm, message, Tag } from "antd";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./UserManagement.scss";

const UserManagement = ({ onAddUserClick }) => {
  const [users, setUsers] = useState([]);

  // Recupera usuários do Firestore em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  // Função para desativar usuário
  const handleDeactivateUser = async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { active: false });
      message.success("Usuário desativado com sucesso!");
    } catch (error) {
      console.error("Erro ao desativar usuário:", error);
      message.error("Erro ao desativar usuário.");
    }
  };

  // Função para excluir usuário
  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      message.success("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      message.error("Erro ao excluir usuário.");
    }
  };

  // Função para gerenciar grupos do usuário (exemplo básico)
  const handleManageGroup = (user) => {
    message.info(`Gerenciar grupos para: ${user.name}`);
    // Implementar lógica para alterar grupos
  };

  return (
    <Card
      bordered={false}
      title={<h6 className="font-semibold m-0">User Management</h6>}
      className="user-management-card"
      extra={
        <Button type="primary" onClick={onAddUserClick}>
          Add User
        </Button>
      }
    >
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleManageGroup(user)}>
                Manage Group
              </Button>,
              <Popconfirm
                title="Are you sure you want to deactivate this user?"
                onConfirm={() => handleDeactivateUser(user.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  Deactivate
                </Button>
              </Popconfirm>,
              <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={() => handleDeleteUser(user.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={`${user.name} (${user.email})`}
              description={
                <>
                  <p>Phone: {user.phone}</p>
                  <p>City: {user.city}</p>
                  <Tag color={user.active ? "green" : "red"}>
                    {user.active ? "Active" : "Inactive"}
                  </Tag>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UserManagement;
