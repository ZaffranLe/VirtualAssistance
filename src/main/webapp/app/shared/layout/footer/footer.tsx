import './footer.css';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row, Card, CardBody, CardHeader, Link } from 'reactstrap';
const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <Card className="footer">
          <CardBody className="footer">
            <Row className="justify-content-center">
              <Col md="4">
                Trường đại học giáo dục <br />
                Địa chỉ: Nhà G7, số 144 Xuân Thủy<br />
                Điện thoại: (024) 7301 7123<br />
                Email: education@vnu.edu.vn<br />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Footer;
