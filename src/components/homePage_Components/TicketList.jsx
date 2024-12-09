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

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [userGroup, setUserGroup] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // Carregar o grupo do usuário logado
  useEffect(() => {
    const fetchUserGroup = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDoc = await getDocs(
            query(collection(db, "users"), where("uid", "==", currentUser.uid))
          );
          if (!userDoc.empty) {
            const userData = userDoc.docs[0].data();
            setUserGroup(userData.groups[0]);
          } else {
            message.error("Grupo do usuário não encontrado.");
          }
        }
      });
    };

    fetchUserGroup();
  }, []);

  // Carregar os tickets do grupo
  useEffect(() => {
    const fetchTickets = async () => {
      if (userGroup) {
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
      }
    };

    fetchTickets();
  }, [userGroup]);

  // Excluir ticket
  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteDoc(doc(db, "tickets", ticketId));
      message.success("Ticket excluído com sucesso!");
      setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    } catch (error) {
      console.error("Erro ao excluir o ticket:", error);
      message.error("Erro ao excluir o ticket.");
    }
  };

  // Marcar ticket como concluído
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
      message.error("Erro ao marcar como concluído.");
    }
  };

  // Mostrar imagens anexadas
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
                <Button type="link" onClick={() => showImages(ticket.images)}>
                  Ver Anexos
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<span>{ticket.title}</span>}
                description={
                  <>
                    <p>{ticket.description}</p>
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

      {/* Modal para exibir as imagens anexadas */}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        title="Imagens Anexadas"
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {selectedImages.map((img, index) => (
            <Image key={index} src={img} alt={`attachment-${index}`} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default TicketsList;
