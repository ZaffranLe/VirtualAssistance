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
        // src: 'https://education.vnu.edu.vn/assets/uploads/files/Slider/02c89-img_2530.jpg',
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
              <Row className="justify-content-center align-items-stretch">
                <Col md="2">
                  <Alert color="primary">
                    <Button tag={Link} className="btn-block" to="/login" color="info">
                      ĐĂNG NHẬP
                    </Button>
                  </Alert>
                </Col>
                <Col md="2">
                  <Alert color="primary">
                    <Button tag={Link} className="btn-block" to="/register" color="info">
                      ĐĂNG KÝ
                    </Button>
                  </Alert>
                </Col>
              </Row>
            )}
          <div className="animated fadeIn">
            {/* <Row className="justify-content-center">
              <Col md="12" lg="12">
                <Card>
                  <CardBody>
                    {
                      <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClick={this.goToIndex} />
                        {slides2}
                        <CarouselControl direction="prev" directionText="Previous" onClick={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClick={this.next} />
                      </Carousel>
                    }
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
            <Row className="justify-content-center">
              <Col lg="11">
                {
                  <Row>
                    <Col lg="3">
                      <Card>
                        <Media href="https://education.vnu.edu.vn/index.php/WebControl/listnews/15/0">
                          <Media alt="Generic placeholder image" className="img-responsive" src="/content/images/1.jpg" />
                        </Media>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card>
                        <Media href="https://education.vnu.edu.vn/index.php/WebControl/listnews/16/0">
                          <Media alt="Generic placeholder image" className="img-responsive" src="/content/images/2.jpg" />
                        </Media>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card>
                        <Media href="http://danhgiatamly.edu.vn/">
                          <Media alt="Generic placeholder image" className="img-responsive" src="/content/images/3.jpg" />
                        </Media>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card>
                        <Media href="http://cat.education.vnu.edu.vn/">
                          <Media alt="Generic placeholder image" className="img-responsive" src="/content/images/4.jpg" />
                        </Media>
                      </Card>
                    </Col>
                  </Row>
                }
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
