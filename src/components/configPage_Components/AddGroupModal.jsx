import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
//import "./AddGroupModal.scss";

const AddGroupModal = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddGroup = async (values) => {
    const { name, description, permissions } = values;
    setLoading(true);

    try {
      const groupId = Date.now().toString();
      await setDoc(doc(db, "groups", groupId), {
        name,
        description,
        permissions,
        createdAt: new Date().toISOString(),
      });

      console.log("Grupo criado e salvo no Firestore");
      onOk();
      form.resetFields();
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Group"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="add-group-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="add-group-form"
        onFinish={handleAddGroup}
      >
        <Form.Item
          name="name"
          label="Group Name"
          rules={[{ required: true, message: "Please enter the group name" }]}
        >
          <Input placeholder="Enter group name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter a description" />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: "Please select permissions" }]}
        >
          <Select mode="multiple" placeholder="Select permissions">
            <Select.Option value="read">Read</Select.Option>
            <Select.Option value="write">Write</Select.Option>
            <Select.Option value="delete">Delete</Select.Option>
            <Select.Option value="chamados">Chamados</Select.Option>
            <Select.Option value="equipamentos">
              Solicitação de equipamentos
            </Select.Option>
            <Select.Option value="problemas">Problemas</Select.Option>
            <Select.Option value="flow">Flow</Select.Option>
            <Select.Option value="Inventario">Inventario</Select.Option>
            <Select.Option value="configuracoes">Configurações</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="form-button"
          >
            {loading ? "Creating Group..." : "Create Group"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
