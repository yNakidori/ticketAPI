import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message, Select } from "antd";
import InputMask from "react-input-mask";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import upload from "../../firebase/upload";
import { UploadOutlined } from "@ant-design/icons";
import "./AddUserModal.scss";

const AddUserModal = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [supportPoints, setSupportPoints] = useState([]);

  useEffect(() => {
    const fetchSupportPoints = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "supportPoints"));
        const points = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          abbreviation: doc.data().abbreviation,
          cityname: doc.data().cityname,
        }));
        setSupportPoints(points);
      } catch (error) {
        console.error("Erro ao buscar pontos de apoio:", error);
        message.error("Erro ao carregar pontos de apoio.");
      }
    };

    fetchSupportPoints();
  }, []);

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

      // Upload banner if a file is provided
      let bannerUrl = "";
      if (bannerFile) {
        bannerUrl = await upload(bannerFile);
      }

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        city,
        email,
        uid: user.uid,
        avatar: avatarUrl, // Save the avatar URL (empty if no file uploaded)
        banner: bannerUrl, // Save the banner URL (empty if no file uploaded)
      });

      message.success("User created successfully!");
      onOk();
      form.resetFields();
      setFile(null); // Reset the file state
      setBannerFile(null); // Reset the banner file state
    } catch (error) {
      console.error("Error creating user:", error);
      message.error("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (info) => {
    const fileList = info.fileList.slice(-1); // Allow only one file
    const latestFile = fileList[0]?.originFileObj;
    setFile(latestFile);
  };

  const handleBannerChange = (info) => {
    const fileList = info.fileList.slice(-1); // Allow only one file
    const latestFile = fileList[0]?.originFileObj;
    setBannerFile(latestFile);
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
          label="Nome"
          className="form-item"
          rules={[
            { required: true, message: "Por favor digite o nome do usuario" },
          ]}
        >
          <Input className="form-input" placeholder="Nome do usuario" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          className="form-item"
          rules={[
            { required: true, message: "Por favor informe o email do usuario" },
            { type: "email", message: "Digite um email valido" },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@grupospo\.com\.br$/,
              message: "Email deev fazer parte do dominio: @grupospo.com.br",
            },
          ]}
        >
          <Input
            className="form-input"
            placeholder="Insira o email do usuario"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          className="form-item"
          rules={[
            { required: true, message: "Por favor informe a senha do usuario" },
          ]}
        >
          <Input.Password
            className="form-input"
            placeholder="Informe a senha do usuario"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Telefone"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Por favor informe um telefone valido para contato",
            },
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
          label="Ponto de apoio"
          className="form-item"
          rules={[
            { required: true, message: "Por favor defina um ponto de apoio" },
          ]}
        >
          <Select
            placeholder="Escolha um ponto de apoio"
            options={supportPoints.map((point) => ({
              value: point.abbreviation,
              label: `${point.cityname} (${point.abbreviation})`,
            }))}
          />
        </Form.Item>
        <Form.Item label="Avatar" className="form-item">
          <Upload
            accept="image/*"
            maxCount={1}
            onChange={handleFileChange}
            beforeUpload={() => false} // Prevent auto-upload
          >
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Banner" className="form-item">
          <Upload
            accept="image/*"
            maxCount={1}
            onChange={handleBannerChange}
            beforeUpload={() => false} // Prevent auto-upload
          >
            <Button icon={<UploadOutlined />}>Upload Banner</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="form-button"
          >
            {loading ? "Creating User..." : "Criar usuario"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
