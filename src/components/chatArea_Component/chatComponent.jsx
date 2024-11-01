import React from "react";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import List from "./list/List";
import "./chatComponent.scss";

const ChatComponent = () => {
  return (
    <>
      <div className="body">
        <div className="chat-container">
          <List />
          <Chat />
          <Detail />
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
