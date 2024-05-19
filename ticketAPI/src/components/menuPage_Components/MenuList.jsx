import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined, AppstoreOutlined, WechatWorkOutlined, SpotifyOutlined, SettingOutlined, BarsOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const MenuList = ({ darkTheme }) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
            <Menu.Item key='home' icon={<HomeOutlined />}>
                <Link to='/homePage'>Home</Link>
            </Menu.Item>
            <Menu.Item key='activity' icon={<AppstoreOutlined />}>
                Atividades
            </Menu.Item>
            <Menu.SubMenu key='subtasks' icon={<BarsOutlined />} title='Tasks'>
                <Menu.Item key='task-1'>Meus registros</Menu.Item>
                <Menu.Item key='task-2'>Tickets abertos</Menu.Item>
                <Menu.Item key='task-3'>Minha área</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key='chat' icon={<WechatWorkOutlined />}>
                <Link to='/chatPage'>Chat</Link>
            </Menu.Item>
            <Menu.Item key='spotify' icon={<SpotifyOutlined />}>
                <Link to='/flowPage'>Flow</Link>
            </Menu.Item>
            <Menu.Item key='setting' icon={<SettingOutlined />}>
                <Link to='/configPage'>Configurações</Link>
            </Menu.Item>
        </Menu>
    )
}


export default MenuList