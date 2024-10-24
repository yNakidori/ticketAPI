import React from "react";
import { Modal, Form, Input } from "antd";

const AddUserModal = ({ visible, onOk, onCancel, newUser, setNewUser }) => (
  <Modal title="Add User" visible={visible} onOk={onOk} onCancel={onCancel}>
    <Form layout="vertical">
      <Form.Item label="Name">
        <Input
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </Form.Item>
    </Form>
  </Modal>
);

export default AddUserModal;
