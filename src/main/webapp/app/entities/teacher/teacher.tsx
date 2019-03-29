import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export class Teacher extends React.Component<ITeacherProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { teacherList, match } = this.props;
    return (
      <div>
        <h2 id="teacher-heading">
          <Translate contentKey="virtualAssistantApp.teacher.home.title">Teachers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.teacher.home.createLabel">Create new Teacher</Translate>
          </Link>
          
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.identityNumber">Identity Number</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.fullName">Full Name</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.doB">Do B</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.dataStorage">Data Storage</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.usedStorage">Used Storage</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.level">Level</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.avatar">Avatar</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.teacher.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${teacher.id}`} color="link" size="sm">
                      {teacher.id}
                    </Button>
                  </td>
                  <td>{teacher.identityNumber}</td>
                  <td>{teacher.fullName}</td>
                  <td>{teacher.phone}</td>
                  <td>
                    <TextFormat type="date" value={teacher.doB} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{teacher.address}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.dataStorage}</td>
                  <td>{teacher.usedStorage}</td>
                  <td>
                    <Translate contentKey={`virtualAssistantApp.TeacherLevel.${teacher.level}`} />
                  </td>
                  <td>
                    <Translate contentKey={`virtualAssistantApp.Status.${teacher.status}`} />
                  </td>
                  <td>{teacher.avatar}</td>
                  <td>{teacher.user ? teacher.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${teacher.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${teacher.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${teacher.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherList: teacher.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teacher);
