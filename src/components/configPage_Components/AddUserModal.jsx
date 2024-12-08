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
          label="Support Point"
          className="form-item"
          rules={[{ required: true, message: "Please select a support point" }]}
        >
          <Select
            placeholder="Select a support point"
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
            {loading ? "Creating User..." : "Create User"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
