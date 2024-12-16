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
import { Button, Tabs, Spin, theme } from "antd";
import "./logIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "./userStore";
import Notification from "../components/notification/notificaiton";
import { toast } from "react-toastify";
import BackgroundVideo from "./BackgroundVideo";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [tipoLogin, setTipoLogin] = useState("account");
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();
  const navigate = useNavigate();

  // Zustand store
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  const messages = {
    emptyFields: "Por favor, preencha todos os campos.",
    invalidCredentials: "Usuário ou senha inválidos",
  };

  const signIn = async ({ username, password }) => {
    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const uid = userCredential.user.uid;

      // Fetch user info and update Zustand state
      await fetchUserInfo(uid);

      // Espera o estado ser atualizado antes de navegar
      if (currentUser) {
        console.log("Logado com sucesso:", currentUser);
        navigate("/configPage");
      } else {
        console.log("Erro ao carregar os dados do usuário.");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      toast.warn("Usuário ou senha inválidos");
    }
  };

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
        <BackgroundVideo setVideoUrl={setVideoUrl} />
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
        {loading && (
          <div className="loading-overlay">
            <Spin size="large" />
          </div>
        )}
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
