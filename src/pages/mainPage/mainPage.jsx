import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Logo from "../../assets/images/SPO.png";
import ParticlesComponent from "../../components/particles";
import "./mainPage.scss";

const MainPage = () => {
  return (
    <div className="App">
      <ParticlesComponent id="particles" />
      <div className="bg">
        <div className="login-box">
          <div className="logo-box">
            <img src={Logo} alt="Logo" className="logo" />
          </div>
          <Link to="/logIn">
            <Button>LogIn</Button>
          </Link>

          {/* <Link to="/signUp"> 
          <Link to="/menuPage">
            <Button>MenuPage</Button>
          </Link>
          */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
