import React from "react";
import SideBar from "./menuPage_Components/sideBar";

const MainLayout = ({ children }) => {
  return <SideBar>{children}</SideBar>;
};

export default MainLayout;
