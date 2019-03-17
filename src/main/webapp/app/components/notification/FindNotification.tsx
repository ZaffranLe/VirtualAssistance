import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, Input, Pagination, PaginationItem, PaginationLink, Table, Row } from 'reactstrap';

import vanBansData from './VanBanData';
import type from './TheLoaiVanBanData';

function NotificationRow(props) {
  const vanBan = props.vanBan;
  const vanBanLink = `/traCuuVanBan/${vanBan.id}`;
  return (
    <tr key={vanBan.id.toString()}>
      <th>{vanBan.id}</th>
      <td>
        <Link to={vanBanLink}>{vanBan.name}</Link>
      </td>
      <td>{vanBan.type}</td>
      <td>{vanBan.date}</td>
      <td>
        <Link to={vanBanLink}>
          <Button color="primary">
            <i className="fa fa-search" /> Đọc
          </Button>
        </Link>
      </td>
    </tr>
  );
}

function TypeOption(props) {
  const type = props.type;
  return (
    <option key={type.id.toString()} value={type.name} onSelect={props.onSelect}>
      {type.name}
    </option>
  );
}

class FindNotification extends React.Component<any, any> {
  pagesCount: number;
  pageSize: number;
  constructor(props) {
    super(props);

    this.pageSize = 5;
    this.pagesCount = Math.ceil(vanBansData.length / this.pageSize);

    this.state = {
      currentPage: 0,
      nameSearch: '',
      typeSearch: ''
    };
  }

  handleChangePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  handleSearchName(e) {
    e.preventDefault();

    this.setState({
      nameSearch: e.target.value.toLowerCase()
    });
  }

  handleSearchType(e) {
    e.preventDefault();
    const index = e.nativeEvent.target.selectedIndex;
    this.setState({
      typeSearch: e.nativeEvent.target[index].value
    });
  }

  render() {
    const vanBanList = vanBansData;
    const typeList = type;
    const { currentPage } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={4}>
                    <h3>
                      <i className="fa fa-align-justify" /> Danh sách văn bản
                    </h3>
                  </Col>
                  <Col lg={4}>
                    <Input onChange={e => this.handleSearchType(e)} type="select" name="select" id="select">
                      <option value="" default>
                        Tìm theo thể loại văn bản (Tất cả)
                      </option>
                      {typeList.map((type, index) => <TypeOption key={index} type={type} />)}
                    </Input>
                  </Col>
                  <Col lg={4}>
                    <Input type="text" placeholder="Tìm theo tên văn bản" onChange={e => this.handleSearchName(e)} />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên văn bản</th>
                      <th>Thể loại</th>
                      <th>Ngày đăng</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {vanBanList
                      .filter(vanBan => {
                        if (vanBan.name.toLowerCase().includes(this.state.nameSearch) && vanBan.type.includes(this.state.typeSearch)) {
                          return true;
                        }
                        return false;
                      })
                      .slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                      .map((vanBan, index) => <NotificationRow key={index} vanBan={vanBan} />)}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink previous tag="button" onClick={e => this.handleChangePage(e, currentPage - 1)} />
                  </PaginationItem>
                  {[...Array(this.pagesCount)].map((page, i) => (
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink onClick={e => this.handleChangePage(e, i)}>{i + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                    <PaginationLink next tag="button" onClick={e => this.handleChangePage(e, currentPage + 1)} />
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FindNotification;
