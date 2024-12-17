import React, { useState, useEffect } from "react";
import { Card, Avatar, Typography, Skeleton, message } from "antd";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import profileAvatar from "../assets/images/pfp.jpg";

const { Text } = Typography;

const AuthUserInfo = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
              setUserData({
                fullName: userDoc.data().name || "Your name",
                email: currentUser.email || "youremail@gmail.com",
                avatar: userDoc.data().avatar || profileAvatar,
                banner: userDoc.data().banner || null,
              });
            } else {
              message.error("Não foi possível carregar os dados do usuário.");
            }
          } catch (error) {
            message.error("Erro ao buscar dados do usuário.");
          } finally {
            setLoading(false);
          }
          setUser(currentUser);
        } else {
          setLoading(false);
          setUser(null);
        }
      });
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  if (!user || !userData) {
    return (
      <Card>
        <Text>Usuário não logado</Text>
      </Card>
    );
  }

  return (
    <Card
      style={{
        width: 230,
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#FFE9D0",
      }}
      cover={
        userData.banner ? (
          <img
            alt="banner"
            src={userData.banner}
            style={{ height: "100px", objectFit: "cover" }}
          />
        ) : (
          <div style={{ height: "80px", backgroundColor: "#f5f5f5" }}></div>
        )
      }
    >
      <div style={{ textAlign: "center", marginTop: "-32px" }}>
        <Avatar
          size={80}
          src={userData.avatar}
          style={{
            border: "2px solid #BBE9FF",
            backgroundColor: "#87d068",
          }}
        />
        <div style={{ marginTop: "8px" }}>
          <Text strong>{userData.fullName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {userData.email}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default AuthUserInfo;
