import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  FormOutlined,
  InsertRowAboveOutlined,
  BugOutlined,
  SettingOutlined,
  MenuOutlined,
  WechatOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import AuthUserInfo from "../register/authUserInfo";

export default function SideBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerMenu = (
    <Box
      sx={{
        width: 250,
        background: "rgba(177, 175, 255, 0.24)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(2.5px)",
        WebkitBackdropFilter: "blur(2.5px)",
        height: "100%",
        padding: "10px",
      }}
    >
      {/* Componente de Informações do Usuário */}
      <AuthUserInfo />

      {/* Menu de Navegação */}
      <Menu
        mode="inline"
        style={{
          width: "100%",
          background: "transparent",
          borderRight: "none",
          marginTop: "10px",
        }}
      >
        <Menu.Item
          key="home"
          icon={<BugOutlined style={{ fontSize: "20px", color: "#FFFED3" }} />}
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(139, 136, 229, 0.7)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/homePage"
            style={{
              color: "#FFFED3",
              fontWeight: "bold",
              textDecoration: "none",
              outline: "none",
            }}
          >
            Chamados
          </Link>
        </Menu.Item>

        <Menu.Item
          key="activity"
          icon={<FormOutlined style={{ fontSize: "20px", color: "#FFFED3" }} />}
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(139, 136, 229, 0.7)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/equipPage"
            style={{
              color: "#FFFED3",
              fontWeight: "bold",
              textDecoration: "none",
              outline: "none",
            }}
          >
            Equipamentos
          </Link>
        </Menu.Item>

        <Menu.Item
          key="inventory"
          icon={
            <InsertRowAboveOutlined
              style={{ fontSize: "20px", color: "#FFFED3" }}
            />
          }
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(139, 136, 229, 0.7)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/inventoryPage"
            style={{
              color: "#FFFED3",
              fontWeight: "bold",
              textDecoration: "none",
              outline: "none",
            }}
          >
            Inventário
          </Link>
        </Menu.Item>

        <Menu.Item
          key="chat"
          icon={
            <WechatOutlined style={{ fontSize: "20px", color: "#FFFED3" }} />
          }
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(139, 136, 229, 0.7)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/chatPage"
            style={{
              color: "#FFFED3",
              fontWeight: "bold",
              textDecoration: "none",
              outline: "none",
            }}
          >
            Live Chat
          </Link>
        </Menu.Item>

        <Menu.Item
          key="tasks"
          icon={
            <AuditOutlined
              style={{
                fontSize: "20px",
                color: "#FFFED3",
              }}
            />
          }
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(139, 136, 229, 0.7)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/tasksPage"
            style={{
              color: "#FFFED3",
              fontWeight: "bold",
              textDecoration: "none",
              outline: "none",
            }}
          >
            Tarefas
          </Link>
        </Menu.Item>

        <Menu.Item
          key="setting"
          icon={
            <SettingOutlined
              style={{
                fontSize: "20px",
                color: "#FFFED3",
              }}
            />
          }
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(139, 136, 229, 0.7)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/configPage"
            style={{
              color: "#FFFED3",
              fontWeight: "bold",
              textDecoration: "none",
              outline: "none",
            }}
          >
            Configurações
          </Link>
        </Menu.Item>
      </Menu>
    </Box>
  );

  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          bottom: "100px",
          right: "30px",
          zIndex: 1300,
        }}
      >
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            backgroundColor: "#4E73DF",
            color: "#FFF",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#2A60B4",
              boxShadow: "0 6px 12px rgba(0,0,0,0.5)",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <MenuOutlined />
        </Button>
      </Box>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            background: "rgba(177, 175, 255, 0.24)",
            borderRadius: "16px",
            backdropFilter: "blur(2.5px)",
            WebkitBackdropFilter: "blur(2.5px)",
            paddingTop: "20px",
          },
        }}
      >
        {DrawerMenu}
      </Drawer>
    </div>
  );
}
