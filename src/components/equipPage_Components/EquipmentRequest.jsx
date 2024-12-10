import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message, InputNumber } from "antd";
import { SendOutlined } from "@ant-design/icons";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import styles from "./EquipmentRequestForm.module.scss";
import { onAuthStateChanged } from "firebase/auth";

const { TextArea } = Input;
const { Option } = Select;

const EquipmentRequestForm = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState(null);
  const [equipmentRequests, setEquipmentRequests] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(userQuery, (snapshot) => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            setUserInfo({
              name: userData.name,
              email: userData.email,
              group: userData.group || null,
            });
            form.setFieldsValue({
              nomeSolicitante: userData.name,
              emailSolicitante: userData.email,
            });
          }
        });
      }
    });

    const unsubscribeEquipmentRequests = onSnapshot(
      collection(db, "equipmentRequests"),
      (snapshot) => {
        const requestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEquipmentRequests(requestsData);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeEquipmentRequests();
    };
  }, [form]);

  const onFinish = async (values) => {
    if (!userInfo) {
      message.error("Erro: Usuário não autenticado.");
      return;
    }
    setUploading(true);
    try {
      const newEquipmentRequest = {
        ...values,
        creatorId: userInfo.email,
        status: "Pendente",
        createdAt: new Date(),
      };
      await addDoc(collection(db, "equipmentRequests"), newEquipmentRequest);
      message.success("Solicitação enviada com sucesso!");
      form.resetFields();
    } catch (error) {
      console.error("Erro ao enviar a solicitação:", error);
      message.error(`Erro ao enviar a solicitação: ${error.message}`);
    }
    setUploading(false);
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Solicitação de Equipamento</h2>
      <Form
        form={form}
        name="equipmentRequest"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Nome do Solicitante"
          name="nomeSolicitante"
          rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
        >
          <Input readOnly placeholder="Nome do usuário logado" />
        </Form.Item>

        <Form.Item
          label="E-mail do Solicitante"
          name="emailSolicitante"
          rules={[{ required: true, message: "Por favor, insira seu e-mail!" }]}
        >
          <Input readOnly placeholder="E-mail do usuário logado" />
        </Form.Item>

        <Form.Item
          label="Tipo de Equipamento"
          name="tipoEquipamento"
          rules={[
            { required: true, message: "Selecione o tipo de equipamento!" },
          ]}
        >
          <Select placeholder="Selecione um tipo de equipamento">
            <Option value="notebook">Notebook</Option>
            <Option value="monitor">Monitor</Option>
            <Option value="teclado">Teclado</Option>
            <Option value="mouse">Mouse</Option>
            <Option value="impressora">Impressora</Option>
            <Option value="outro">Outro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantidade"
          name="quantidade"
          rules={[
            { required: true, message: "Insira a quantidade necessária!" },
          ]}
        >
          <InputNumber
            min={1}
            placeholder="Quantidade"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Urgência"
          name="urgencia"
          rules={[
            { required: true, message: "Selecione o nível de urgência!" },
          ]}
        >
          <Select placeholder="Selecione o nível de urgência">
            <Option value="alta">Alta</Option>
            <Option value="media">Média</Option>
            <Option value="baixa">Baixa</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[
            {
              required: true,
              message: "Descreva a finalidade do equipamento!",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Descreva a finalidade do equipamento"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            loading={uploading}
          >
            Solicitar Equipamento
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EquipmentRequestForm;
