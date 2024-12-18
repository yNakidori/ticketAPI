import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Popconfirm,
  message,
  Tag,
  Modal,
  Image,
  Row,
  Col,
} from "antd";
import { db, auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [userGroup, setUserGroup] = useState(null);

  // Carregar o grupo do usuário
  useEffect(() => {
    const fetchUserGroup = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDocs(
              query(
                collection(db, "users"),
                where("uid", "==", currentUser.uid)
              )
            );
            if (!userDoc.empty) {
              const userData = userDoc.docs[0].data();
              setUserGroup(userData.groups[0]); // Considerando o primeiro grupo
            } else {
              message.error("Grupo do usuário não encontrado.");
            }
          } catch (error) {
            console.error("Erro ao carregar o grupo do usuário:", error);
            message.error(`Erro ao carregar o grupo: ${error.message}`);
          }
        }
      });
    };

    fetchUserGroup();
  }, []);

  // Carregar os tickets
  useEffect(() => {
    const fetchTickets = async () => {
      if (userGroup) {
        try {
          const ticketsQuery = query(
            collection(db, "tickets"),
            where("group", "==", userGroup)
          );
          const ticketsSnapshot = await getDocs(ticketsQuery);
          const ticketsData = ticketsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTickets(ticketsData);
        } catch (error) {
          console.error("Erro ao carregar os tickets:", error);
          message.error(`Erro ao carregar os tickets: ${error.message}`);
        }
      }
    };

    fetchTickets();
  }, [userGroup]);

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteDoc(doc(db, "tickets", ticketId));
      message.success("Ticket excluído com sucesso!");
      setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    } catch (error) {
      console.error("Erro ao excluir o ticket:", error);
      message.error(`Erro ao excluir o ticket: ${error.message}`);
    }
  };

  const handleMarkAsCompleted = async (ticketId) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, { status: "completed" });
      message.success("Ticket marcado como concluído!");
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: "completed" } : ticket
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o ticket:", error);
      message.error(`Erro ao marcar como concluído: ${error.message}`);
    }
  };

  const showImages = (images) => {
    setSelectedImages(images || []);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImages([]);
  };

  return (
    <>
      <Card
        bordered={false}
        title={<h6 className="font-semibold m-0">Tickets do Grupo</h6>}
        className="header-solid h-full"
      >
        <Row gutter={[16, 16]}>
          {tickets.map((ticket) => (
            <Col span={8} key={ticket.id}>
              <Card
                title={ticket.description}
                bordered
                extra={
                  <>
                    <Popconfirm
                      title="Tem certeza que deseja excluir este ticket?"
                      onConfirm={() => handleDeleteTicket(ticket.id)}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <Button type="link" danger>
                        Excluir
                      </Button>
                    </Popconfirm>
                    <Button
                      type="link"
                      onClick={() => handleMarkAsCompleted(ticket.id)}
                      disabled={ticket.status === "completed"}
                    >
                      {ticket.status === "completed"
                        ? "Concluído"
                        : "Marcar como Concluído"}
                    </Button>
                    <Button
                      type="link"
                      onClick={() => showImages(ticket.attachments)}
                    >
                      Ver Anexos
                    </Button>
                  </>
                }
              >
                <p>Grupo: {ticket.group}</p>
                <Tag color={ticket.status === "completed" ? "blue" : "green"}>
                  {ticket.status === "completed" ? "Concluído" : "Aberto"}
                </Tag>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        title="Imagens Anexadas"
      >
        {selectedImages.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {selectedImages.map((img, index) => (
              <Image key={index} src={img} alt={`attachment-${index}`} />
            ))}
          </div>
        ) : (
          <p>Sem anexos disponíveis.</p>
        )}
      </Modal>
    </>
  );
};

export default TicketsList;
