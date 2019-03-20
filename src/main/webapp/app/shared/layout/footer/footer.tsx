import './footer.css';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row, Card, CardBody, CardHeader, Link } from 'reactstrap';
const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>On going product!</CardHeader>
          <CardBody>
            <Row className="justify-content-center">
              <Col md="4">
                Social Media: <a href="https://www.facebook.com/tinhoctre.vn">Facebook</a> <br />
                Email: masterit3000@gmail.com
              </Col>
              <Col md="4">
                User Guide: <a href="#">Click here</a> <br />
                Admin Guide: <a href="#">Click here</a>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Footer;
