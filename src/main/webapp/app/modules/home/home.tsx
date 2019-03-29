import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardBody, Table, Progress, CardHeader, Badge } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          {account && account.login ? (
            <div className="animated fadeIn">
              <Row>
                <Col xs="12" sm="6" lg="4">
                  <Card className=" bg-primary">
                    <CardBody>
                      <Row>
                        <Col lg="8">
                          <div className="h5">Số tài liệu chia sẻ</div>
                        </Col>
                      </Row>
                      <div>
                        <h2>
                          <strong>246k</strong>
                        </h2>
                      </div>
                      <Row>
                        <Col lg="4">
                          <div>25%</div>
                        </Col>
                        <Col lg="8 ">
                          <Progress className="progress-xs my-3 progress-white" color="white" value="25" />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" sm="6" lg="4">
                  <Card className=" bg-success">
                    <CardBody>
                      <Row>
                        <Col lg="8">
                          <div className="h5">Số tệp tài liệu trong kho</div>
                        </Col>
                      </Row>
                      <div>
                        <h2>
                          <strong>246k</strong>
                        </h2>
                      </div>
                      <Row>
                        <Col lg="4">
                          <div>25%</div>
                        </Col>
                        <Col lg="8">
                          <Progress className="progress-xs my-3 progress-white" color="white" value="25" />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" sm="6" lg="4">
                  <Card className=" bg-warning">
                    <CardBody>
                      <Row>
                        <Col lg="8">
                          <div className="h5">Dung lượng còn lại</div>
                        </Col>
                      </Row>
                      <div>
                        <h2>
                          <strong>246k</strong>
                        </h2>
                      </div>
                      <Row>
                        <Col lg="4">
                          <div>25%</div>
                        </Col>
                        <Col lg="8 ">
                          <Progress className="progress-xs my-3 progress-white" color="white" value="25" />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs="12" lg="8">
                  <Card>
                    <CardHeader>
                      <h4>Văn bản mới nhất</h4>
                    </CardHeader>
                    <CardBody>
                      <Table responsive striped className="text-center">
                        <thead className="thead-light">
                          <tr>
                            <th> Location</th>
                            <th> View</th>
                            <th> Location</th>
                            <th> Location</th>
                            <th> Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>adobe.com</td>
                            <td>200</td>
                            <td>222</td>
                            <td>40%</td>
                            <td>$12</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h4>Tài liệu trong kho</h4>
                    </CardHeader>
                    <CardBody>
                      <Table responsive striped className="text-center">
                        <thead className="thead-light">
                          <tr>
                            <th> Tên tài liệu</th>
                            <th> Loại</th>
                            <th> Dung lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>adobe.com</td>
                            <td>
                              <div className="h1 primary">
                                <i className="fa fa-file-word-o " />
                              </div>
                            </td>
                            <td>222</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" lg="4">
                  <Card>
                    <CardHeader>
                      <h4>Kết quả tự đánh giá</h4>
                    </CardHeader>
                    <CardBody>
                      <Table responsive striped className="text-center">
                        <thead className="thead-light">
                          <tr>
                            <th>Kỳ đánh giá</th>
                            <th>Xếp loại</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>adobe.com</td>
                            <td>
                              <h5>
                                <Badge color="success">Tốt</Badge>
                              </h5>
                            </td>
                          </tr>
                          <tr>
                            <td>abc</td>
                            <td>
                              <h5>
                                <Badge color="info">Đạt</Badge>
                              </h5>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                <Link to="/login" className="alert-link">
                  <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
                </Link>
                <Translate contentKey="global.messages.info.authenticated.suffix">
                  , you can try the default accounts:
                  <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                  <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
                </Translate>
              </Alert>

              <Alert color="warning">
                <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
                <Link to="/register" className="alert-link">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
