import React, { useState, useEffect } from "react";
import TicketList from "../../components/homePage_Components/TicketList";
import GroupTickets from "../../components/homePage_Components/GroupTickets";
import UserTickets from "../../components/homePage_Components/UserTickets";
import { Row, Col, Modal, Card } from "antd";
import Lottie from "react-lottie";
import addAnimation from "../../components/lottieFiles_Components/AddLogo.json";
import FormTicket from "../../components/homePage_Components/formTicket";
import SideBar from "../../assets/Sidebar";
import "../homePage/homePage.scss";

const HomePage = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openTickets, setOpenTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);

  // Mocked data fetching (replace with actual data fetching logic)
  useEffect(() => {
    // Substitua essa lógica pelos dados reais de tickets
    setOpenTickets(10); // Exemplo de dados para tickets abertos
    setClosedTickets(5); // Exemplo de dados para tickets fechados
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="homepage">
      <SideBar />

      {/* Cards de Status */}
      <Row gutter={20} className="status-cards">
        <Col span={6}>
          <Card className="status-card purple">
            <h3>{openTickets}</h3>
            <p>Tickets abertos</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card green">
            <h3>{closedTickets}</h3>
            <p>Tickets concluidos</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card yellow">
            <h3>0</h3>
            <p>Revisão de Tickets</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card red">
            <h3>1</h3>
            <p>Tickets cancelados</p>
          </Card>
        </Col>
      </Row>

      <Card className="group-tickets-container">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="section">
              <GroupTickets />
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="group-tickets-container">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="section">
              <UserTickets />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Lottie Animation Button */}
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

      {/* Modal para Criar Ticket */}
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
  );
};

export default HomePage;
