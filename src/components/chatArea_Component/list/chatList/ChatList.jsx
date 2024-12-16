import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase"; // Certifique-se do caminho correto
import AddUser from "../chatList/addUser_components/addUser";
import Avatar from "../../../../assets/chat/avatar.png";
import Search from "../../../../assets/chat/search.png";
import Plus from "../../../../assets/chat/plus.png";
import Minus from "../../../../assets/chat/minus.png";
import "./ChatList.scss";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]); // Armazena os chats
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca
  const [usersData, setUsersData] = useState({}); // Cache para os dados dos usuários

  // Busca todos os chats onde o usuário atual está incluso
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatsRef = collection(db, "chats");
        const q = query(
          chatsRef,
          where("users", "array-contains", auth.currentUser?.uid)
        );
        const querySnapshot = await getDocs(q);

        const chatList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChats(chatList);

        // Busca os dados dos usuários envolvidos nos chats
        const usersSet = new Set();
        chatList.forEach((chat) => {
          chat.users.forEach((uid) => {
            if (uid !== auth.currentUser?.uid) usersSet.add(uid); // Outros participantes
          });
        });

        const userDataPromises = Array.from(usersSet).map(async (uid) => {
          const userDoc = await getDoc(doc(db, "users", uid));
          return { uid, data: userDoc.exists() ? userDoc.data() : null };
        });

        const userDataResults = await Promise.all(userDataPromises);
        const usersDataMap = {};
        userDataResults.forEach((result) => {
          usersDataMap[result.uid] = result.data;
        });

        setUsersData(usersDataMap);
      } catch (error) {
        console.error("Erro ao buscar chats e dados dos usuários:", error);
      }
    };

    fetchChats();
  }, []);

  const handleIconClick = () => {
    setAddMode((prev) => !prev);
  };

  return (
    <div className="chatList">
      {/* Barra de busca */}
      <div className="search">
        <div className="searchBar">
          <img src={Search} alt="search" className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <img
          src={addMode ? Minus : Plus}
          alt="plus"
          className={`plusIcon ${addMode ? "minus-icon" : "plus-icon"}`}
          onClick={handleIconClick}
        />
      </div>

      {/* Lista dos chats */}
      <div className="chat-list">
        {chats
          .filter((chat) => {
            const otherUserUid = chat.users.find(
              (uid) => uid !== auth.currentUser?.uid
            );
            const otherUser = usersData[otherUserUid]?.name || "";
            return otherUser.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((chat) => {
            const otherUserUid = chat.users.find(
              (uid) => uid !== auth.currentUser?.uid
            );
            const otherUser = usersData[otherUserUid];

            return (
              <div className="chat-item" key={chat.id}>
                <img
                  src={otherUser?.avatar || Avatar} // Foto do outro usuário ou imagem padrão
                  alt="avatar"
                  className="chat-profile"
                />
                <div className="chat-texts">
                  <span>{otherUser?.name || "Usuário Desconhecido"}</span>
                  <p>Última mensagem...</p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Componente de adicionar usuários */}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
