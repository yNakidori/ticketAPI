import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const StatusTickets = () => {
  const [openTickets, setOpenTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [reviewTickets, setReviewTickets] = useState(0);
  const [canceledTickets, setCanceledTickets] = useState(0);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsRef = collection(db, "tickets");

        // Contar tickets abertos
        const openQuery = query(ticketsRef, where("status", "==", "open"));
        const openSnapshot = await getDocs(openQuery);
        setOpenTickets(openSnapshot.size);

        // Contar tickets concluídos
        const closedQuery = query(
          ticketsRef,
          where("status", "==", "completed")
        );
        const closedSnapshot = await getDocs(closedQuery);
        setClosedTickets(closedSnapshot.size);

        // Contar tickets em revisão
        const reviewQuery = query(ticketsRef, where("status", "==", "review"));
        const reviewSnapshot = await getDocs(reviewQuery);
        setReviewTickets(reviewSnapshot.size);

        // Contar tickets cancelados
        const canceledQuery = query(
          ticketsRef,
          where("status", "==", "canceled")
        );
        const canceledSnapshot = await getDocs(canceledQuery);
        setCanceledTickets(canceledSnapshot.size);
      } catch (error) {
        console.error("Erro ao buscar os tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
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
            <p>Tickets concluídos</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card yellow">
            <h3>{reviewTickets}</h3>
            <p>Revisão de Tickets</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="status-card red">
            <h3>{canceledTickets}</h3>
            <p>Tickets cancelados</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatusTickets;
