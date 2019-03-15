import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Progress,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input
} from "reactstrap";

import usersData from "./UsersData";
import surveysData from "../Survey/SurveysData";
import sharedFilesData from "./SharedFilesData";

function FileRow(props) {
  const file = props.file;

  return (
    <tr key={file.id.toString()}>
      <th scope="row">{file.name}</th>
      <td>{file.type}</td>
      <td>{file.size}</td>
      <td>
        <i class="fa fa-download text-primary fa-2x" />
      </td>
    </tr>
  );
}

function SurveyRow(props) {
  const survey = props.survey;

  return (
    <tr key={survey.id.toString()}>
      <th scope="row">{survey.name}</th>
      <td>
        <Badge color={getBadge(survey.result)} pill>
          {survey.result}
        </Badge>
      </td>
    </tr>
  );
}

const getBadge = result => {
  return result === "Tốt"
    ? "success"
    : result === "Đạt"
    ? "secondary"
    : result === "Khá"
    ? "primary"
    : result === "Chưa đạt"
    ? "danger"
    : "primary";
};

const getColor = progress => {
  return progress < 50
    ? "green text-success"
    : progress >= 75
    ? "red text-danger"
    : "yellow text-warning";
};

class User extends Component {
  constructor() {
    super();

    this.pageSize = 4;
    this.pagesFilesCount = Math.ceil(sharedFilesData.length / this.pageSize);
    this.pagesSurveysCount = Math.ceil(surveysData.length / this.pageSize);

    this.state = {
      currentFilePage: 0,
      currentSurveyPage: 0,
      txtSearchFile: "",
      txtSearchSurvey: ""
    };
  }

  handleChangeFilePage(e, index) {
    e.preventDefault();

    this.setState({
      currentFilePage: index
    });
  }

  handleChangeSurveyPage(e, index) {
    e.preventDefault();

    this.setState({
      currentSurveyPage: index
    });
  }

  handleSearchSurveyChange(e) {
    e.preventDefault();

    this.setState({
      txtSearchSurvey: e.target.value.toLowerCase()
    });
  }

  handleSearchFileChange(e) {
    e.preventDefault();

    this.setState({
      txtSearchFile: e.target.value.toLowerCase()
    });
  }

