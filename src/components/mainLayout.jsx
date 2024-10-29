import React from "react";
import SideBar from "./menuPage_Components/sideBar";
import "./mainLayout.scss";

const MainLayout = ({ children }) => {
  return (
    <>
      <SideBar>
        <div className="main-area">{children}</div>
      </SideBar>
      ;
    </>
  );
};

export default MainLayout;
