import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../assets/images/SPO.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { ConfigProvider } from "antd";
import enUs from "antd/lib/locale/en_US";
import { Button, Tabs, theme } from "antd";
import "./logIn.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/notification/notificaiton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import para estilizar o toast

const LogIn = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [tipoLogin, setTipoLogin] = useState("phone");
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const signIn = ({ username, password }) => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log("Usuário logado:", userCredential.user);
        navigate("/configPage");
      })
      .catch((error) => {
        console.error("Erro ao logar:", error);
        toast.warn("Usuário ou senha inválidos");
      });
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          "https://api.pexels.com/videos/search?query=logistichub&per_page=50",
          {
            headers: {
              Authorization: import.meta.env.VITE_PEXELS_API_KEY,
            },
          }
        );
        const videos = response.data.videos;
        if (videos.length > 0) {
          const randomVideo = videos[Math.floor(Math.random() * videos.length)];
          setVideoUrl(randomVideo.video_files[0].link);
          console.log("Vídeo carregado:", randomVideo.video_files[0].link);
        } else {
          console.log("Nenhum vídeo encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar vídeo do Pexels:", error);
      }
    };

    fetchVideo();
  }, []);

  const handleButtonClick = () => {
    window.location.href = "https://github.com/yNakidori";
  };

  return (
    <ConfigProvider locale={enUs}>
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <LoginFormPage
          onFinish={signIn}
          backgroundVideoUrl={videoUrl}
          title=""
          containerStyle={{
            backgroundColor: "rgba(0, 0, 0,0.65)",
            backdropFilter: "blur(4px)",
          }}
          subTitle="Solução inteligente para gerenciamento de chamados e solicitações"
          activityConfig={{
            style: {
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
              color: token.colorTextHeading,
              borderRadius: 8,
              backgroundColor: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(4px)",
            },
            title: "Conheça o meu trabalho!",
            subTitle:
              "Visite a minha página no GitHub e veja os meus projetos!",
            action: (
              <Button
                size="large"
                style={{
                  borderRadius: 20,
                  background: token.colorBgElevated,
                  color: token.colorPrimary,
                  width: 120,
                }}
                onClick={handleButtonClick}
              >
                Ver mais
              </Button>
            ),
          }}
          actions={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            ></div>
          }
        >
          <img className="logo" src={Logo} />
          <Tabs
            centered
            activeKey={tipoLogin}
            onChange={(activeKey) => setTipoLogin(activeKey)}
          >
            <Tabs.TabPane key={"account"} tab={"Login com Usuário e Senha"} />
          </Tabs>
          {tipoLogin === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                placeholder={"Usuário: admin ou user"}
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o nome de usuário!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                placeholder={"Senha: ant.design"}
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a senha!",
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Login automático
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
            >
              Esqueci a senha
            </a>
          </div>
        </LoginFormPage>
        <Notification />
      </div>
    </ConfigProvider>
  );
};

export default () => {
  return (
    <ConfigProvider locale={enUs}>
      <ProConfigProvider dark>
        <LogIn />
      </ProConfigProvider>
    </ConfigProvider>
  );
};
