import React, { useState } from "react";
import { Form, Input, Button, Select, Radio } from "antd";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./FormTicket.module.scss";

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
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Solicitante"
          name="solicitante"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Assunto"
          name="assunto"
          rules={[{ required: true, message: "Please input the subject!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Imagens"
          name="imagens"
          rules={[
            { required: true, message: "Select an image showing the problem!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="System"
          name="system"
          rules={[{ required: true, message: "Select the system!" }]}
        >
          <Radio.Group onChange={(e) => setFeedback(e.target.value)}>
            <Radio value={1}>WebApp</Radio>
            <Radio value={2}>WebTr</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item className={styles["form-actions"]}>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTicket;
