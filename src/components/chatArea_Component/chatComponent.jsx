import React from "react";
import List from "./list/List";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";

const ChatComponent = () => {
  return (
    <div className="container">
      <List />
      <Chat />
      <Detail />
    </div>
  );
};

export default ChatComponent;
