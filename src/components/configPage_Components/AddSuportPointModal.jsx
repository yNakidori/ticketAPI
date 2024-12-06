import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import InputMask from "react-input-mask";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import upload from "../../firebase/upload";
import { UploadOutlined } from "@ant-design/icons";
import "./AddUserModal.scss";

const AddSupportPointModal = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

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

      // Upload avatar if a file is provided
      let avatarUrl = "";
      if (file) {
        avatarUrl = await upload(file);
      }

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        city,
        email,
        uid: user.uid,
        avatar: avatarUrl, // Save the avatar URL (empty if no file uploaded)
      });

      message.success("User created successfully!");
      onOk();
      form.resetFields();
      setFile(null); // Reset the file state
    } catch (error) {
      console.error("Error creating user:", error);
      message.error("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (info) => {
    const fileList = info.fileList.slice(-1);
    const latestFile = fileList[0]?.originFileObj;
    setFile(latestFile);
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
          <Input.Password
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
