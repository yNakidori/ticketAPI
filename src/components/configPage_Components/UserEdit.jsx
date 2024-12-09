import React, { useState, useEffect } from "react";
import { Card, Form, Input, Upload, Button, message } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import profilavatar from "../../assets/images/pfp.jpg";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserEdit = ({ onSave }) => {
  const [user, setUser] = useState(null);
  const [imageURL, setImageURL] = useState(profilavatar);
  const [, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    location: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormData({
              fullName: userData.name || "",
              email: currentUser.email,
              mobile: userData.phone || "",
              location: userData.city || "",
            });
            setImageURL(userData.avatar || profilavatar);
          } else {
            message.error("Não foi possível carregar os dados do usuário.");
          }
          setUser(currentUser);
        }
      });
    };

    fetchUserData();
  }, []);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Você só pode fazer upload de arquivos JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("A imagem deve ter menos de 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(imageUrl);
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    if (user) {
      onSave({ ...formData, avatar: imageURL });
      message.success("Perfil atualizado com sucesso!");
    } else {
      message.error("Não foi possível salvar as alterações.");
    }
  };

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      <VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />
      <div>Upload New Profile Picture</div>
    </div>
  );

  return (
    <div>
      <Card
        bordered={false}
        title={
          <h6 className="font-semibold m-0">Editar Informações do Perfil</h6>
        }
        className="header-solid h-full"
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item label="Nome Completo">
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            extra={
              <span style={{ color: "#888" }}>
                O email não pode ser alterado.
              </span>
            }
          >
            <Input
              name="email"
              value={formData.email}
              disabled
              style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
            />
          </Form.Item>
          <Form.Item label="Telefone">
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Localização">
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Foto de Perfil">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar Alterações
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserEdit;
