import React from "react";
import SupportCard from "./SupportCard";
import {
  LockOutlined,
  ToolOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import styles from "./SupportTopics.module.scss";

const SupportTopics = () => {
  const topics = [
    { icon: <LockOutlined />, title: "Esqueceu a senha de alguma conta?" },
    { icon: <ToolOutlined />, title: "Reparo de equipamentos" },
    { icon: <FileTextOutlined />, title: "Solicitação de acessos" },
  ];

  return (
    <div className={styles["support-topics-container"]}>
      {topics.map((topic, index) => (
        <SupportCard key={index} icon={topic.icon} title={topic.title} />
      ))}
    </div>
  );
};

export default SupportTopics;
