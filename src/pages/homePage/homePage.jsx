import React, { useState } from "react";
import MainLayout from "../../components/mainLayout";
import TicketsCriados from "../../components/homePage_Components/createdTickets";
import TicketsPessoais from "../../components/homePage_Components/personalTickets";
import { Row, Col, Modal } from "antd"; // Importe Modal do Ant Design
import Lottie from "react-lottie";
import addAnimation from "../../components/lottieFiles_Components/AddLogo.json";
import FormTicket from "../../components/homePage_Components/formTicket";
import "../homePage/homePage.scss";

const HomePage = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <MainLayout>
      <div className="homepage">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="section">
              <h2 className="tittle">Tickets da Equipe</h2>
              <TicketsCriados />
            </div>
          </Col>
          <Col span={24}>
            <div className="section">
              <h2>Meus Tickets</h2>
              <TicketsPessoais />
            </div>
          </Col>
        </Row>
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: "80px",
            height: "80px",
          }}
          onClick={showModal}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: isAnimationPlaying,
              animationData: addAnimation,
            }}
            isStopped={!isAnimationPlaying}
            isPaused={!isAnimationPlaying}
          />
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 110,
            right: 20,
            width: "100px",
            height: "100px",
          }}
        ></div>
        <Modal
          className="modal-1"
          title="Criar ticket"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <FormTicket />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default HomePage;
