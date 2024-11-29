import React, { useEffect, useState } from "react";
import { Card, List, Button, Popconfirm, message } from "antd";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
//import "./GroupManagement.scss";

const GroupManagement = ({ onAddGroupClick }) => {
  const [groups, setGroups] = useState([]);

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
    message.info(`Editing group: ${group.name}`);
    // Implemente a lógica de edição do grupo aqui
  };

  return (
    <Card
      bordered={false}
      title={<h6 className="font-semibold m-0">Group Management</h6>}
      className="group-management-card"
      extra={
        <Button type="primary" onClick={onAddGroupClick}>
          Add Group
        </Button>
      }
    >
      <List
        dataSource={groups}
        renderItem={(group) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEditGroup(group)}>
                Edit
              </Button>,
              <Popconfirm
                title="Are you sure you want to delete this group?"
                onConfirm={() => handleDeleteGroup(group.id)}
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
    </Card>
  );
};

export default GroupManagement;
