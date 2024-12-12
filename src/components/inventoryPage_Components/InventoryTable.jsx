import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, Input, Form } from "antd";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./InventoryTable.scss";

const InventoryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Função para buscar dados do Firebase
  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const estoqueAtual = data.estoqueAtual || 0; // Estoque atual no banco de dados
        const entrada = data.entrada || 0;
        const saida = data.saida || 0;
        const estoqueInicial = estoqueAtual - entrada + saida; // Calcula o estoque inicial com base nas movimentações

        return {
          key: doc.id,
          data: new Date(data.data).toLocaleDateString(),
          tipo: data.tipo,
          produto: data.nome,
          estoqueAtual,
          descricao: data.descricao,
          solicitante: data.solicitante || "N/A",
          setor: data.setor,
          codigo: data.codigo || "N/A",
          estoqueInicial,
          entrada,
          saida,
          alerta: estoqueAtual < 10 ? "Baixo" : "OK",
        };
      });
      setData(items);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleUpdate = async (key, novoEstoqueAtual, entrada, saida) => {
    try {
      const productRef = doc(db, "products", key);
      await updateDoc(productRef, {
        estoqueAtual: novoEstoqueAtual,
        entrada,
        saida,
      });
      fetchData();
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
    }
  };

  // Definindo as colunas
  const columns = [
    { title: "Data", dataIndex: "data", key: "data" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Produto", dataIndex: "produto", key: "produto" },
    { title: "Estoque Atual", dataIndex: "estoqueAtual", key: "estoqueAtual" },
    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
    { title: "Solicitante", dataIndex: "solicitante", key: "solicitante" },
    { title: "Setor/Unidade", dataIndex: "setor", key: "setor" },
    { title: "Código", dataIndex: "codigo", key: "codigo" },
    {
      title: "Estoque Inicial",
      dataIndex: "estoqueInicial",
      key: "estoqueInicial",
    },
    { title: "Entrada", dataIndex: "entrada", key: "entrada" },
    { title: "Saída", dataIndex: "saida", key: "saida" },
    {
      title: "Alerta de Estoque",
      dataIndex: "alerta",
      key: "alerta",
      render: (alerta) => (
        <Tag color={alerta === "Baixo" ? "red" : "green"}>{alerta}</Tag>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <button onClick={() => handleEdit(record)}>Editar Estoque</button>
      ),
    },
  ];

  return (
    <div className="inventory-table-container">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      {selectedRecord && (
        <EditStockModal
          visible={isModalVisible}
          record={selectedRecord}
          onClose={() => setIsModalVisible(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const EditStockModal = ({ visible, onClose, onUpdate, record }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const { entrada, saida } = values;
    const novoEstoqueAtual =
      record.estoqueAtual + (entrada || 0) - (saida || 0);
    onUpdate(record.key, novoEstoqueAtual, entrada, saida);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={`Editar Estoque: ${record.produto}`}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item label="Entrada" name="entrada">
          <Input type="number" min={0} placeholder="Quantidade de entrada" />
        </Form.Item>
        <Form.Item label="Saída" name="saida">
          <Input type="number" min={0} placeholder="Quantidade de saída" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryTable;
