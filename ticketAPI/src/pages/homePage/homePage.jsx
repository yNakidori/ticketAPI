import React from 'react';
import MainLayout from '../../components/mainLayout';
import TicketsCriados from '../../components/homePage_Components/createdTickets';
import TicketsPessoais from '../../components/homePage_Components/personalTickets';
import { Row, Col } from 'antd';
import '../homePage/homePage.scss';

const HomePage = () => {
    return (
        <MainLayout>
            <div className="homepage">
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <div className="section">
                            <h2>Tickets Criados</h2>
                            <TicketsCriados />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="section">
                            <h2>Tickets Pessoais</h2>
                            <TicketsPessoais />
                        </div>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    );
}

export default HomePage;
