import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { auth, db } from "../../firebase/firebase"; // Adicionando Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Para salvar os dados no Firestore
import "./AddUserModal.scss";

const AddUserModal = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (values) => {
    const { name, email, password, phone, city } = values;
    setLoading(true);

    try {
      // Criação do usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Adicionando informações extras ao Firestore
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        city,
        email,
        uid: user.uid,
      });

      console.log("Usuário criado e salvo no Firestore:", user);
      onOk(); // Fecha o modal
      form.resetFields(); // Limpa os campos do formulário
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add User"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="add-user-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="add-user-form"
        onFinish={handleSignIn}
      >
        <Form.Item
          name="name"
          label="Name"
          className="form-item"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input className="form-input" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          className="form-item"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input className="form-input" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          className="form-item"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            className="form-input"
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          className="form-item"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^\d{10,15}$/,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input className="form-input" placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          className="form-item"
          rules={[{ required: true, message: "Please enter your city" }]}
        >
          <Input className="form-input" placeholder="Enter your city" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="form-button"
          >
            {loading ? "Creating User..." : "Create User"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
