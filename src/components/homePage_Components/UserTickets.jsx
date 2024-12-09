import React, { useEffect, useState } from "react";
import {
  List,
  Card,
  Tag,
  Button,
  Tooltip,
  Modal,
  message,
  Popconfirm,
} from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [attachmentsModal, setAttachmentsModal] = useState({
    visible: false,
    attachments: [],
  });

  // Função para exibir modal com anexos
  const handleViewAttachments = (attachments) => {
    setAttachmentsModal({ visible: true, attachments });
  };

  // Fechar o modal de anexos
  const handleCloseAttachments = () => {
    setAttachmentsModal({ visible: false, attachments: [] });
  };

  // Obter tickets criados pelo usuário logado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userTicketsQuery = query(
          collection(db, "tickets"),
          where("creatorEmail", "==", user.email)
        );

        onSnapshot(userTicketsQuery, (snapshot) => {
          const userTickets = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTickets(userTickets);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Função para marcar o ticket como concluído
  const handleMarkComplete = async (ticketId) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, { status: "SOLVED" });
      message.success("Ticket marcado como concluído!");
    } catch (error) {
      console.error("Erro ao marcar como concluído:", error);
      message.error("Não foi possível marcar o ticket como concluído.");
    }
  };

  // Função para excluir o ticket
  const handleDeleteTicket = async (ticketId) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await deleteDoc(ticketRef);
      message.success("Ticket excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o ticket:", error);
      message.error("Não foi possível excluir o ticket.");
    }
  };

  // Mapeamento de cores por status
  const statusColors = {
    NEW: "blue",
    SOLVED: "green",
    "ON HOLD": "orange",
    CRITICAL: "red",
  };

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={tickets}
        renderItem={(ticket) => (
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{`#${ticket.id} - ${ticket.title || "Ticket"}`}</span>
                <Tag color={statusColors[ticket.status]}>{ticket.status}</Tag>
              </div>
            }
            extra={<small>{`Criado em: ${ticket.createdAt}`}</small>}
            style={{ marginBottom: 16 }}
          >
            {/* Descrição do ticket */}
            <p>{ticket.description}</p>

            {/* Detalhes do ticket */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Categoria e Prioridade */}
              <div>
                <Tag color="blue">{ticket.category}</Tag>
                <Tag color={ticket.priority === "CRITICAL" ? "red" : "gold"}>
                  {ticket.priority}
                </Tag>
                <small
                  style={{ marginLeft: 8 }}
                >{`Vencimento: ${ticket.dueDate}`}</small>
              </div>

              {/* Botões de Ação */}
              <div>
                <Tooltip title="Marcar como Concluído">
                  <Button
                    type="link"
                    icon={<CheckOutlined />}
                    onClick={() => handleMarkComplete(ticket.id)}
                    disabled={ticket.status === "SOLVED"}
                  />
                </Tooltip>
                <Tooltip title="Excluir">
                  <Popconfirm
                    title="Tem certeza que deseja excluir este ticket?"
                    onConfirm={() => handleDeleteTicket(ticket.id)}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <Button type="link" danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="Ver Anexos">
                  <Button
                    type="link"
                    icon={<PaperClipOutlined />}
                    onClick={() =>
                      handleViewAttachments(ticket.attachments || [])
                    }
                    disabled={
                      !ticket.attachments || ticket.attachments.length === 0
                    }
                  />
                </Tooltip>
              </div>
            </div>
          </Card>
        )}
      />

      {/* Modal para exibir anexos */}
      <Modal
        visible={attachmentsModal.visible}
        title="Anexos"
        footer={null}
        onCancel={handleCloseAttachments}
      >
        {attachmentsModal.attachments.map((url, index) => (
          <div key={index} style={{ marginBottom: 8 }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {`Anexo ${index + 1}`}
            </a>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default UserTickets;
