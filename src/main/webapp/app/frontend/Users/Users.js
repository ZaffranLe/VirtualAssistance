import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  Row,
  Table,
  Input
} from "reactstrap";

import usersData from "./UsersData";

function UserRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;

  // const getBadge = (status) => {
  //   return status === 'Active' ? 'success' :
  //     status === 'Inactive' ? 'secondary' :
  //       status === 'Pending' ? 'warning' :
  //         status === 'Banned' ? 'danger' :
  //           'primary'
  // }

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        <Link to={userLink}>{user.id}</Link>
      </th>
      <td>
        <Link to={userLink}>{user.name}</Link>
      </td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
      {/* <td><Link to={userLink}><Badge color={getBadge(user.email)}>{user.email}</Badge></Link></td> */}
      <td>
        <Button className="btn-facebook btn-brand icon btn-sm">
          <i className="fa fa-facebook" />
        </Button>
        <Button className="btn-twitter btn-brand icon btn-sm">
          <i className="fa fa-twitter" />
        </Button>
        <Button className="btn-instagram btn-brand icon btn-sm">
          <i className="fa fa-instagram" />
        </Button>
        <Button className="btn-google-plus btn-brand icon btn-sm">
          <i className="fa fa-envelope" />
        </Button>
      </td>
    </tr>
  );
}

class Users extends Component {
  constructor() {
    super();

    this.pageSize = 10;
    this.pagesCount = Math.ceil(usersData.length / this.pageSize);

    this.state = {
      currentPage: 0,
      txtSearch: ""
    };
  }

  handleChangePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  handleChangeTxtSearch(e) {
    e.preventDefault();

    this.setState({
      txtSearch: e.target.value.toLowerCase()
    });
  }

  render() {
    // const userList = usersData.filter((user) => user.id < 10)
    const userList = usersData;
    const { currentPage } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col xl={8}>
                    <big>
                      <i className="cui-people" /> Danh sách thành viên
                    </big>
                  </Col>
                  <Col xl={4}>
                    <Input
                      type="text"
                      name="txtSearch"
                      onChange={e => this.handleChangeTxtSearch(e)}
                      placeholder="Nhập Họ Tên cần tìm kiếm"
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Họ Tên</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Mạng xã hội</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList
                      .filter(user =>
                        user.name.toLowerCase().includes(this.state.txtSearch)
                      )
                      .slice(
                        currentPage * this.pageSize,
                        (currentPage + 1) * this.pageSize
                      )
                      .map((user, index) => (
                        <UserRow key={index} user={user} />
                      ))}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      previous
                      tag="button"
                      onClick={e => this.handleChangePage(e, currentPage - 1)}
                    />
                  </PaginationItem>
                  {[...Array(this.pagesCount)].map((page, i) => (
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink
                        onClick={e => this.handleChangePage(e, i)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                    <PaginationLink
                      next
                      tag="button"
                      onClick={e => this.handleChangePage(e, currentPage + 1)}
                    />
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

export default Users;
