import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import InputMask from "react-input-mask";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

const AddSupportPointModal = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Função para enviar os dados ao Firestore
  const handleSignIn = async (values) => {
    setLoading(true);

    try {
      // Gere um ID único para o documento
      const docId = `${values.abbreviation}_${Date.now()}`;

      // Dados a serem enviados
      const data = {
        cityname: values.cityname,
        abbreviation: values.abbreviation,
        owner: values.owner,
        supphone: values.supphone || "", // Valor opcional
        createdAt: new Date().toISOString(),
      };

      // Crie ou atualize o documento no Firestore
      await setDoc(doc(db, "supportPoints", docId), data);

      message.success("Ponto de apoio criado com sucesso!");
      form.resetFields();
      if (onOk) onOk(); // Chame o callback se necessário
    } catch (error) {
      console.error("Erro ao criar o ponto de apoio:", error);
      message.error("Ocorreu um erro ao criar o ponto de apoio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Adicionar Ponto de Apoio"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="add-sp-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="add-sp-form"
        onFinish={handleSignIn}
      >
        <Form.Item
          name="cityname"
          label="Cityname"
          className="form-item"
          rules={[
            { required: true, message: "Informe a cidade do ponto de apoio" },
          ]}
        >
          <Input
            className="form-input"
            placeholder="Digite o nome da cidade do ponto de apoio"
          />
        </Form.Item>
        <Form.Item
          name="abbreviation"
          label="Abbreviation"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Por favor informe uma abeviação para o ponto de apoio",
            },
            {
              len: 3,
              message:
                "City must be exactly 3 characters (e.g., SPO, CPS, MGM)",
            },
          ]}
        >
          <Input
            className="form-input"
            placeholder="Informe uma abreviação para o ponto de apoio (e.g., SPO)"
          />
        </Form.Item>
        <Form.Item
          name="owner"
          label="Owner"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Por favor informe um responsavel para o ponto de apoio",
            },
          ]}
        >
          <Input
            className="form-input"
            placeholder="Digite o nome do responsavel pelo ponto de apoio"
          />
        </Form.Item>
        <Form.Item name="supphone" label="Supphone" className="form-item">
          <InputMask
            mask="(99) 99999-9999"
            className="form-input"
            placeholder="(DDD) 00000-0000"
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="form-button"
          >
            {loading ? "Criando ponto de apoio..." : "Criar ponto de apoio"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSupportPointModal;
