import React from "react";
import { Card, Row, Col, Avatar } from "antd";
import {
  StarTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import "./createdTickets.scss";

const { Meta } = Card;

const TicketsCriados = () => {
  const tickets = [
    {
      id: 1,
      creator: "Eleanor Crawford",
      group: "Suporte",
      city: "São Paulo",
      issue: "Duplicate data in ERP",
      status: "Urgent",
    },
    {
      id: 2,
      creator: "Brooklyn Butler",
      group: "TI",
      city: "Rio de Janeiro",
      issue: "Change toner for HP232",
      status: "Medium",
    },
    {
      id: 3,
      creator: "Vickie Turner",
      group: "TI",
      city: "Belo Horizonte",
      issue: "New workstation for new employee",
      status: "Critical",
    },
    {
      id: 4,
      creator: "Cindy Wells",
      group: "TI",
      city: "Curitiba",
      issue: "Change router in 2nd floor",
      status: "Urgent",
    },
    {
      id: 5,
      creator: "Travis Garcia",
      group: "Suporte",
      city: "Recife",
      issue: "Right hand elevators are not working",
      status: "High",
    },
    {
      id: 6,
      creator: "Clyde James",
      group: "TI",
      city: "Fortaleza",
      issue: "Incorrect Units",
      status: "Critical",
    },
    {
      id: 7,
      creator: "Laura Martin",
      group: "Financeiro",
      city: "Manaus",
      issue: "New user for PM tool",
      status: "Medium",
    },
    {
      id: 8,
      creator: "Bryan Baker",
      group: "Financeiro",
      city: "Goiânia",
      issue: "Access to FiberCorp public network request",
      status: "High",
    },
    // Adicione mais tickets conforme necessário
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Urgent":
        return "red";
      case "Critical":
        return "darkred";
      case "High":
        return "orange";
      case "Medium":
        return "gold";
      default:
        return "green";
    }
  };

  return (
    <div className="tickets-scroll-container">
      <Row gutter={[16, 16]}>
        {tickets.map((ticket) => (
          <Col key={ticket.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className={`ticket-card ${ticket.status.toLowerCase()}`}
              actions={[
                <CloseCircleTwoTone key="cancel" />,
                <CheckCircleTwoTone key="resolve" />,
                <StarTwoTone key="favorite" />,
              ]}
              style={{
                border: `2px solid ${getStatusColor(ticket.status)}`,
                borderRadius: "8px",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${ticket.id}`}
                    style={{ backgroundColor: getStatusColor(ticket.status) }}
                  />
                }
                title={`${ticket.creator} - ${ticket.group}`}
                description={`Cidade: ${ticket.city}\nProblema: ${ticket.issue}`}
              />
              <div className={`status-badge ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TicketsCriados;
