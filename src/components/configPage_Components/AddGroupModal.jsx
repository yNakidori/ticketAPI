import React from "react";
import { Modal, Form, Input, Select } from "antd";

const { TextArea } = Input;

const AddGroupModal = ({
  visible,
  onOk,
  onCancel,
  group,
  setGroup,
  isEdit,
}) => (
  <Modal
    title={isEdit ? "Edit Group" : "Add Group"}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText={isEdit ? "Save Changes" : "Create Group"}
  >
    <Form layout="vertical">
      <Form.Item label="Group Name" required>
        <Input
          value={group.name}
          onChange={(e) => setGroup({ ...group, name: e.target.value })}
          placeholder="Enter group name"
        />
      </Form.Item>
      <Form.Item label="Description" required>
        <TextArea
          rows={4}
          value={group.description}
          onChange={(e) => setGroup({ ...group, description: e.target.value })}
          placeholder="Enter group description"
        />
      </Form.Item>
      <Form.Item label="Permissions">
        <Select
          mode="multiple"
          placeholder="Select permissions"
          value={group.permissions}
          onChange={(values) => setGroup({ ...group, permissions: values })}
        >
          <Select.Option value="read">Read</Select.Option>
          <Select.Option value="write">Write</Select.Option>
          <Select.Option value="delete">Delete</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  </Modal>
);

export default AddGroupModal;
