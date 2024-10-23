import React from "react";
import { Card } from "antd";
import styles from "./SupportCard.module.scss";

const SupportCard = ({ icon, title }) => {
  return (
    <Card className={styles["support-card"]} hoverable>
      <div className={styles["icon-container"]}>{icon}</div>
      <div className={styles["title"]}>{title}</div>
    </Card>
  );
};

export default SupportCard;
