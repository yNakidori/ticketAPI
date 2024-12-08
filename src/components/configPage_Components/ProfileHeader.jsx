import React, { useState, useEffect } from "react";
import { Row, Col, Card, Avatar } from "antd";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
    <div className="sec-1">
      <Card className="card-profile-head">
        <div
          className="profile-banner"
          style={{
            position: "relative",
            width: "100%",
            height: "200px",
            backgroundImage: `url(${data.bannerURL || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "8px",
          }}
        />
        <Row
          justify="center"
          align="middle"
          gutter={[24, 0]}
          style={{ marginTop: "-40px" }}
        >
          <Col>
            <Avatar
              size={74}
              src={data.imageURL}
              style={{ border: "3px solid white" }}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "10px" }}>
          <Col>
            <h4 className="font-semibold m-0">{data.fullName}</h4>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfileHeader;
