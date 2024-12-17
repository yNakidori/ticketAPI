import React, { useEffect, useState } from "react";
import { login, resetPassword } from "./authFunction.jsx";
import {
  saveCredentials,
  getSavedCredentials,
  clearSavedCredentials,
} from "./authHelper.jsx";
import { fetchVideo } from "./authVideoFetcher.jsx";
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
import { useNavigate } from "react-router-dom";
import Notification from "../components/notification/notificaiton.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [tipoLogin, setTipoLogin] = useState("phone");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { token } = theme.useToken();

  useEffect(() => {
    // Fetch saved credentials and login automatically
    const savedCredentials = getSavedCredentials();
    if (savedCredentials) {
      login(savedCredentials.email, savedCredentials.password)
        .then(() => navigate("/configPage"))
        .catch(() => clearSavedCredentials());
    }

    // Fetch background video
    fetchVideo().then(setVideoUrl);
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      await login(username, password);
      if (rememberMe) {
        saveCredentials(username, password);
      } else {
        clearSavedCredentials();
      }
      navigate("/configPage");
    } catch (error) {
      toast.warn("Usuário ou senha inválidos");
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Por favor, insira seu email:");
    if (email) {
      resetPassword(email)
        .then(() => toast.success("Email para redefinir senha enviado!"))
        .catch(() => toast.error("Erro ao enviar email."));
    }
  };

  const handleButtonClick = () => {
    window.location.href = "https://app.grupospo.com.br/home";
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
          onFinish={handleLogin}
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
            title: "Voltar para o Web-App!",
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
            <ProFormCheckbox onChange={(e) => setRememberMe(e.target.checked)}>
              Login automático
            </ProFormCheckbox>
            <a onClick={handleForgotPassword} style={{ float: "right" }}>
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
