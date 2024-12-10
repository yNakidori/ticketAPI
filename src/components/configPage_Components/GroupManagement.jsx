import React, { useEffect, useState } from "react";
import { Card, List, Button, Popconfirm, Modal, message } from "antd";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import EditGroupModal from "./EditGroupModal";
import "./GroupManagement.scss";

const GroupManagement = ({ onAddGroupClick }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Recupera grupos do Firestore em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      const groupsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupsData);
    });
    return () => unsubscribe();
  }, []);

  // Função para deletar grupo
  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteDoc(doc(db, "groups", groupId));
      message.success("Group deleted successfully!");
    } catch (error) {
      console.error("Error deleting group:", error);
      message.error("Failed to delete group.");
    }
  };

  // Função para editar grupo (exemplo básico)
  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsEditModalVisible(true);
  };

  // Fechar modal de edição
  const closeEditModal = () => {
    setSelectedGroup(null);
    setIsEditModalVisible(false);
  };

  return (
    <Card
      bordered={false}
      title={<h6 className="font-semibold m-0">Grupos</h6>}
      className="group-management-card"
      extra={
        <Button type="primary" onClick={onAddGroupClick}>
          Criar grupo
        </Button>
      }
    >
      <div className="list-container">
        <List
          dataSource={groups}
          renderItem={(group) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => handleEditGroup(group)}>
                  Editar
                </Button>,
                <Popconfirm
                  title="Realmente gostaria de deletar esse grupo?"
                  onConfirm={() => handleDeleteGroup(group.id)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button type="link" danger>
                    Deletar
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={group.name}
                description={
                  <>
                    <p>{group.description}</p>
                    <p>Permissions: {group.permissions.join(", ")}</p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>

      {/* Modal de edição de grupo */}
      {selectedGroup && (
        <EditGroupModal
          visible={isEditModalVisible}
          group={selectedGroup}
          onCancel={closeEditModal}
          onSave={closeEditModal}
        />
      )}
    </Card>
  );
};

export default GroupManagement;
