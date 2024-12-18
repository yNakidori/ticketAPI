import React from "react";
import { Card, Avatar, Typography, Button, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const TicketCard = ({ ticket, onViewImages }) => {
  const { creatorName, creatorAvatar, group, details, banner, attachments } =
    ticket;

  return (
    <Card
      hoverable
      cover={
        banner ? (
          <img
            alt="Banner do Ticket"
            src={banner}
            style={{ height: "120px", objectFit: "cover" }}
          />
        ) : null
      }
      style={{
        width: 300,
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Avatar Centralizado */}
      <div style={{ textAlign: "center", marginTop: "-40px" }}>
        <Avatar
          size={80}
          src={creatorAvatar || "https://via.placeholder.com/80"} // Fallback caso não tenha avatar
          style={{
            border: "4px solid white",
          }}
        />
      </div>

      {/* Nome e Grupo */}
      <Meta
        title={creatorName || "Usuário Desconhecido"}
        description={`Grupo: ${group || "N/A"}`} // Correção da interpolação
        style={{
          textAlign: "center",
          marginTop: "12px",
        }}
      />

      {/* Detalhes do Ticket */}
      <Typography.Paragraph
        ellipsis={{ rows: 2 }}
        style={{ marginTop: "12px", textAlign: "center" }}
      >
        {details || "Sem detalhes fornecidos."}
      </Typography.Paragraph>

      {/* Ações */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "16px",
        }}
      >
        {/* Botão de Ver Imagens */}
        <Tooltip title="Ver Anexos">
          <Button
            icon={<PictureOutlined />}
            onClick={() => onViewImages(attachments || [])}
          />
        </Tooltip>

        {/* Botão de Concluir Ticket */}
        <Tooltip title="Concluir Ticket">
          <Button type="primary" icon={<CheckCircleOutlined />} />
        </Tooltip>

        {/* Botão de Cancelar Ticket */}
        <Tooltip title="Cancelar Ticket">
          <Button type="danger" icon={<CloseCircleOutlined />} />
        </Tooltip>
      </div>
    </Card>
  );
};

export default TicketCard;
