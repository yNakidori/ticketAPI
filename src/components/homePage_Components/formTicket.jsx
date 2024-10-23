import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import styles from "./FormTicket.module.scss";

const { TextArea } = Input;

const FormTicket = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles["form-container"]}>
      <Form
        form={form}
        layout="vertical"
        name="ticketForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Criador"
          name="creator"
          rules={[
            { required: true, message: "Por favor, insira o nome do criador!" },
          ]}
        >
          <Input placeholder="Nome do criador" />
        </Form.Item>

        <Form.Item
          label="Grupo"
          name="group"
          rules={[{ required: true, message: "Por favor, selecione o grupo!" }]}
        >
          <Select placeholder="Selecione o grupo">
            <Select.Option value="suporte">Suporte</Select.Option>
            <Select.Option value="financeiro">Financeiro</Select.Option>
            <Select.Option value="ti">TI</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Cidade"
          name="city"
          rules={[{ required: true, message: "Por favor, insira a cidade!" }]}
        >
          <Input placeholder="Cidade" />
        </Form.Item>

        <Form.Item
          label="Problema"
          name="issue"
          rules={[
            { required: true, message: "Por favor, descreva o problema!" },
          ]}
        >
          <TextArea rows={3} placeholder="Descrição do problema" />
        </Form.Item>

        <Form.Item label="Imagens" name="images">
          <Upload multiple={true} listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item className={styles["form-actions"]}>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTicket;
