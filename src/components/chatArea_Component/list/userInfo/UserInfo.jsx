import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Avatar from "../../../../assets/chat/avatar.png";
import More from "../../../../assets/chat/more.png";
import Video from "../../../../assets/chat/video.png";
import Edit from "../../../../assets/chat/edit.png";
import "./UserInfo.scss";

const UserInfo = () => {
  const [user, setUser] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUser({
                name: userData.name || "Usuário",
                avatar: userData.avatar || "",
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

    fetchUserInfo();
  }, []);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={user.avatar} alt="avatar" className="avatar" />
        <h2>{user.name}</h2>
      </div>
      <div className="icons">
        <img src={More} alt="more" className="more" />
        <img src={Video} alt="video" className="video" />
        <img src={Edit} alt="edit" className="edit" />
      </div>
    </div>
  );
};

export default UserInfo;
