import React from "react";
import MainLayout from "../../components/mainLayout";
import EquipmentRequestForm from "../../components/equipPage_Components/EquipmentRequest";
import SupportTopics from "../../components/equipPage_Components/SupportTopics";
import "./equipPage.scss";

const EquipPage = () => {
  return (
    <>
      <MainLayout>
        <div className="main">
          <div className="main-form">
            <EquipmentRequestForm />
          </div>
          <div className="main-topics">
            <SupportTopics />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default EquipPage;
