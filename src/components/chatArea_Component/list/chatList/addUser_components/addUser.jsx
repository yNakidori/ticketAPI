import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../../../firebase/firebase"; // Certifique-se do caminho correto
import Avatar from "../../../../../assets/chat/avatar.png";
import "./addUser.scss";

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const q = query(
          usersCollection,
          where("uid", "!=", auth.currentUser?.uid)
        ); // Exclui o usuário atual
        const querySnapshot = await getDocs(q);
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddChat = async (selectedUser) => {
    try {
      const chatId = `${auth.currentUser.uid}_${selectedUser.uid}`;
      const chatRef = doc(db, "chats", chatId);

      await setDoc(chatRef, {
        users: [auth.currentUser.uid, selectedUser.uid],
        messages: [], // Pode ser preenchido no futuro
        createdAt: new Date(),
      });

      alert(`Chat com ${selectedUser.name} criado com sucesso!`);
    } catch (error) {
      console.error("Erro ao criar o chat:", error);
    }
  };

  return (
    <div className="addUser">
      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Procurar usuário"
          name="username"
          className="add-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="add-user-list">
        {users
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <div className="add-user" key={user.id}>
              <div className="add-detail">
                <img
                  src={user.avatar || Avatar}
                  alt="Avatar"
                  className="add-profile-pic"
                />
                <span>{user.name}</span>
              </div>
              <button
                className="add-user-button"
                onClick={() => handleAddChat(user)}
              >
                Adicionar
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddUser;
