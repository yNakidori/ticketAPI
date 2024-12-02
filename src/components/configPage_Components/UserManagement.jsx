import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  Button,
  Popconfirm,
  message,
  Tag,
  Select,
  Modal,
} from "antd";
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
  const [groups, setGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);

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

  // Recupera grupos do Firestore em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      const groupsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setGroups(groupsData);
    });
    return () => unsubscribe();
  }, []);

  // Função para gerenciar grupos do usuário
  const handleManageGroup = (user) => {
    setSelectedUser(user);
    setSelectedGroups(user.groups || []);
    setIsModalVisible(true);
  };

  // Função para salvar grupos do usuário
  const handleSaveGroups = async () => {
    try {
      await updateDoc(doc(db, "users", selectedUser.id), {
        groups: selectedGroups,
      });
      message.success("Grupos atualizados com sucesso!");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar grupos:", error);
      message.error("Erro ao atualizar grupos.");
    }
  };

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
      <div className="list-container">
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
                    <p>
                      Groups:{" "}
                      {user.groups && user.groups.length > 0
                        ? user.groups.join(", ")
                        : "None"}
                    </p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>

      {/* Modal para gerenciar grupos */}
      <Modal
        title={`Manage Groups for ${selectedUser?.name}`}
        visible={isModalVisible}
        onOk={handleSaveGroups}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Select
          mode="multiple"
          value={selectedGroups}
          onChange={(value) => setSelectedGroups(value)}
          style={{ width: "100%" }}
          placeholder="Select groups"
        >
          {groups.map((group) => (
            <Select.Option key={group.id} value={group.name}>
              {group.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </Card>
  );
};

export default UserManagement;
