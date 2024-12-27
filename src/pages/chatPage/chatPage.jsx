import React from "react";
import Lottie from "react-lottie";
import "./chatPage.scss";
import buildingPage from "../../assets/lottie/buildingPage.json";

const ChatPage = () => {
  return (
    <div className="main">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: buildingPage,
        }}
        height={500}
        width={500}
      />
      <h2 className="text">
        Construindo conexões! Nosso chat estará disponível em breve. Fique
        ligado.
      </h2>
    </div>
  );
};

export default ChatPage;
