import React, { useEffect, useState } from "react";
import { Table, Spin, message, Button } from "antd";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import styles from "./EquipmentRequestsList.module.scss";

const EquipmentRequestsList = () => {
  const [equipmentRequests, setEquipmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "equipmentRequests")),
      (snapshot) => {
        const requestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEquipmentRequests(requestsData);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao carregar solicitações:", error);
        message.error("Erro ao carregar solicitações");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleMarkAsCompleted = async (requestId) => {
    try {
      const requestRef = doc(db, "equipmentRequests", requestId);
      await deleteDoc(requestRef);
      message.success("Solicitação removida com sucesso!");

      // Remove a solicitação da lista local após a exclusão
      setEquipmentRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error("Erro ao remover a solicitação:", error);
      message.error("Erro ao remover a solicitação");
    }
  };

  const columns = [
    {
      title: "Nome do Solicitante",
      dataIndex: "nomeSolicitante",
      key: "nomeSolicitante",
    },
    {
      title: "E-mail",
      dataIndex: "emailSolicitante",
      key: "emailSolicitante",
    },
    {
      title: "Tipo de Equipamento",
      dataIndex: "tipoEquipamento",
      key: "tipoEquipamento",
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Urgência",
      dataIndex: "urgencia",
      key: "urgencia",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      render: (text) => (
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Ação",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleMarkAsCompleted(record.id)}
          disabled={record.status === "Concluído"}
        >
          Marcar como Concluído
        </Button>
      ),
    },
  ];

  return (
    <div className={styles["requests-container"]}>
      <h2>Solicitações de Equipamento</h2>
      {loading ? (
        <Spin tip="Carregando solicitações..." />
      ) : (
        <Table
          dataSource={equipmentRequests}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default EquipmentRequestsList;
