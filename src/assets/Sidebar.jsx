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
} from "@ant-design/icons";

export default function SideBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerMenu = (
    <Box sx={{ width: 250, backgroundColor: "#B1AFFF", height: "100%" }}>
      <Menu mode="inline" style={{ width: "100%", backgroundColor: "#B1AFFF" }}>
        <Menu.Item key="home" icon={<BugOutlined />}>
          <Link to="/homePage">Chamados</Link>
        </Menu.Item>

        <Menu.Item key="activity" icon={<FormOutlined />}>
          <Link to="/equipPage">Equipamentos</Link>
        </Menu.Item>

        <Menu.Item key="inventory" icon={<InsertRowAboveOutlined />}>
          <Link to="/inventoryPage">Inventário</Link>
        </Menu.Item>

        <Menu.Item key="setting" icon={<SettingOutlined />}>
          <Link to="/configPage">Configurações</Link>
        </Menu.Item>
      </Menu>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Exibir menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerMenu}
      </Drawer>
    </div>
  );
}
