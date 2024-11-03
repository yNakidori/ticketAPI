import React from "react";
import Avatar from "../../../../../assets/chat/avatar.png";
import "./addUser.scss";

const AddUser = () => {
  return (
    <div className="addUser">
      <form className="add-form">
        <input
          type="text"
          placeholder="Nome"
          name="username"
          className="add-input"
        />
        <button className="add-search-button">Buscar</button>
      </form>
      <div className="add-user">
        <div className="add-detail">
          <img src={Avatar} alt="Avatar" className="add-profile-pic" />
          <span>Nome do usuario</span>
        </div>
        <button className="add-user-button">Adicionar</button>
      </div>
    </div>
  );
};

export default AddUser;
