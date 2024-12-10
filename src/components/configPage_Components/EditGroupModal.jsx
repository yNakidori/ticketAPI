import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { db } from "../../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

const EditGroupModal = ({ visible, group, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleEditGroup = async (values) => {
    const { name, description, permissions } = values;
    setLoading(true);

    try {
      const groupDoc = doc(db, "groups", group.id);
      await updateDoc(groupDoc, { name, description, permissions });
      onSave();
      form.resetFields();
      console.log("Grupo atualizado com sucesso!");
    } catch (error) {
      console.log("Error ao atualizar permissões de grupos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Grupo"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={group}
        onFinish={handleEditGroup}
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
          <Input.TextArea rows={4} placeholder="Informe a descrição" />
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
            <Select.Option value="Inventario">Inventário</Select.Option>
            <Select.Option value="configuracoes">Configurações</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Atualizando..." : "Salvar alterações"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGroupModal;
