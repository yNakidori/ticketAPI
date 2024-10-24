import React, { useState } from "react";
import { Row, Col, Card, Form, Input, Upload, Button, message } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import profilavatar from "../../assets/images/face-1.jpg";

const UserEdit = ({ userData, onSave }) => {
  const [imageURL, setImageURL] = useState(userData?.avatar || profilavatar);
  const [, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "Sarah Emily Jacob",
    email: userData?.email || "placeholder",
    mobile: userData?.mobile || "(44) 123 1234 123",
    location: userData?.location || "USA",
  });

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
    onSave({ ...formData, avatar: imageURL });
    message.success("Perfil atualizado com sucesso!");
  };

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      <VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />
      <div>Upload New Profile Picture</div>
    </div>
  );

  return (
    <div>
      <Row gutter={[24, 0]} className="equal-height-row">
        <Col span={24} md={12} className="mb-24 equal-height-col">
          <Card
            bordered={false}
            title={
              <h6 className="font-semibold m-0">
                Editar Informações do Perfil
              </h6>
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
              <Form.Item label="Email">
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
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
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageURL ? (
                    <img
                      src={imageURL}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
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
        </Col>
      </Row>
    </div>
  );
};

export default UserEdit;
