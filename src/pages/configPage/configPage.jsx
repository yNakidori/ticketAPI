import React, { useState } from "react";
import MainLayout from "../../components/mainLayout";
import ProfileHeader from "../../components/configPage_Components/ProfileHeader";
import UserManagement from "../../components/configPage_Components/UserManagement";
import GroupManagement from "../../components/configPage_Components/GroupManagement";
import AddUserModal from "../../components/configPage_Components/AddUserModal";
import AddGroupModal from "../../components/configPage_Components/AddGroupModal";
import profilavatar from "../../assets/images/face-1.jpg";
import UserEdit from "../../components/configPage_Components/UserEdit";
import ChatComponent from "../../components/chatArea_Component/chatComponent";
import "./configPage.scss";
import { message, Row, Col } from "antd";

const ConfigPage = () => {
  const [imageURL, setImageURL] = useState(profilavatar);
  const [formData] = useState({
    fullName: "Sarah Emily Jacob",
  });

  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "" });
    setIsUserModalVisible(false);
    message.success("User added successfully");
  };

  const handleAddGroup = () => {
    setGroups([...groups, newGroup]);
    setNewGroup({ name: "", description: "" });
    setIsGroupModalVisible(false);
    message.success("Group added successfully");
  };

  return (
    <MainLayout>
      <ProfileHeader imageURL={imageURL} fullName={formData.fullName} />
      <Row gutter={[24, 0]} className="equal-height-row">
        <Col span={24} md={12} className="mb-24 equal-height-col">
          <UserManagement
            users={users}
            onAddUserClick={() => setIsUserModalVisible(true)}
          />
        </Col>
        <Col span={24} md={12} className="mb-24 equal-height-col">
          <GroupManagement
            groups={groups}
            onAddGroupClick={() => setIsGroupModalVisible(true)}
          />
        </Col>
      </Row>
      <AddUserModal
        visible={isUserModalVisible}
        onOk={handleAddUser}
        onCancel={() => setIsUserModalVisible(false)}
        newUser={newUser}
        setNewUser={setNewUser}
      />
      <AddGroupModal
        visible={isGroupModalVisible}
        onOk={handleAddGroup}
        onCancel={() => setIsGroupModalVisible(false)}
        newGroup={newGroup}
        setNewGroup={setNewGroup}
      />
      <UserEdit />
      <ChatComponent />
    </MainLayout>
  );
};

export default ConfigPage;
