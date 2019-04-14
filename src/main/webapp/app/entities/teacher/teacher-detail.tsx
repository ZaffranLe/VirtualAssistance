import React from 'react';
import { connect } from 'react-redux';
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

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher.reducer';
import { getEntities as getDocumentEntities } from '../document/document.reducer';
import { getEntities as getFullEvaluateEntities } from '../full-evaluate/full-evaluate.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

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

function EvaluateRow(props) {
  const evaluate = props.evaluate;

  return (
    <tr key={evaluate.id.toString()}>
      <th scope="row">{evaluate.description}</th>
      <td>
        <Badge color={getBadge(evaluate.result)} pill>
          <Translate contentKey={`virtualAssistantApp.ScoreLadder.${evaluate.result}`} />
        </Badge>
      </td>
      <td>
        <Button tag={Link} to={`${'../full-evaluate'}/${evaluate.id}`} color="info" size="sm">
          <FontAwesomeIcon icon="eye" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.view">View</Translate>
          </span>
        </Button>
      </td>
    </tr>
  );
}

// tslint:disable-next-line:ter-arrow-body-style
const getBadge = result => {
  return result === 'EXCELLENT'
    ? 'success'
    : result === 'PASS'
      ? 'secondary'
      : result === 'GOOD'
        ? 'primary'
        : result === 'FAIL'
          ? 'danger'
          : 'primary';
};

const getColor = progress => {
  const foo = 0;
  return progress < 50 ? 'green text-success' : progress >= 75 ? 'red text-danger' : 'yellow text-warning';
};

export class TeacherDetail extends React.Component<any, any> {
  pagesSurveysCount: number;
  pagesFilesCount: number;
  pageSize: number;
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getDocumentEntities();
    this.props.getFullEvaluateEntities();
  }

  constructor(props) {
    super(props);

    this.pageSize = 4;

    this.state = {
      currentFilePage: 0,
      currentSurveyPage: 0,
      txtSearchFile: '',
      txtSearchSurvey: ''
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
    const { currentSurveyPage } = this.state;
    const { teacherEntity } = this.props;
    const { documentList } = this.props;
    const { fullEvaluateList } = this.props;
    this.pagesFilesCount = Math.ceil(documentList.length / this.pageSize);
    this.pagesSurveysCount = Math.ceil(fullEvaluateList.length / this.pageSize);
    const teacherUsedStoragePercent = (teacherEntity.usedStorage / teacherEntity.dataStorage) * 100;
    return (
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="10">
                      <h2>
                        Hồ sơ giáo viên: [<b>{teacherEntity.fullName}</b>]
                      </h2>
                    </Col>
                    <Col md="2">
                      <Button tag={Link} to="/entity/teacher" replace color="info" className="float-right">
                        <FontAwesomeIcon icon="arrow-left" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.back">Back</Translate>
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table responsive hover striped>
                    <tbody>
                      <tr>
                        <td>
                          <span id="identityNumber">
                            <Translate contentKey="virtualAssistantApp.teacher.identityNumber">Identity Number</Translate>
                          </span>
                        </td>
                        <td>
                          <strong>{teacherEntity.identityNumber}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span id="fullName">
                            <Translate contentKey="virtualAssistantApp.teacher.fullName">Full Name</Translate>
                          </span>
                        </td>
                        <td>
                          <strong>{teacherEntity.fullName}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span id="phone">
                            <Translate contentKey="virtualAssistantApp.teacher.phone">Phone</Translate>
                          </span>
                        </td>
                        <td>
                          <strong>{teacherEntity.phone}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span id="doB">
                            <Translate contentKey="virtualAssistantApp.teacher.doB">Do B</Translate>
                          </span>
                        </td>
                        <td>
                          <strong>
                            <TextFormat value={teacherEntity.doB} type="date" format={APP_LOCAL_DATE_FORMAT} />
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span id="address">
                            <Translate contentKey="virtualAssistantApp.teacher.address">Address</Translate>
                          </span>
                        </td>
                        <td>
                          <strong>{teacherEntity.address}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span id="email">
                            <Translate contentKey="virtualAssistantApp.teacher.email">Email</Translate>
                          </span>
                        </td>
                        <td>
                          <strong>{teacherEntity.email}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span id="level">
                            <Translate contentKey="virtualAssistantApp.teacher.level">Level</Translate>
                          </span>
                        </td>
                        <td>
                          <strong>{teacherEntity.level}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg="8">
                      <div className="h5">Dung lượng kho tài liệu</div>
                    </Col>
                    <Col>
                      <div className="h1  text-right mb-2">
                        <FontAwesomeIcon icon="user-graduate" />
                      </div>
                    </Col>
                  </Row>
                  <div className={getColor(teacherUsedStoragePercent)}>
                    <h2>
                      <strong>
                        {teacherEntity.usedStorage}/{teacherEntity.dataStorage}
                      </strong>
                    </h2>
                  </div>
                  <Row>
                    <Col lg="4">
                      <div className={getColor(teacherUsedStoragePercent)}>{teacherUsedStoragePercent}%</div>
                    </Col>
                    <Col lg="8 ">
                      <Progress className="progress-xs my-3 progress-bar-animated" value={teacherUsedStoragePercent} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md="6">
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
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {documentList
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
                      <th>Bản đánh giá</th>
                      <th>Xếp loại</th>
                      <th />
                    </thead>
                    <tbody>
                      {fullEvaluateList
                        .filter(
                          evaluate =>
                            evaluate.description.toLowerCase().includes(this.state.txtSearchSurvey) &&
                            evaluate.teacher.id === teacherEntity.id
                        )
                        .slice(currentSurveyPage * this.pageSize, (currentSurveyPage + 1) * this.pageSize)
                        .map((evaluate, index) => <EvaluateRow key={index} evaluate={evaluate} />)}
                    </tbody>
                  </Table>
                  <Pagination>
                    <PaginationItem disabled={currentSurveyPage <= 0}>
                      <PaginationLink previous tag="button" onClick={e => this.handleChangeSurveyPage(e, currentSurveyPage - 1)} />
                    </PaginationItem>
                    {[...Array(this.pagesSurveysCount)].map((page, i) => (
                      <PaginationItem active={i === currentSurveyPage} key={i}>
                        <PaginationLink onClick={e => this.handleChangeSurveyPage(e, i)}>{i + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentSurveyPage >= this.pagesSurveysCount - 1}>
                      <PaginationLink next tag="button" onClick={e => this.handleChangeSurveyPage(e, currentSurveyPage + 1)} />
                    </PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ teacher, document, fullEvaluate }: IRootState) => ({
  teacherEntity: teacher.entity,
  documentList: document.entities,
  fullEvaluateList: fullEvaluate.entities
});

const mapDispatchToProps = { getEntity, getDocumentEntities, getFullEvaluateEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetail);
