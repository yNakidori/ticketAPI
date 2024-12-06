import React, { useState } from "react";
import { Row, Col, Card, Avatar, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import upload from "../../firebase/upload";

const ProfileHeader = ({ imageURL, fullName, initialBannerURL }) => {
  const [bannerURL, setBannerURL] = useState(initialBannerURL);
  const [loading, setLoading] = useState(false);

  const handleBannerUpload = async (file) => {
    try {
      setLoading(true);
      const uploadedBannerURL = await upload(file);
      setBannerURL(uploadedBannerURL);
      message.success("Banner atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer upload do banner:", error);
      message.error("Falha ao atualizar o banner. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      handleBannerUpload(file);
    }
  };

  return (
    <div className="sec-1">
      <Card className="card-profile-head">
        <div
          className="profile-banner"
          style={{
            position: "relative",
            width: "100%",
            height: "200px",
            backgroundImage: `url(${bannerURL || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "8px",
          }}
        >
          <Upload
            accept="image/*"
            maxCount={1}
            onChange={handleFileChange}
            beforeUpload={() => false}
          >
            <Button
              type="default"
              icon={<UploadOutlined />}
              loading={loading}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
              }}
            >
              {loading ? "Enviando..." : "Alterar Banner"}
            </Button>
          </Upload>
        </div>
        <Row
          justify="center"
          align="middle"
          gutter={[24, 0]}
          style={{ marginTop: "-40px" }}
        >
          <Col>
            <Avatar
              size={74}
              src={imageURL}
              style={{ border: "3px solid white" }}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "10px" }}>
          <Col>
            <h4 className="font-semibold m-0">{fullName}</h4>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfileHeader;
