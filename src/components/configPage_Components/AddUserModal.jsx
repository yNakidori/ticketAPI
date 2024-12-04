import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import InputMask from "react-input-mask";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import "./AddUserModal.scss";

const AddUserModal = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (values) => {
    const { name, email, password, phone, city } = values;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        city,
        email,
        uid: user.uid,
      });

      console.log("Usuário criado e salvo no Firestore:", user);
      onOk();
      form.resetFields();
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
            {
              pattern: /^[a-zA-Z0-9._%+-]+@grupospo\.com\.br$/,
              message: "Email must be from the @grupospo.com.br domain",
            },
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
          ]}
        >
          <InputMask
            mask="(99) 99999-9999"
            className="form-input"
            placeholder="(DDD) 00000-0000"
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          className="form-item"
          rules={[
            { required: true, message: "Please enter your city" },
            {
              len: 3,
              message: "City must be exactly 3 characters (e.g., SP, RJ, MG)",
            },
          ]}
        >
          <Input
            className="form-input"
            placeholder="Enter city abbreviation (e.g., SP)"
          />
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
