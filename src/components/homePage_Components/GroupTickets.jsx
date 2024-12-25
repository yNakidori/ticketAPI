import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import {
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { Image, message, Modal, Tooltip } from "antd";
import {
  FileImageOutlined,
  DeleteOutlined,
  CheckOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
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
import Lottie from "react-lottie";
import pinkBird from "../../assets/lottie/pinkbird.json";
import "./GroupTickets.scss";

export default function GroupTickets() {
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchTicketsByGroup = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            // Buscar o grupo do usuário
            const userQuery = query(
              collection(db, "users"),
              where("uid", "==", currentUser.uid)
            );
            const userSnapshot = await getDocs(userQuery);
            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              const userGroup = userData.groups?.[0];

              if (userGroup) {
                // Buscar tickets relacionados ao grupo
                const ticketsQuery = query(
                  collection(db, "tickets"),
                  where("group", "==", userGroup)
                );
                const ticketsSnapshot = await getDocs(ticketsQuery);

                const ticketsData = ticketsSnapshot.docs.map(async (doc) => {
                  const ticketData = doc.data();

                  // Buscar informações do criador do ticket
                  const creatorQuery = query(
                    collection(db, "users"),
                    where("uid", "==", ticketData.creatorId)
                  );
                  const creatorSnapshot = await getDocs(creatorQuery);
                  const creatorData =
                    creatorSnapshot.docs.length > 0
                      ? creatorSnapshot.docs[0].data()
                      : {};

                  return {
                    id: doc.id,
                    ...ticketData,
                    creatorName: creatorData.name || "Usuário desconhecido",
                    creatorGroup: creatorData.group || "Sem grupo",
                    creatorAvatar: creatorData.avatar || "",
                  };
                });

                const resolvedTickets = await Promise.all(ticketsData);
                setTickets(resolvedTickets);
              } else {
                message.error("Grupo do usuário não encontrado.");
              }
            } else {
              message.error("Usuário não encontrado.");
            }
          } catch (error) {
            console.error("Erro ao carregar os tickets:", error);
            message.error(`Erro ao carregar os tickets: ${error.message}`);
          }
        }
      });
    };

    fetchTicketsByGroup();
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

  const handleMarkAsReview = async (ticketId) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, { status: "review" });
      message.success("Ticket marcado como para revisão!");
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: "review" } : ticket
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o ticket:", error);
      message.error(`Erro ao marcar como para revisão: ${error.message}`);
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
    <div>
      <h1 className="groupTickets_title">Tickets do Grupo</h1>
      {tickets.length === 0 ? ( // Verifica se não há tickets
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            flexDirection: "column",
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: pinkBird,
            }}
            height={300}
            width={300}
          />
          <Typography variant="h6" style={{ marginTop: "16px", color: "gray" }}>
            Nenhum ticket encontrado.
          </Typography>
        </div>
      ) : (
        <Grid container spacing={3}>
          {tickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ticket.id}>
              <Card
                sx={{
                  bgcolor: ticket.status === "review" ? "#fff8e1" : "#ffffff",
                  maxWidth: 345,
                  margin: "16px auto",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    backgroundColor:
                      ticket.status === "review" ? "#fff3cd" : "#f1fdff",
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      src={ticket.creatorAvatar}
                      sx={{
                        bgcolor:
                          ticket.status === "completed" ? "#4caf50" : red[500],
                      }}
                    >
                      {!ticket.creatorAvatar &&
                        ticket.creatorName?.[0]?.toUpperCase()}
                    </Avatar>
                  }
                  title={
                    <Typography sx={{ fontWeight: "bold" }}>
                      {ticket.creatorName || "Usuário desconhecido"}
                    </Typography>
                  }
                  subheader={
                    <Typography
                      sx={{
                        color:
                          ticket.status === "completed"
                            ? "#4caf50"
                            : "text.secondary",
                      }}
                    >
                      {ticket.group || "Sem grupo"} -{" "}
                      {ticket.status === "completed"
                        ? "Concluído"
                        : ticket.status === "review"
                        ? "Para Revisão"
                        : "Aberto"}
                    </Typography>
                  }
                />

                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {ticket.description || "Sem descrição disponível."}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{ justifyContent: "space-between" }}
                >
                  <Tooltip title="Ver anexos">
                    <IconButton
                      aria-label="Ver anexos"
                      onClick={() => showImages(ticket.attachments)}
                      sx={{
                        color: "#1976d2",
                        "&:hover": { color: "#0d47a1" },
                      }}
                    >
                      <FileImageOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      aria-label="Excluir"
                      onClick={() =>
                        handleDeleteTicket(ticket.id, ticket.attachments)
                      }
                      sx={{
                        color: red[500],
                        "&:hover": { color: "#b71c1c" },
                      }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Marcar como concluído">
                    <IconButton
                      aria-label="Marcar como concluído"
                      onClick={() => handleMarkAsCompleted(ticket.id)}
                      disabled={ticket.status === "completed"}
                      sx={{
                        color:
                          ticket.status === "completed" ? "#9e9e9e" : "#4caf50",
                        "&:hover": {
                          color:
                            ticket.status === "completed"
                              ? "#9e9e9e"
                              : "#2e7d32",
                        },
                      }}
                    >
                      <CheckOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Marcar como para revisão">
                    <IconButton
                      aria-label="Marcar como para revisão"
                      onClick={() => handleMarkAsReview(ticket.id)}
                      disabled={ticket.status === "review"}
                      sx={{
                        color:
                          ticket.status === "review" ? "#9e9e9e" : "#ff9800",
                        "&:hover": {
                          color:
                            ticket.status === "review" ? "#9e9e9e" : "#f57c00",
                        },
                      }}
                    >
                      <ReloadOutlined />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {isModalVisible && (
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
      )}
    </div>
  );
}
