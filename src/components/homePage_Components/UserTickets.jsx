import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Button,
  Popconfirm,
  message,
  Tag,
  Modal,
  Image,
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

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchUserTickets = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const ticketsQuery = query(
              collection(db, "tickets"),
              where("creatorId", "==", currentUser.uid)
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
      });
    };

    fetchUserTickets();
  }, []);

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
        title={<h6 className="font-semibold m-0">Meus Tickets</h6>}
        className="header-solid h-full"
      >
        <List
          itemLayout="vertical"
          dataSource={tickets}
          renderItem={(ticket) => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Tem certeza que deseja excluir este ticket?"
                  onConfirm={() => handleDeleteTicket(ticket.id)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button type="link" danger>
                    Excluir
                  </Button>
                </Popconfirm>,
                <Button
                  type="link"
                  onClick={() => handleMarkAsCompleted(ticket.id)}
                  disabled={ticket.status === "completed"}
                >
                  {ticket.status === "completed"
                    ? "Concluído"
                    : "Marcar como Concluído"}
                </Button>,
                <Button
                  type="link"
                  onClick={() => showImages(ticket.attachments)}
                >
                  Ver Anexos
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<span>{ticket.description}</span>}
                description={
                  <>
                    <p>Grupo: {ticket.group}</p>
                    <Tag
                      color={ticket.status === "completed" ? "blue" : "green"}
                    >
                      {ticket.status === "completed" ? "Concluído" : "Aberto"}
                    </Tag>
                  </>
                }
              />
            </List.Item>
          )}
        />
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

export default UserTickets;
