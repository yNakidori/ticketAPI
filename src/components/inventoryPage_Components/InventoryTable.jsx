import React from "react";
import { Table, Tag } from "antd";
import "./InventoryTable.scss";

const InventoryTable = () => {
  // Definindo as colunas
  const columns = [
    { title: "Data", dataIndex: "data", key: "data" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Produto", dataIndex: "produto", key: "produto" },
    { title: "Quantidade", dataIndex: "quantidade", key: "quantidade" },
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
    { title: "Estoque Final", dataIndex: "estoqueFinal", key: "estoqueFinal" },
    {
      title: "Alerta de Estoque",
      dataIndex: "alerta",
      key: "alerta",
      render: (alerta) => (
        <Tag color={alerta === "Baixo" ? "red" : "green"}>{alerta}</Tag>
      ),
    },
  ];

  // Dados de exemplo
  const data = [
    {
      key: "1",
      data: "01/12/2024",
      tipo: "Entrada",
      produto: "Produto X",
      quantidade: 50,
      descricao: "Descrição breve",
      solicitante: "João Silva",
      setor: "Unidade A",
      codigo: "123456",
      estoqueInicial: 100,
      entrada: 50,
      saida: 0,
      estoqueFinal: 150,
      alerta: "OK",
    },
    {
      key: "2",
      data: "02/12/2024",
      tipo: "Saída",
      produto: "Produto Y",
      quantidade: 30,
      descricao: "Descrição detalhada",
      solicitante: "Maria Santos",
      setor: "Unidade B",
      codigo: "654321",
      estoqueInicial: 80,
      entrada: 0,
      saida: 30,
      estoqueFinal: 50,
      alerta: "Baixo",
    },
    {
      key: "2",
      data: "02/12/2024",
      tipo: "Saída",
      produto: "Produto Y",
      quantidade: 30,
      descricao: "Descrição detalhada",
      solicitante: "Maria Santos",
      setor: "Unidade B",
      codigo: "654321",
      estoqueInicial: 80,
      entrada: 0,
      saida: 30,
      estoqueFinal: 50,
      alerta: "Baixo",
    },
  ];

  return (
    <div className="inventory-table-container">
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default InventoryTable;
