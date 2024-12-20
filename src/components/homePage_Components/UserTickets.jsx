import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TicketCard() {
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
            const ticketsData = ticketsSnapshot.docs.map(async (doc) => {
              const ticketData = doc.data();
              const userQuery = query(
                collection(db, "users"),
                where("uid", "==", ticketData.creatorId)
              );
              const userSnapshot = await getDocs(userQuery);
              const userData =
                userSnapshot.docs.length > 0 ? userSnapshot.docs[0].data() : {};
              return {
                id: doc.id,
                ...ticketData,
                creatorName: userData.name,
                creatorGroup: userData.group,
                creatorAvatar: userData.avatar,
              };
            });
            const resolvedTickets = await Promise.all(ticketsData);
            setTickets(resolvedTickets);
          } catch (error) {
            console.error("Erro ao carregar os tickets", error);
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
      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={ticket.id}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "16px auto",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
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
                          ticket.status === "completed" ? "#9e9e9e" : "#2e7d32",
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
                      color: ticket.status === "review" ? "#9e9e9e" : "#ff9800",
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
