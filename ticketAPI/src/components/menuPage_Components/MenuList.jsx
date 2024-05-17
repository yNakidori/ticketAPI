import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined, AppstoreOutlined, WechatWorkOutlined, SpotifyOutlined, SettingOutlined, BarsOutlined } from '@ant-design/icons'

const MenuList = ({ darkTheme }) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
            <Menu.Item key='home' icon={<HomeOutlined />}>
                Home
            </Menu.Item>

            <Menu.Item key='activity' icon={<AppstoreOutlined />}>
                Atividades
            </Menu.Item>
            <Menu.SubMenu key='subtasks' icon={<BarsOutlined />} title='Tasks'>
                <Menu.Item key='task-1'>Meus registros</Menu.Item>
                <Menu.Item key='task-2'>Tickets abertos</Menu.Item>
                <Menu.Item key='task-3'>Minha área</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key='progress' icon={<WechatWorkOutlined />}>
                Chats
            </Menu.Item>
            <Menu.Item key='payment' icon={<SpotifyOutlined />}>
                Flow
            </Menu.Item>
            <Menu.Item key='setting' icon={<SettingOutlined />}>
                Configurações
            </Menu.Item>
        </Menu>
    )
}


export default MenuList