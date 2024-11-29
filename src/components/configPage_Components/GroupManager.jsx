import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import AddGroupModal from "./AddGroupModal";
import GroupManagement from "./GroupManagement";

const GroupManager = () => {
  const [groups, setGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchGroups = async () => {
    const querySnapshot = await getDocs(collection(db, "groups"));
    const groupList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGroups(groupList);
  };

  const handleAddGroupClick = () => {
    setIsModalVisible(true);
  };

  const handleAddGroupSuccess = () => {
    setIsModalVisible(false);
    fetchGroups(); // Atualizar lista de grupos
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteDoc(doc(db, "groups", groupId));
      fetchGroups();
    } catch (error) {
      console.error("Erro ao deletar grupo:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <>
      <GroupManagement
        groups={groups}
        onAddGroupClick={handleAddGroupClick}
        onEditGroup={(group) => console.log("Editar grupo:", group)}
        onDeleteGroup={handleDeleteGroup}
      />
      <AddGroupModal
        visible={isModalVisible}
        onOk={handleAddGroupSuccess}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default GroupManager;
