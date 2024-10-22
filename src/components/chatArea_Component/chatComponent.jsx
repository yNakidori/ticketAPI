import React from "react";
import { Avatar, Badge, Input } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./chatComponent.scss";
const friendsList = [
  {
    name: "Gabriel Hoffmann",
    status: "online",
    avatar: "/path/to/avatar1.jpg",
  },
  { name: "BombermanBart", status: "offline", avatar: "/path/to/avatar2.jpg" },
  { name: "kaolhou.dev", status: "online", avatar: "/path/to/avatar3.jpg" },
  { name: "Dom Samu", status: "online", avatar: "/path/to/avatar4.jpg" },
  // Adicione mais amigos conforme necessário
];

const ChatComponent = () => {
  return (
    <div className="discord-chat">
      <div className="search-bar">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Encontre ou comece uma conversa"
          className="search-input"
        />
      </div>
      <div className="menu-sections">
        <div className="menu-item">Amigos</div>
        <div className="menu-item">Nitro</div>
        <div className="menu-item">Loja</div>
      </div>
      <div className="friends-list">
        <div className="friends-header">
          <span>MENSAGENS DIRETAS</span>
          <span className="add-friend">+</span>
        </div>
        {friendsList.map((friend, index) => (
          <div key={index} className="friend-item">
            <Badge dot={friend.status === "online"} offset={[-5, 30]}>
              <Avatar src={friend.avatar} icon={<UserOutlined />} />
            </Badge>
            <div className="friend-info">
              <div className="friend-name">{friend.name}</div>
              <div className={`friend-status ${friend.status}`}>
                {friend.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="user-status">
        <Avatar icon={<UserOutlined />} />
        <div className="user-info">
          <div className="username">Naki.dev</div>
          <div className="status">Disponível</div>
        </div>
        <SettingOutlined className="settings-icon" />
      </div>
    </div>
  );
};

export default ChatComponent;
