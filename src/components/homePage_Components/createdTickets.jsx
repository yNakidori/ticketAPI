import React from "react";
import {
  StarTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Avatar, Card, Row, Col } from "antd";
import "./createdTickets.scss";

const { Meta } = Card;

const TicketsCriados = () => {
  const tickets = [
    {
      id: 1,
      creator: "Usuário A",
      group: "Suporte",
      city: "São Paulo",
      issue: "Problema com login",
    },
    {
      id: 2,
      creator: "Usuário B",
      group: "Financeiro",
      city: "Rio de Janeiro",
      issue: "Erro na fatura",
    },
    {
      id: 3,
      creator: "Usuário C",
      group: "TI",
      city: "Belo Horizonte",
      issue: "Computador lento",
    },
    // adicione mais tickets conforme necessário
  ];

  return (
    <div className="tickets-scroll-container">
      <Row gutter={[16, 16]}>
        {tickets.map((ticket) => (
          <Col key={ticket.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className="message-card"
              actions={[
                <CloseCircleTwoTone key="cancel" />,
                <CheckCircleTwoTone key="resolve" />,
                <StarTwoTone key="favorite" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${ticket.id}`}
                  />
                }
                title={`${ticket.creator} - ${ticket.group}`}
                description={`Cidade: ${ticket.city}\nProblema: ${ticket.issue}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TicketsCriados;
