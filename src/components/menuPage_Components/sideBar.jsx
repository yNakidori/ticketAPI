import React, { useState, useEffect } from "react";
import { Button, Layout } from "antd";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import "./sideBar.css";
import MenuList from "./MenuList";

const { Header, Sider, Content } = Layout;

const SideBar = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        theme={darkTheme ? "dark" : "light"}
        className="sidebar"
        width={250}
      >
        <MenuList darkTheme={darkTheme} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: darkTheme ? "#466876" : "#ffffff" }}
        >
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            disabled
          />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
