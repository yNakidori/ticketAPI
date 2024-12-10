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
          label="Nome do grupo"
          rules={[{ required: true, message: "Defina o nome do grupo" }]}
        >
          <Input placeholder="Defina um nome para o grupo" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
          rules={[
            { required: true, message: "Informe uma descrição para o grupo" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Infome a descrição" />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissões"
          rules={[
            { required: true, message: "Escolha as permissões do grupo" },
          ]}
        >
          <Select mode="multiple" placeholder="Escolha as permissões do grupo">
            <Select.Option value="chamados">Chamados</Select.Option>
            <Select.Option value="equipamentos">
              Solicitação de equipamentos
            </Select.Option>
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
            {loading ? "Creating Group..." : "Criar grupo"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