  render() {
    const surveyList = surveysData;
    const fileList = sharedFilesData;
    const user = usersData.find(
      user => user.id.toString() === this.props.match.params.id
    );
    const { currentFilePage } = this.state;
    const { currentSurveyPage } = this.state;
    const userDetails = user
      ? Object.values(user)
      : [
          [
            "id",
            <span>
              <i className="text-muted icon-ban" /> Not found
            </span>
          ]
        ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader>
                    <strong>
                      <i className="icon-info pr-1" />
                      ID Thành viên: {this.props.match.params.id}
                    </strong>
                  </CardHeader>
                  <CardBody>
                    <Table responsive striped hover>
                      <tbody>
                        {/* {userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td>
                                <strong>{value}</strong>
                              </td>
                            </tr>
                          );
                        })} */}
                        <tr>
                          <td>Họ tên: </td>
                          <td>
                            <strong>{userDetails[1]}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Địa chỉ: </td>
                          <td>
                            <strong>{userDetails[2]}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>SĐT: </td>
                          <td>
                            <strong>{userDetails[3]}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Email: </td>
                          <td>
                            <strong>{userDetails[4]}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col lg={4}>
                        <h4>
                          <i className="cui-share" /> Tài liệu chia sẻ
                        </h4>
                      </Col>
                      <Col lg={8}>
                        <Input
                          type="text"
                          name="txtSearchFile"
                          onChange={e => this.handleSearchFileChange(e)}
                          placeholder="Nhập tên tài liệu cần tìm"
                        />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover className="text-center">
                      <thead className="thead-light">
                        <tr>
                          <th> Tên tài liệu</th>
                          <th> Loại</th>
                          <th> Dung lượng (MB)</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {fileList
                              .filter(survey =>
                                survey.name
                                  .toLowerCase()
                                  .includes(this.state.txtSearchFile)
                              )
                              .slice(
                                currentFilePage * this.pageSize,
                                (currentFilePage + 1) * this.pageSize
                              )
                              .map((file, index) => (
                                <FileRow key={index} file={file} />
                              ))}
                      </tbody>
                    </Table>
                    <Pagination>
                      <PaginationItem disabled={currentFilePage <= 0}>
                        <PaginationLink
                          previous
                          tag="button"
                          onClick={e =>
                            this.handleChangeFilePage(e, currentFilePage - 1)
                          }
                        />
                      </PaginationItem>
                      {[...Array(this.pagesFilesCount)].map((page, i) => (
                        <PaginationItem active={i === currentFilePage} key={i}>
                          <PaginationLink
                            onClick={e => this.handleChangeFilePage(e, i)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem
                        disabled={currentFilePage >= this.pagesFilesCount - 1}
                      >
                        <PaginationLink
                          next
                          tag="button"
                          onClick={e =>
                            this.handleChangeFilePage(e, currentFilePage + 1)
                          }
                        />
                      </PaginationItem>
                    </Pagination>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col lg={4}>
                        <h4>
                          <i className="cui-speech" /> Kết quả tự đánh giá
                        </h4>
                      </Col>
                      <Col lg={8}>
                        <Input
                          type="text"
                          name="txtSurveySearch"
                          placeholder="Nhập tên kỳ đánh giá cần tìm"
                          onChange={e => this.handleSearchSurveyChange(e)}
                        />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover className="text-center">
                      <thead className="thead-light">
                        <th>Kỳ đánh giá</th>
                        <th>Xếp loại</th>
                      </thead>
                      <tbody>
                        {surveyList
                              .filter(survey =>
                                survey.name
                                  .toLowerCase()
                                  .includes(this.state.txtSearchSurvey)
                              )
                              .slice(
                                currentSurveyPage * this.pageSize,
                                (currentSurveyPage + 1) * this.pageSize
                              )
                              .map((survey, index) => (
                                <SurveyRow key={index} survey={survey} />
                              ))}
                      </tbody>
                    </Table>
                    <Pagination>
                      <PaginationItem disabled={currentSurveyPage <= 0}>
                        <PaginationLink
                          previous
                          tag="button"
                          onClick={e =>
                            this.handleChangeSurveyPage(
                              e,
                              currentSurveyPage - 1
                            )
                          }
                        />
                      </PaginationItem>
                      {[...Array(this.pagesSurveysCount)].map((page, i) => (
                        <PaginationItem
                          active={i === currentSurveyPage}
                          key={i}
                        >
                          <PaginationLink
                            onClick={e => this.handleChangeSurveyPage(e, i)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem
                        disabled={
                          currentSurveyPage >= this.pagesSurveysCount - 1
                        }
                      >
                        <PaginationLink
                          next
                          tag="button"
                          onClick={e =>
                            this.handleChangeSurveyPage(
                              e,
                              currentSurveyPage + 1
                            )
                          }
                        />
                      </PaginationItem>
                    </Pagination>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="8">
                        <div className="h5">Số tài liệu chia sẻ</div>
                      </Col>
                      <Col>
                        <div className="h1  text-right mb-2">
                          <i className="icon-graduation" />
                        </div>
                      </Col>
                    </Row>
                    <div class={getColor(userDetails[8])}>
                      <h2>
                        <strong>246k</strong>
                      </h2>
                    </div>
                    <Row>
                      <Col lg="4">
                        <div class={getColor(userDetails[8])}>
                          {userDetails[8]}%
                        </div>
                      </Col>
                      <Col lg="8 ">
                        <Progress
                          className="progress-xs my-3 progress-bar-animated progress-green"
                          value={userDetails[8]}
                          color={getColor(userDetails[8])}
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
    );
  }
}

export default User;
