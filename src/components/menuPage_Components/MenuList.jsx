import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  WechatWorkOutlined,
  SpotifyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/homePage">Chamados</Link>
      </Menu.Item>

      <Menu.Item key="activity" icon={<AppstoreOutlined />}>
        <Link to="/equipPage">Equipamentos</Link>
      </Menu.Item>

      <Menu.Item key="inventory" icon={<WechatWorkOutlined />}>
        <Link to="/inventoryPage">Inventario</Link>
      </Menu.Item>

      {/* <Menu.Item key="spotify" icon={<SpotifyOutlined /> 
      <Menu.Item key="spotify" icon={<SpotifyOutlined />}>
        <Link to="/flowPage">Flow</Link>
      </Menu.Item>
      */}

      <Menu.Item key="setting" icon={<SettingOutlined />}>
        <Link to="/configPage">Configurações</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
