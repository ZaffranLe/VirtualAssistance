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
  CardImg
} from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

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
        src: 'https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg',
        altText: 'Slide 2',
        caption: 'Slide 2'
      },
      {
        src: 'https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg',
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
            <Row>
              <Col md="12" xs="12" xl="12">
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
            <Row>
              <Col lg="4">
                <Card>
                  <Media
                    alt="Generic placeholder image"
                    src="https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg"
                  />
                </Card>
              </Col>
              <Col lg="4">
                <Card>
                  <Media
                    alt="Generic placeholder image"
                    src="https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg"
                  />
                </Card>
              </Col>
              <Col lg="4">
                <Card>
                  <Media
                    alt="Generic placeholder image"
                    src="https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg"
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Card>
                  <CardHeader>
                    <h4>Thông báo mới nhất</h4>
                  </CardHeader>
                  <CardImg top width="100%" src="https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg" />
                  <CardBody>Thông báo gì đấy</CardBody>
                </Card>
                <Card>
                  <CardHeader className="align-center">
                    <h4>Văn bản pháp quy</h4>
                  </CardHeader>
                  <CardBody>
                    <Table responsive striped className="text-center">
                      <thead className="thead-light">
                        <tr>
                          <th> Tên </th>
                          <th> Mô tả</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
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
