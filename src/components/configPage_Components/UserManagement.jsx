import React from "react";
import { Card, List, Button } from "antd";

const UserManagement = ({ users, onAddUserClick }) => (
  <Card
    bordered={false}
    title={<h6 className="font-semibold m-0">User Management</h6>}
    className="header-solid h-full"
    extra={<Button onClick={onAddUserClick}>Add User</Button>}
  >
    <List
      dataSource={users}
      renderItem={(item) => (
        <List.Item>
          {item.name} - {item.email}
        </List.Item>
      )}
    />
  </Card>
);

export default UserManagement;
