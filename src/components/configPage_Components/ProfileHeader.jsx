import React from "react";
import { Row, Col, Card, Avatar, Radio } from "antd";

const ProfileHeader = ({ imageURL, fullName }) => (
  <div className="sec-1">
    <Card className="card-profile-head">
      <Row justify="space-between" align="middle" gutter={[24, 0]}>
        <Col span={24} md={12} className="col-info">
          <Avatar size={74} shape="square" src={imageURL} />
          <div className="avatar-info">
            <h4 className="font-semibold m-0">{fullName}</h4>
            <p>CEO / Co-Founder</p>
          </div>
        </Col>
        <Col span={24} md={12} className="col-radio">
          <Radio.Group defaultValue="a">
            <Radio.Button value="a">OVERVIEW</Radio.Button>
            <Radio.Button value="b">TEAMS</Radio.Button>
            <Radio.Button value="c">PROJECTS</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
    </Card>
  </div>
);

export default ProfileHeader;
