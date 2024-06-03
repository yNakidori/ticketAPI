import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../components/menuPage_Components/Logo';
import {
    LockOutlined,
    MobileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUs from 'antd/lib/locale/en_US';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const estilosIcone = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const SignIn = () => {

    //Firebase auth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Usuário logado:', userCredential.user);
            }).catch((error) => {
                console.error('Erro ao logar:', error);
            })
    }

    // Restante do código
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
        <ConfigProvider locale={enUs}>
            <div
                style={{
                    backgroundColor: 'white',
                    height: '100vh',
                }}
            >
                <LoginFormPage
                    onSubmit={signIn}
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
                >
                    <Tabs
                        centered
                        activeKey={tipoLogin}
                        onChange={(activeKey) => setTipoLogin(activeKey)}
                    >
                        <Tabs.TabPane key={'account'} tab={'Conta com Email e Senha'} />
                        <Tabs.TabPane key={'phone'} tab={'Conta com Celular'} />
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
                                value={email}
                                onMetaChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onMetaChange={(e) => setPassword(e.targe.value)}
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
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                marginBottom: 24,
                            }}>
                                <Divider />
                                <Link to="/logIn">
                                    <Button>
                                        Já possui uma conta? Entre agora!
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </LoginFormPage>


            </div>
        </ConfigProvider>
    );
};

export default () => {
    return (
        <ConfigProvider locale={enUs}>
            <ProConfigProvider dark>
                <SignIn />
            </ProConfigProvider>
        </ConfigProvider>
    );
};
