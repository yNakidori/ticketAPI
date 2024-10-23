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
    { icon: <LockOutlined />, title: "Esqueceu a senha da Conta Apple" },
    { icon: <ToolOutlined />, title: "Reparo da Apple" },
    { icon: <FileTextOutlined />, title: "Assinaturas e cobrança" },
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
