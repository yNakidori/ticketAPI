import React from 'react';
import { Row, Col, Card } from 'antd';
import './projectsPage.scss';

const ProjectsPage = () => {
    const projects = [
        { title: "Project Alpha", description: "Backend API development", img: 'https://example.com/project1.png' },
        { title: "Project Beta", description: "Frontend UI design", img: 'https://example.com/project2.png' },
    ];

    return (
        <div className='projects-page'>
            <Row gutter={[24, 24]}>
                {projects.map((project, index) => (
                    <Col span={24} md={12} xl={8} key={index}>
                        <Card
                            bordered={false}
                            className="project-card"
                            cover={<img alt={project.title} src={project.img} />}
                        >
                            <Card.Meta
                                title={project.title}
                                description={project.description}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProjectsPage