import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Card, CardHeader, CardBody } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
export interface ITeacherProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
import { EvaluateResult } from './evaluate-result';
import { Documents } from './documents';
import { getPrivateEntities as getDocumentEntities } from '../document/document.reducer';
import { getEntities as getFullEvaluateEntities } from '../full-evaluate/full-evaluate.reducer';
import { getEntities as getDocumentTypes } from '../document-type/document-type.reducer';
export class Teacher extends React.Component<any, any> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getSession();
    this.props.getDocumentEntities();
    this.props.getFullEvaluateEntities();
    this.props.getDocumentTypes();
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { teacherList, match } = this.props;
    const { account } = this.props;
    const { documentList } = this.props;
    const { fullEvaluateList } = this.props;
    const { documentTypeList } = this.props;
    return (
      <div>
        {teacherList.map(
          (teacher, i) =>
            teacher.user.id === account.id && (
              <Row>
                <Col md="4">
                  <Row>
                    <Col md="12">
                      <Card>
                        <CardHeader>
                          <Row>
                            <Col md="12">
                              <h2>
                                Hồ sơ giáo viên: <br />[<b>{teacher.fullName}</b>]
                              </h2>
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
                                  <strong>{teacher.identityNumber}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span id="fullName">
                                    <Translate contentKey="virtualAssistantApp.teacher.fullName">Full Name</Translate>
                                  </span>
                                </td>
                                <td>
                                  <strong>{teacher.fullName}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span id="phone">
                                    <Translate contentKey="virtualAssistantApp.teacher.phone">Phone</Translate>
                                  </span>
                                </td>
                                <td>
                                  <strong>{teacher.phone}</strong>
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
                                    <TextFormat value={teacher.doB} type="date" format={APP_LOCAL_DATE_FORMAT} />
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
                                  <strong>{teacher.address}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span id="email">
                                    <Translate contentKey="virtualAssistantApp.teacher.email">Email</Translate>
                                  </span>
                                </td>
                                <td>
                                  <strong>{teacher.email}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span id="level">
                                    <Translate contentKey="virtualAssistantApp.teacher.level">Level</Translate>
                                  </span>
                                </td>
                                <td>
                                  <strong>{teacher.level}</strong>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md="8">
                  <Documents documentList={documentList} documentTypeList={documentTypeList} />
                  <EvaluateResult teacherId={teacher.id} fullEvaluateList={fullEvaluateList} />
                </Col>
              </Row>
            )
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, teacher, document, fullEvaluate, documentType }: IRootState) => ({
  teacherList: teacher.entities,
  account: authentication.account,
  documentList: document.entities,
  fullEvaluateList: fullEvaluate.entities,
  documentTypeList: documentType.entities
});

const mapDispatchToProps = {
  getEntities,
  getSession,
  getDocumentEntities,
  getFullEvaluateEntities,
  getDocumentTypes
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teacher);
