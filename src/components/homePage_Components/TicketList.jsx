import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { db, auth } from "../../firebase/firebase"; // Certifique-se de importar o auth também
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obter informações do usuário logado
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );

        onSnapshot(userQuery, (snapshot) => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            setUserInfo({
              name: userData.name,
              email: userData.email,
              group: userData.group || null,
            });
          }
        });

        // Obter tickets relacionados ao grupo do usuário
        const ticketsQuery = query(
          collection(db, "tickets"),
          where("group", "==", userInfo?.group)
        );

        onSnapshot(ticketsQuery, (snapshot) => {
          const ticketsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTickets(ticketsData);
        });
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [userInfo]);

  const markAsCompleted = async (ticketId) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, {
        status: "completed",
      });
      message.success("Ticket marcado como concluído!");
    } catch (error) {
      console.error("Erro ao marcar o ticket como concluído:", error);
      message.error("Erro ao marcar o ticket.");
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      await deleteDoc(doc(db, "tickets", ticketId));
      message.success("Ticket deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar o ticket:", error);
      message.error("Erro ao deletar o ticket.");
    }
  };

  const columns = [
    {
      title: "Criador",
      dataIndex: "creatorName",
      key: "creatorName",
    },
    {
      title: "E-mail",
      dataIndex: "creatorEmail",
      key: "creatorEmail",
    },
    {
      title: "Grupo",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text.seconds * 1000).toLocaleString(),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => markAsCompleted(record.id)}
            disabled={record.status === "completed"}
          >
            Marcar como concluído
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                title: "Tem certeza?",
                content: "Você deseja realmente deletar este ticket?",
                onOk: () => deleteTicket(record.id),
              });
            }}
          >
            Deletar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={tickets}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TicketList;
