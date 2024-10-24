import React from "react";
import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import { SendOutlined } from "@ant-design/icons";
import styles from "./EquipmentRequestForm.module.scss";

const { TextArea } = Input;
const { Option } = Select;

const EquipmentRequestForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Adicione a lógica para enviar os dados para o servidor
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Solicitação de Equipamento</h2>
      <Form
        form={form}
        name="equipmentRequest"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nome do Solicitante"
          name="nomeSolicitante"
          rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
        >
          <Input placeholder="Digite seu nome completo" />
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
            <Option value="rastreador">Rastreador</Option>
            <Option value="leitor">Leitor</Option>
            <Option value="camera">Câmera</Option>
            <Option value="scanner">Scanner</Option>
            <Option value="suporte">Suporte para monitor</Option>
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
          label="Data Necessária"
          name="dataNecessaria"
          rules={[{ required: true, message: "Selecione a data necessária!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[
            {
              required: true,
              message: "Descreva a necessidade do equipamento!",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Descreva a finalidade do equipamento"
          />
        </Form.Item>

        <Form.Item className={styles["form-actions"]}>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            Solicitar Equipamento
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EquipmentRequestForm;
