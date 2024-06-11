import React from 'react';
import { Row, Col, Card, List, Avatar } from 'antd';
import './teamsPage.scss';

const TeamsPage = () => {
    const teams = [
        { name: "Team Alpha", description: "Focused on backend development", avatar: 'https://example.com/avatar1.png' },
        { name: "Team Beta", description: "Frontend specialists", avatar: 'https://example.com/avatar2.png' },
    ];

    return (
        <div className='teams-page'>
            <Row gutter={[24, 24]}>
                {teams.map((team, index) => (
                    <Col span={24} md={12} xl={8} key={index}>
                        <Card bordered={false} className='team-card'>
                            <Card.Meta
                                avatar={<Avatar src={team.avatar} />}
                            />
                        </Card>
                    </Col>
                ))}

            </Row>
        </div>
    );
};

export default TeamsPage