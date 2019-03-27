import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TeacherDetail extends React.Component<ITeacherDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teacherEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.teacher.detail.title">Teacher</Translate> [<b>{teacherEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="identityNumber">
                <Translate contentKey="virtualAssistantApp.teacher.identityNumber">Identity Number</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.identityNumber}</dd>
            <dt>
              <span id="fullName">
                <Translate contentKey="virtualAssistantApp.teacher.fullName">Full Name</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.fullName}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="virtualAssistantApp.teacher.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.phone}</dd>
            <dt>
              <span id="doB">
                <Translate contentKey="virtualAssistantApp.teacher.doB">Do B</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={teacherEntity.doB} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="address">
                <Translate contentKey="virtualAssistantApp.teacher.address">Address</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.address}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="virtualAssistantApp.teacher.email">Email</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.email}</dd>
            <dt>
              <span id="dataStorage">
                <Translate contentKey="virtualAssistantApp.teacher.dataStorage">Data Storage</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.dataStorage}</dd>
            <dt>
              <span id="usedStorage">
                <Translate contentKey="virtualAssistantApp.teacher.usedStorage">Used Storage</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.usedStorage}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="virtualAssistantApp.teacher.level">Level</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.level}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="virtualAssistantApp.teacher.status">Status</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.status}</dd>
            <dt>
              <span id="avatar">
                <Translate contentKey="virtualAssistantApp.teacher.avatar">Avatar</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.avatar}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.teacher.user">User</Translate>
            </dt>
            <dd>{teacherEntity.user ? teacherEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/teacher" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/teacher/${teacherEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherEntity: teacher.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetail);
