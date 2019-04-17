import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress
} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable-next-line:no-unused-variable

function DocumentRow(props) {
  const document = props.document;
  return (
    <tr key={document.id.toString()}>
      <th scope="row">{document.name}</th>
      <td>
        {document.documentTypes
          ? document.documentTypes.map((val, j) => (
              <span key={j}>
                {val.content}
                {j === document.documentTypes.length - 1 ? '' : ', '}
              </span>
            ))
          : null}
      </td>
      <td>
        <Button tag={Link} to={`${'../document'}/${document.id}`} color="info" size="sm">
          <FontAwesomeIcon icon="eye" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.view">View</Translate>
          </span>
        </Button>
      </td>
    </tr>
  );
}

export class Documents extends React.Component<any, any> {
  pagesFilesCount: number;
  pageSize: number;

  constructor(props) {
    super(props);

    this.pageSize = 4;

    this.state = {
      currentFilePage: 0,
      txtSearchFile: '',
      documentList: props.documentList
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
    const { currentFilePage } = this.state;
    this.pagesFilesCount = Math.ceil(this.state.documentList.length / this.pageSize);
    return (
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row>
                <Col lg={2}>
                  <h4>
                    <i className="cui-share" /> Tài liệu dạy học
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
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.documentList
                    .filter(document => document.name.toLowerCase().includes(this.state.txtSearchFile))
                    .slice(currentFilePage * this.pageSize, (currentFilePage + 1) * this.pageSize)
                    .map((document, index) => <DocumentRow key={index} document={document} />)}
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem disabled={currentFilePage <= 0}>
                  <PaginationLink previous tag="button" onClick={e => this.handleChangeFilePage(e, currentFilePage - 1)} />
                </PaginationItem>
                {[...Array(this.pagesFilesCount)].map((page, i) => (
                  <PaginationItem active={i === currentFilePage} key={i}>
                    <PaginationLink onClick={e => this.handleChangeFilePage(e, i)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentFilePage >= this.pagesFilesCount - 1}>
                  <PaginationLink next tag="button" onClick={e => this.handleChangeFilePage(e, currentFilePage + 1)} />
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Documents;
