import React, { useEffect, useState } from 'react';
import Logo from '../components/menuPage_Components/Logo';
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import axios from 'axios';

const estilosIcone = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const LogIn = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [tipoLogin, setTipoLogin] = useState('phone');
  const { token } = theme.useToken();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          'https://api.pexels.com/videos/search?query=nature&per_page=50',
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
          console.log('Vídeo carregado:', randomVideo.video_files[0].link);
        } else {
          console.log('Nenhum vídeo encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar vídeo do Pexels:', error);
      }
    };

    fetchVideo();
  }, []);

  const handleButtonClick = () => {
    window.location.href = 'https://github.com/yNakidori';
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundVideoUrl={videoUrl}
        logo={<Logo />}
        title="ticketAPI"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="Solução gratuita para gerenciamento de chamados, equipes"
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(4px)',
          },
          title: 'Conheça o meu trabalho!',
          subTitle: 'Visite a minha página no GitHub e veja os meus projetos!',
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                Outras formas de login
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...estilosIcone, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...estilosIcone, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...estilosIcone, color: '#1890ff' }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={tipoLogin}
          onChange={(activeKey) => setTipoLogin(activeKey)}
        >
          <Tabs.TabPane key={'account'} tab={'Login com Usuário e Senha'} />
          <Tabs.TabPane key={'phone'} tab={'Login com Celular'} />
        </Tabs>
        {tipoLogin === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Usuário: admin ou user'}
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o nome de usuário!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Senha: ant.design'}
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a senha!',
                },
              ]}
            />
          </>
        )}
        {tipoLogin === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'Número de Celular'}
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o número de celular!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: 'Formato do número de celular incorreto!',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'Por favor, insira o código de verificação'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'Reenviar código'}`;
                }
                return 'Reenviar código';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o código de verificação!',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('Código de verificação enviado! Código: 1234');
              }}
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
              float: 'right',
            }}
          >
            Esqueci a senha
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <LogIn />
    </ProConfigProvider>
  );
};
