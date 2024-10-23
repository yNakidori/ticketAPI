import React from "react";
import MainLayout from "../../components/mainLayout";
import EquipmentRequestForm from "../../components/equipPage_Components/EquipmentRequest";
import SupportTopics from "../../components/equipPage_Components/SupportTopics";

const EquipPage = () => {
  return (
    <MainLayout>
      <div>
        <h1>Equipamentos</h1>
        <EquipmentRequestForm />
        <SupportTopics />
      </div>
    </MainLayout>
  );
};

export default EquipPage;
