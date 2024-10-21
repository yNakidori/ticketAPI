import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col } from 'antd';
import './createdTickets.scss';

const { Meta } = Card;

const TicketsCriados = () => {
    const tickets = [
        { id: 1, title: 'Ticket 1', description: 'Descrição do ticket 1' },
        { id: 2, title: 'Ticket 2', description: 'Descrição do ticket 2' },
        { id: 3, title: 'Ticket 3', description: 'Descrição do ticket 3' },
        { id: 4, title: 'Ticket 4', description: 'Descrição do ticket 4' },
        { id: 5, title: 'Ticket 5', description: 'Descrição do ticket 5' },
        { id: 6, title: 'Ticket 6', description: 'Descrição do ticket 6' },
        { id: 7, title: 'Ticket 7', description: 'Descrição do ticket 7' },
        { id: 8, title: 'Ticket 8', description: 'Descrição do ticket 8' },
        { id: 9, title: 'Ticket 9', description: 'Descrição do ticket 9' },
        { id: 10, title: 'Ticket 10', description: 'Descrição do ticket 10' },
        // adicione mais tickets conforme necessário
    ];

    return (
        <div className="tickets-scroll-container">
            <Row gutter={[16, 16]}>
                {tickets.map(ticket => (
                    <Col key={ticket.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            className="message-card"
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
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default TicketsCriados;
