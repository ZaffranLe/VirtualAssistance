import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Table,
  Progress,
  CardHeader,
  Badge,
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselCaption,
  CarouselItem,
  Media,
  Button
} from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntities as getNotificationEntities } from '../../entities/notification/notification.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<any, any> {
  animating: any;
  items: any;
  componentDidMount() {
    this.props.getSession();
  }

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.items = [
      {
        src: 'https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg',
        altText: 'Slide 1',
        caption: 'Slide 1'
      },
      {
        src: 'https://education.vnu.edu.vn/assets/uploads/files/440d1-dhgd-thong-bao-tuyen-sinh-2019.jpg',
        altText: 'Slide 2',
        caption: 'Slide 2'
      },
      {
        src: 'https://education.vnu.edu.vn/assets/uploads/files/8c395-dhgd-toa-dam-gvcn-1-.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3'
      }
    ];
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
    const { account } = this.props;
    const { activeIndex } = this.state;
    const items = this.items;

    // tslint:disable-next-line:ter-arrow-body-style
    const slides2 = this.items.map(item => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img className="d-block w-100" src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
    return (
      <Row>
        <Col md="12">
          {account &&
            !account.login && (
              <Row>
                <Col md="6">
                  <Alert color="warning">
                    <Link to="/login" className="alert-link">
                      <Translate contentKey="global.messages.info.authenticated.link"> Đăng nhập</Translate>
                    </Link>
                  </Alert>
                </Col>
                <Col md="6">
                  <Alert color="warning">
                    <Link to="/register" className="alert-link">
                      <Translate contentKey="global.messages.info.register.link">Đăng ký</Translate>
                    </Link>
                  </Alert>
                </Col>
              </Row>
            )}
          <div className="animated fadeIn">
            <Row className="justify-content-center">
              <Col md="10">
                <Card>
                  <CardBody>
                    <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                      <CarouselIndicators items={items} activeIndex={activeIndex} onClick={this.goToIndex} />
                      {slides2}
                      <CarouselControl direction="prev" directionText="Previous" onClick={this.previous} />
                      <CarouselControl direction="next" directionText="Next" onClick={this.next} />
                    </Carousel>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg="8">
                <Row>
                  <Col lg="3">
                    <Card>
                      <Media href="https://education.vnu.edu.vn/index.php/WebControl/listnews/15/0">
                        <Media alt="Generic placeholder image" src="https://education.vnu.edu.vn/assets/Layout/img/banner/1.jpg" />
                      </Media>
                    </Card>
                  </Col>
                  <Col lg="3">
                    <Card>
                      <Media href="https://education.vnu.edu.vn/index.php/WebControl/listnews/16/0">
                        <Media alt="Generic placeholder image" src="https://education.vnu.edu.vn/assets/Layout/img/banner/2.jpg" />
                      </Media>
                    </Card>
                  </Col>
                  <Col lg="3">
                    <Card>
                      <Media href="http://danhgiatamly.edu.vn/">
                        <Media alt="Generic placeholder image" src="https://education.vnu.edu.vn/assets/Layout/img/banner/3.jpg" />
                      </Media>
                    </Card>
                  </Col>
                  <Col lg="3">
                    <Card>
                      <Media href="http://hes.vnu.edu.vn/">
                        <Media alt="Generic placeholder image" src="https://education.vnu.edu.vn/assets/Layout/img/banner/4.jpg" />
                      </Media>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg="8">
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="5">
                            <h1>
                              <b>Thông báo tuyển sinh Đại học chính quy năm 2019</b>
                            </h1>{' '}
                            <br />
                            Trường Đại học Giáo dục (ĐHGD) - Đại học Quốc gia Hà Nội thông báo tuyển sinh đại học chính quy năm 2019. <br />
                            <Button color="primary">Xem thêm</Button>
                          </Col>
                          <Col md="7">
                            <Media
                              className="img-responsive"
                              src="https://education.vnu.edu.vn/assets/uploads/files/440d1-dhgd-thong-bao-tuyen-sinh-2019.jpg"
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="5">
                            <h1>
                              <b>Hướng dẫn ghi phiếu đăng ký dự thi và đăng ký xét tuyển đại học</b>
                            </h1>{' '}
                            <br />
                            Từ ngày 01/04 - 20/04/2019, học sinh lớp 12 cả nước sẽ chính thức nộp hồ sơ đăng ký dự thi THPT quốc gia và đăng
                            ký xét tuyển đại học chính quy năm 2019. <br />
                            <Button color="primary">Xem thêm</Button>
                          </Col>
                          <Col md="7">
                            <Media
                              className="img-responsive"
                              src="https://education.vnu.edu.vn/assets/uploads/files/bd40a-3-phieu-du-thi-thpt.jpg"
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="5">
                            <h1>
                              <b>Những ứng dụng của khoa học dữ liệu trong giáo dục</b>
                            </h1>{' '}
                            <br />
                            Khoa học dữ liệu là sự kết hợp hài hoà giữa toán học, khoa học tính toán và tri thức chuyên ngành. Trước những
                            đòi hỏi về sự phát triển của một ngành khoa học mới, ngày 9/4/2018, Khoa Công nghệ Giáo dục – Trường Đại học
                            Giáo dục – Đại học Quốc gia Hà Nội tổ chức seminar khoa học: “Những ứng dụng của khoa học dữ liệu trong giáo
                            dục”. <br />
                            <Button color="primary">Xem thêm</Button>
                          </Col>
                          <Col md="7">
                            <Media className="img-responsive" src="https://education.vnu.edu.vn/assets/uploads/files/5caa2-img_5601.jpg" />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="5">
                            <h1>
                              <b>
                                Đào tạo, bồi dưỡng đội ngũ giáo viên để dạy môn Khoa học Tự nhiên theo Chương trình Giáo dục phổ thông mới
                              </b>
                            </h1>{' '}
                            <br />
                            Chiều 5/4/2019, tại Hội trường P. 401, Trường Đại học Giáo dục – ĐHQGHN đã tổ chức Tọa đàm “Đào tạo, bồi dưỡng
                            giáo viên dạy môn Khoa học Tự nhiên theo Chương trình Giáo dục phổ thông mới”. <br />
                            <Button color="primary">Xem thêm</Button>
                          </Col>
                          <Col md="7">
                            <Media
                              className="img-responsive"
                              src="https://education.vnu.edu.vn/assets/uploads/files/27f63-dhgd-dao-tao-cn-su-pham-khtn.jpg"
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="5">
                            <h1>
                              <b>ĐHGD: Hơn 300 giáo viên tham gia tập huấn giáo viên chủ nhiệm</b>
                            </h1>{' '}
                            <br />
                            Ngày 4/4/2019 tại Trung tâm Giáo dục Thường xuyên tỉnh Phú Thọ, Trường Đại học Giáo dục – ĐHQGHN phối hợp với Sở
                            Giáo dục và Đào tạo tỉnh Phú Thọ tổ chức tọa đàm “Giáo viên chủ nhiệm với đổi mới giáo dục phổ thông”. <br />
                            <Button color="primary">Xem thêm</Button>
                          </Col>
                          <Col md="7">
                            <Media
                              className="img-responsive"
                              src="https://education.vnu.edu.vn/assets/uploads/files/8c395-dhgd-toa-dam-gvcn-1-.jpg"
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
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
