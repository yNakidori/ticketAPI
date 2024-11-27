import React from "react";
import { Card, List, Button } from "antd";

const UserManagement = ({ users, onAddUserClick, onUserAction }) => (
  <Card
    bordered={false}
    title={<h6 className="font-semibold m-0">User Management</h6>}
    className="header-solid h-full"
    extra={<Button onClick={onAddUserClick}>Add User</Button>}
  >
    <List
      dataSource={users}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button onClick={() => onUserAction("disable", item)}>
              Disable
            </Button>,
            <Button onClick={() => onUserAction("delete", item)}>
              Delete
            </Button>,
            <Button onClick={() => onUserAction("resetPassword", item)}>
              Reset Password
            </Button>,
            <Button onClick={() => onUserAction("addToGroup", item)}>
              Add to Group
            </Button>,
          ]}
        >
          {item.name} - {item.email}
        </List.Item>
      )}
    />
  </Card>
);

export default UserManagement;
