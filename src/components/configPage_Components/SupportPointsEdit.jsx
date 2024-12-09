import React, { useEffect, useState } from "react";
import { Card, List, Button, Popconfirm, message, Tag, Modal } from "antd";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import AddSupportPointModal from "./AddSuportPointModal";
import "./SupportPointsEdit.scss";

const SupportPointsEdit = () => {
  const [supportPoints, setSupportPoints] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Recupera pontos de apoio do Firestore em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "supportPoints"),
      (snapshot) => {
        const pointsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSupportPoints(pointsData);
      }
    );
    return () => unsubscribe();
  }, []);

  // Função para excluir ponto de apoio
  const handleDeleteSupportPoint = async (pointId) => {
    try {
      await deleteDoc(doc(db, "supportPoints", pointId));
      message.success("Ponto de apoio excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir ponto de apoio:", error);
      message.error("Erro ao excluir ponto de apoio.");
    }
  };

  return (
    <Card
      bordered={false}
      title={<h6 className="font-semibold m-0"> Pontos de Apoio</h6>}
      className="support-point-management-card"
      extra={
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Adicionar Ponto de Apoio
        </Button>
      }
    >
      <div className="list-container">
        <List
          dataSource={supportPoints}
          renderItem={(point) => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Tem certeza que deseja excluir este ponto de apoio?"
                  onConfirm={() => handleDeleteSupportPoint(point.id)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button type="link" danger>
                    Excluir
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={`${point.cityname} (${point.abbreviation})`}
                description={
                  <>
                    <p>Responsável: {point.owner}</p>
                    <p>Telefone: {point.supphone || "Não informado"}</p>
                    <Tag color="blue">Ativo</Tag>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>

      {/* Modal para adicionar ponto de apoio */}
      <AddSupportPointModal
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      />
    </Card>
  );
};

export default SupportPointsEdit;
