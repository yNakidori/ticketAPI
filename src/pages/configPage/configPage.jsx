import React, { useState } from "react";
import MainLayout from "../../components/mainLayout";
import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Radio,
  Upload,
  message,
  Form,
  Input,
} from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import profilavatar from "../../assets/images/face-1.jpg";
import "./configPage.scss";
import ChatComponent from "../../components/chatArea_Component/chatComponent";

const ConfigPage = () => {
  const [imageURL, setImageURL] = useState(profilavatar);
  const [, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Sarah Emily Jacob",
    email: "placeholder",
    mobile: "(44) 123 1234 123",
    location: "USA",
  });

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
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

  const handleFormSubmit = (e) => {
    message.success("Profile updated successfully");
  };

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      <VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />
      <div>Upload New Profile Picture</div>
    </div>
  );

  return (
    <MainLayout>
      <>
        <div className="sec-1">
          <Card className="card-profile-head">
            <Row justify="space-between" align="middle" gutter={[24, 0]}>
              <Col span={24} md={12} className="col-info">
                <Avatar size={74} shape="square" src={imageURL} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{formData.fullName}</h4>
                  <p>CEO / Co-Founder</p>
                </div>
              </Col>
              <Col span={24} md={12} className="col-radio">
                <Radio.Group defaultValue="a">
                  <Radio.Button value="a">OVERVIEW</Radio.Button>
                  <Radio.Button value="b">TEAMS</Radio.Button>
                  <Radio.Button value="c">PROJECTS</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </Card>
        </div>
        {/** */}
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
          {/** */}
          <Col span={24} md={12} className="mb-24 equal-height-col">
            <ChatComponent />
          </Col>
        </Row>
      </>
    </MainLayout>
  );
};

export default ConfigPage;
