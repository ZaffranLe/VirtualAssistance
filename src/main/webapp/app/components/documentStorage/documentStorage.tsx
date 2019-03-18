import React, { Component } from 'react';
import {
  Badge,
  Card,
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselCaption,
  CarouselItem,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Col,
  Input,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';

const items = [
  {
    src: '',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: '',
    altText: 'Slide 2',
    caption: 'Slide 2'
  }
];

class DocumentStorage extends React.Component<any, any> {
  animating: boolean;
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    const { activeIndex } = this.state;
    const uploadLink = `/uploadHocLieu`;

    const slides2 = items.map(item => {
      const foo = 0;
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img className="d-block w-100" src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
    return (
      <div className="animated fadeIn">
        <div>
          <h1>Tài liệu của bạn</h1>
        </div>
        <div>
          <Card>
            <Row className="p-4 mt-4">
              <Col lg="2" md="4" xs="12">
                <Row className="p-4 ">
                  <Col lg="12" md="12" xs="12">
                    <Link to="upload">
                      <Button block color="primary">
                        Upload
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <Row className="p-4 ">
                  <Col lg="12" md="12" xs="12">
                    <Row className=" mt-3">
                      <Col className="h5">
                        Toán{' '}
                        <Badge color="primary" className="float-right sm">
                          10
                        </Badge>
                      </Col>
                    </Row>
                    <Row className=" mt-3">
                      <Col className="h5">
                        Lý{' '}
                        <Badge color="primary" className="float-right sm">
                          5
                        </Badge>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg="4" md="8" xs="12">
                <Row className="p-4 ">
                  <Col lg="12" md="12" xs="12">
                    <Input type="text" name="txtSearch" placeholder="Tìm kiếm tài liệu trong kho" />
                  </Col>
                </Row>

                <Row className="p-4 ">
                  <Col lg="12" md="12" xs="12">
                    <ListGroup>
                      <ListGroupItem active action>
                        <ListGroupItemHeading>List group item heading Dec 12</ListGroupItemHeading>
                        <ListGroupItemText>
                          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem action>
                        <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                        <ListGroupItemText>
                          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem action>
                        <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                        <ListGroupItemText>
                          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                        </ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                </Row>
              </Col>
              <Col lg="6" md="12" xs="12" className="p-4 ">
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                  <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                  {slides2}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}

export default DocumentStorage;
