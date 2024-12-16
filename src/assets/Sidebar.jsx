import * as React from "react";
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
} from "@ant-design/icons";

export default function SideBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerMenu = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#B1AFFF",
        height: "100%",
        padding: "10px",
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Menu
        mode="inline"
        style={{
          width: "100%",
          backgroundColor: "#B1AFFF",
          borderRight: "none",
          borderRadius: "8px",
        }}
      >
        {/* Itens de Navegação com Estilos de Hover */}
        <Menu.Item
          key="home"
          icon={<BugOutlined style={{ fontSize: "20px", color: "#FFFED3" }} />}
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#8B88E5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link to="/homePage" style={{ color: "#FFFED3", fontWeight: "bold" }}>
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#8B88E5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/equipPage"
            style={{ color: "#FFFED3", fontWeight: "bold" }}
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#8B88E5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/inventoryPage"
            style={{ color: "#FFFED3", fontWeight: "bold" }}
          >
            Inventário
          </Link>
        </Menu.Item>

        <Menu.Item
          key="setting"
          icon={
            <SettingOutlined style={{ fontSize: "20px", color: "#FFFED3" }} />
          }
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#8B88E5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <Link
            to="/configPage"
            style={{ color: "#FFFED3", fontWeight: "bold" }}
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
          zIndex: 1300, // Garante que o botão esteja acima de outros elementos
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
            backgroundColor: "#B1AFFF",
            borderRadius: "10px",
            paddingTop: "20px",
          },
        }}
      >
        {DrawerMenu}
      </Drawer>
    </div>
  );
}
