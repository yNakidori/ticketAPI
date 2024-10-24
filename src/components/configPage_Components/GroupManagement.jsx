import React from "react";
import { Card, List, Button } from "antd";

const GroupManagement = ({ groups, onAddGroupClick }) => (
  <Card
    bordered={false}
    title={<h6 className="font-semibold m-0">Group Management</h6>}
    className="header-solid h-full"
    extra={<Button onClick={onAddGroupClick}>Add Group</Button>}
  >
    <List
      dataSource={groups}
      renderItem={(item) => (
        <List.Item>
          {item.name} - {item.description}
        </List.Item>
      )}
    />
  </Card>
);

export default GroupManagement;
