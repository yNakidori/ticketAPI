import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col } from 'antd'; // Importe o Row e o Col do Ant Design
import './createdTickets.scss';

const { Meta } = Card;

const TicketsCriados = () => {
    const tickets = [
        { id: 1, title: 'Ticket 1', description: 'Descrição do ticket 1' },
        { id: 2, title: 'Ticket 2', description: 'Descrição do ticket 2' },
        { id: 3, title: 'Ticket 3', description: 'Descrição do ticket 3' },
        { id: 4, title: 'Ticket 4', description: 'Descrição do ticket 4' },
    ];

    return (
        <div className="tickets-container">
            <Row gutter={[16, 16]}> {/* Define o espaçamento entre os cards */}
                {tickets.map(ticket => (
                    <Col key={ticket.id} xs={24} sm={12} md={8} lg={6}> {/* Define o tamanho do card em diferentes tamanhos de tela */}
                        <Card
                            className="message-card"
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
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default TicketsCriados;
