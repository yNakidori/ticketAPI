import React from "react";
import { Card, List, Button, Popconfirm } from "antd";

const GroupManagement = ({
  groups,
  onAddGroupClick,
  onEditGroup,
  onDeleteGroup,
}) => (
  <Card
    bordered={false}
    title={<h6 className="font-semibold m-0">Group Management</h6>}
    className="header-solid h-full"
    extra={<Button onClick={onAddGroupClick}>Add Group</Button>}
  >
    <List
      dataSource={groups}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button type="link" onClick={() => onEditGroup(item)}>
              Edit
            </Button>,
            <Popconfirm
              title="Are you sure you want to delete this group?"
              onConfirm={() => onDeleteGroup(item.id)}
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
            title={<span>{item.name}</span>}
            description={
              <>
                <p>{item.description}</p>
                <p>
                  <strong>Permissions:</strong> {item.permissions.join(", ")}
                </p>
              </>
            }
          />
        </List.Item>
      )}
    />
  </Card>
);

export default GroupManagement;
