import React from "react";
import List from "./list/List";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import "./chatComponent.scss";

const ChatComponent = () => {
  return (
    <div className="main">
      <div className="master">
        <div className="container">
          <List />
          <Chat />
          <Detail />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
