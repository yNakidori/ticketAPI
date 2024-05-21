// TicketsCriados.js
import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const TicketsCriados = () => {
    const tickets = [
        { id: 1, title: 'Ticket 1', description: 'Descrição do ticket 1' },
        { id: 2, title: 'Ticket 2', description: 'Descrição do ticket 2' },
    ];

    return (
        <div className="tickets-container">
            {tickets.map(ticket => (
                <Card
                    key={ticket.id}
                    className="message-card"
                    style={{
                        width: 300,
                        marginBottom: 20,
                    }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${ticket.id}`} />}
                        title={ticket.title}
                        description={ticket.description}
                    />
                </Card>
            ))}
        </div>
    );
}

export default TicketsCriados;
