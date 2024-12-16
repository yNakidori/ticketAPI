import React, { useEffect, useState } from "react";
import SideBar from "../../assets/Sidebar";
import EquipmentRequestForm from "../../components/equipPage_Components/EquipmentRequest";
import SupportTopics from "../../components/equipPage_Components/SupportTopics";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./equipPage.scss";

const EquipPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || "Usuário",
          email: user.email,
        });
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <SideBar />
      <div className="main">
        <div className="main-form">
          <EquipmentRequestForm userInfo={userInfo} />
        </div>
        <div className="main-topics">
          <SupportTopics />
        </div>
      </div>
    </>
  );
};

export default EquipPage;
