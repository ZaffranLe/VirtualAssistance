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
    Row,
} from 'reactstrap';


const items = [
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 1',
        caption: 'Slide 1',
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 2',
        caption: 'Slide 2',
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 3',
        caption: 'Slide 3',
    },
];
class Documents extends Component {
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

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
                    <img className="d-block w-100" src={item.src} alt={item.altText} />
                </CarouselItem>
            );
        });

        const slides2 = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
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
                    <Card >
                        <Row className="p-4 mt-4">
                            <Col lg="2" md="4" xs="12"  >
                                <Row className="p-4 ">
                                    <Col lg="12" md="12" xs="12" >
                                        <Button   block color="primary">Upload</Button>
                                    </Col>
                                </Row>
                                <Row className="p-4 ">
                                    <Col lg="12" md="12" xs="12" >
                                        <Row className=" mt-3">
                                            <Col className="h5">
                                                <a href="#">Toán <Badge color="primary" className="float-right sm">10</Badge></a>

                                            </Col>

                                        </Row>
                                        <Row className=" mt-3">
                                            <Col className="h5">
                                                <a href="#">Lý <Badge color="primary" className="float-right sm">5</Badge></a>

                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="4" md="8" xs="12">
                                <Row className="p-4 ">
                                    <Col lg="12" md="12" xs="12" >
                                        <Input
                                            type="text"
                                            name="txtSearch"
                                            placeholder="Tìm kiếm tài liệu trong kho"
                                        />
                                    </Col>

                                </Row>

                                <Row className="p-4 ">

                                    <Col lg="12" md="12" xs="12" >

                                        <ListGroup>
                                            <ListGroupItem active action>

                                                <ListGroupItemHeading>List group item heading
                                                <h6 className="float-right" >Dec 12</h6>
                                                </ListGroupItemHeading>
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
                                    <Carousel  activeIndex={activeIndex} next={this.next} previous={this.previous}>
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

export default Documents;
