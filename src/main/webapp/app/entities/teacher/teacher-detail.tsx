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
import { EvaluateResult } from './evaluate-result';
import { Documents } from './documents';
export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const getColor = progress => {
  const foo = 0;
  return progress < 50 ? 'green text-success' : progress >= 75 ? 'red text-danger' : 'yellow text-warning';
};

export class TeacherDetail extends React.Component<any, any> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getDocumentEntities();
    this.props.getFullEvaluateEntities();
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
    const { teacherEntity } = this.props;
    const { documentList } = this.props;
    const { fullEvaluateList } = this.props;
    const teacherUsedStoragePercent = (teacherEntity.usedStorage / teacherEntity.dataStorage) * 100;
    return (
      <Row>
        <Col md="4">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="10">
                      <h2>
                        Hồ sơ giáo viên: <br />[<b>{teacherEntity.fullName}</b>]
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
        <Col md="8">
          <Documents documentList={documentList} />
          <EvaluateResult teacherId={teacherEntity.id} fullEvaluateList={fullEvaluateList} />
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
