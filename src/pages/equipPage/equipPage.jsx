import React from "react";
import MainLayout from "../../components/mainLayout";
import NavBar from "../../components/menuPage_Components/NavBar";
import EquipmentRequestForm from "../../components/equipPage_Components/EquipmentRequest";
import SupportTopics from "../../components/equipPage_Components/SupportTopics";
import "./equipPage.scss";

const EquipPage = () => {
  return (
    <>
      <div className="main">
        <div className="main-form">
          <EquipmentRequestForm />
        </div>
        <div className="main-topics">
          <SupportTopics />
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default EquipPage;
