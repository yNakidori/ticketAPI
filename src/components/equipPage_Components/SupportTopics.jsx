import React, { useState, useEffect } from "react";
import SupportCard from "./SupportCard";
import {
  LockOutlined,
  ToolOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Modal, Input, Form, message } from "antd";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./SupportTopics.module.scss";

const SupportTopics = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [form] = Form.useForm();

  const handleOpenModal = (title, placeholder, callback) => {
    setModalData({ title, placeholder, callback });
    setIsModalVisible(true);
  };

  const handleCreateRequest = async (data) => {
    try {
      await addDoc(collection(db, "supportRequests"), {
        ...data,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      message.success(`Solicitação "${data.title}" criada com sucesso!`);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      message.error(`Erro ao criar solicitação: ${error.message}`);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const requestData = {
          title: modalData.title,
          details: values.details,
        };
        modalData.callback(requestData);
      })
      .catch((error) => {
        console.error("Erro na validação do formulário:", error);
      });
  };

  const topics = [
    {
      icon: <LockOutlined />,
      title: "Esqueceu a senha de alguma conta?",
      onClick: () =>
        handleOpenModal(
          "Esqueceu a senha de alguma conta?",
          "Qual conta teve a senha esquecida?",
          handleCreateRequest
        ),
    },
    {
      icon: <ToolOutlined />,
      title: "Reparo de equipamentos",
      onClick: () =>
        handleOpenModal(
          "Reparo de equipamentos",
          "Qual equipamento precisa de manutenção?",
          handleCreateRequest
        ),
    },
    {
      icon: <FileTextOutlined />,
      title: "Solicitação de acessos",
      onClick: () =>
        handleOpenModal(
          "Solicitação de acessos",
          "Quais acessos são necessários e para qual usuário?",
          handleCreateRequest
        ),
    },
  ];

  return (
    <>
      <div className={styles["support-topics-container"]}>
        {topics.map((topic, index) => (
          <SupportCard
            key={index}
            icon={topic.icon}
            title={topic.title}
            onClick={topic.onClick}
          />
        ))}
      </div>

      {/* Modal para preencher informações adicionais */}
      <Modal
        title={modalData.title}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Criar Solicitação"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="details"
            label={modalData.placeholder}
            rules={[{ required: true, message: "Este campo é obrigatório!" }]}
          >
            <Input.TextArea rows={4} placeholder={modalData.placeholder} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SupportTopics;
