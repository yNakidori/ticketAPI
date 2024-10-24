import React from "react";
import { Modal, Form, Input } from "antd";

const AddGroupModal = ({ visible, onOk, onCancel, newGroup, setNewGroup }) => (
  <Modal title="Add Group" visible={visible} onOk={onOk} onCancel={onCancel}>
    <Form layout="vertical">
      <Form.Item label="Group Name">
        <Input
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input
          value={newGroup.description}
          onChange={(e) =>
            setNewGroup({ ...newGroup, description: e.target.value })
          }
        />
      </Form.Item>
    </Form>
  </Modal>
);

export default AddGroupModal;
