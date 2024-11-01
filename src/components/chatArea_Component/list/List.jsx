import React from "react";
import ChatList from "./chatList/ChatList";
import UserInfo from "./userInfo/UserInfo";
import "./List.scss";

const List = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
