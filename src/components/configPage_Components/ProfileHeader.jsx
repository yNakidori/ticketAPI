import React, { useState, useEffect } from "react";
import { Row, Col, Avatar } from "antd";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./ProfileHeader.scss";

const ProfileHeader = () => {
  const [data, setData] = useState({
    fullName: "",
    imageURL: "",
    bannerURL: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setData({
                fullName: userData.name || "",
                imageURL: userData.avatar || "",
                bannerURL: userData.banner || "",
              });
            } else {
              console.error("Usuário não encontrado no banco de dados.");
            }
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
          }
        }
      });
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-header">
      <div
        className="profile-banner"
        style={{
          backgroundImage: `url(${data.bannerURL || ""})`,
        }}
      />
      <div className="profile-info">
        <Avatar size={96} src={data.imageURL} className="profile-avatar" />
        <h2 className="profile-name">{data.fullName}</h2>
      </div>
    </div>
  );
};

export default ProfileHeader;
