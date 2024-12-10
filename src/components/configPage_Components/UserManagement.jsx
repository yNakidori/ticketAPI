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
  const [supportPoints, setSupportPoints] = useState([]);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isSupportPointModalVisible, setIsSupportPointModalVisible] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedSupportPoint, setSelectedSupportPoint] = useState([]);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    const unsubscribeGroups = onSnapshot(
      collection(db, "groups"),
      (snapshot) => {
        const groupsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setGroups(groupsData);
      }
    );

    const unsubscribeSupportPoints = onSnapshot(
      collection(db, "supportPoints"),
      (snapshot) => {
        const supportPointsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          cityname: doc.data().cityname,
          abbreviation: doc.data().abbreviation,
        }));
        setSupportPoints(supportPointsData);
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeGroups();
      unsubscribeSupportPoints();
    };
  }, []);

  const handleManageGroup = (user) => {
    setSelectedUser(user);
    setSelectedGroups(user.groups || []);
    setIsGroupModalVisible(true);
  };

  const handleManageSupportPoint = (user) => {
    setSelectedUser(user);
    setSelectedSupportPoint(user.supportPoints || []);
    setIsSupportPointModalVisible(true);
  };

  const handleSaveGroups = async () => {
    try {
      await updateDoc(doc(db, "users", selectedUser.id), {
        groups: selectedGroups,
      });
      message.success("Grupos atualizados com sucesso!");
      setIsGroupModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar grupos:", error);
      message.error("Erro ao atualizar grupos.");
    }
  };

  const handleSaveSupportPoint = async () => {
    try {
      await updateDoc(doc(db, "users", selectedUser.id), {
        supportPoints: selectedSupportPoint,
      });
      message.success("Ponto de apoio atualizado com sucesso!");
      setIsSupportPointModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar ponto de apoio:", error);
      message.error("Erro ao atualizar ponto de apoio.");
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { active: false });
      message.success("Usuário desativado com sucesso!");
    } catch (error) {
      console.error("Erro ao desativar usuário:", error);
      message.error("Erro ao desativar usuário.");
    }
  };

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
      title={<h6 className="font-semibold m-0">Usuarios</h6>}
      className="user-management-card"
      extra={
        <Button type="primary" onClick={onAddUserClick}>
          Adicionar usuarios
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
                  Alterar grupos
                </Button>,
                <Button
                  type="link"
                  onClick={() => handleManageSupportPoint(user)}
                >
                  Alterar ponto de apoio
                </Button>,
                <Popconfirm
                  title="Realmente deseja desativar esse usuario?"
                  onConfirm={() => handleDeactivateUser(user.id)}
                  okText="Sim"
                  cancelText="Não, quero voltar"
                >
                  <Button type="link" danger>
                    Desativar
                  </Button>
                </Popconfirm>,
                <Popconfirm
                  title="Realmente deseja cancelar esse usuario?"
                  onConfirm={() => handleDeleteUser(user.id)}
                  okText="Sim"
                  cancelText="Não, quero voltar"
                >
                  <Button type="link" danger>
                    Deletar
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

      <Modal
        title={`Altere o grupo de ${selectedUser?.name}`}
        visible={isGroupModalVisible}
        onOk={handleSaveGroups}
        onCancel={() => setIsGroupModalVisible(false)}
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

      <Modal
        title={`Altere o ponto de aoio de ${selectedUser?.name}`}
        visible={isSupportPointModalVisible}
        onOk={handleSaveSupportPoint}
        onCancel={() => setIsSupportPointModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Select
          value={selectedSupportPoint}
          onChange={(value) => setSelectedSupportPoint(value)}
          style={{ width: "100%" }}
          placeholder="Select support point"
        >
          {supportPoints.map((point) => (
            <Select.Option key={point.id} value={point.abbreviation}>
              {point.cityname}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </Card>
  );
};

export default UserManagement;
