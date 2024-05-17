import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import './sideBar.css';
import Logo from './Logo';
import MenuList from './MenuList';
import ToggleThemeButton from './ToggleThemeButton';

const { Header, Sider, Content } = Layout;

const SideBar = () => {
    const [darkTheme, setDarkTheme] = useState(true)
    const [collapsed, setCollapsed] = useState(false)

    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsed={collapsed} theme={darkTheme ? 'dark' : 'light'} className='sidebar'>
                <Logo />
                <MenuList darkTheme={darkTheme} />
                <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, background: darkTheme ? '#001529' : '#ffffff' }}>
                    <Button type='text' className='toggle' onClick={() => setCollapsed(!collapsed)} icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />} />
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        <div>
                            <h1>hello</h1>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SideBar;
