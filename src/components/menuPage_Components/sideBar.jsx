import React, { useState } from "react";
import { Layout } from "antd";
import "./sideBar.css";
import MenuList from "./MenuList";

const { Header, Sider, Content } = Layout;

const SideBar = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false); // Estado para colapso da sidebar

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)} // Atualiza o estado ao colapsar
        className={`sidebar ${collapsed ? "floating" : ""} ${
          darkTheme ? "dark" : ""
        }`}
        width={250}
      >
        <MenuList className="menu-list" />
      </Sider>
      <Layout>
        <Header
          className="site-layout-header"
          style={{
            backgroundColor: darkTheme ? "#466876" : "#ffffff",
          }}
        ></Header>
        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
          <div className="site-layout-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
