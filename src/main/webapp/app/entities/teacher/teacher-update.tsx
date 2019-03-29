import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export interface ITeacherUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITeacherUpdateState {
  isNew: boolean;
  userId: number;
}

export class TeacherUpdate extends React.Component<ITeacherUpdateProps, ITeacherUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.doB = new Date(values.doB);

    if (errors.length === 0) {
      const { teacherEntity } = this.props;
      const entity = {
        ...teacherEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/teacher');
  };

  render() {
    const { teacherEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;
    const { isAdmin } = this.props;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.teacher.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.teacher.home.createOrEditLabel">Create or edit a Teacher</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : teacherEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="teacher-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="identityNumberLabel" for="identityNumber">
                    <Translate contentKey="virtualAssistantApp.teacher.identityNumber">Identity Number</Translate>
                  </Label>
                  <AvField id="teacher-identityNumber" type="text" name="identityNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="fullNameLabel" for="fullName">
                    <Translate contentKey="virtualAssistantApp.teacher.fullName">Full Name</Translate>
                  </Label>
                  <AvField id="teacher-fullName" type="text" name="fullName" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="virtualAssistantApp.teacher.phone">Phone</Translate>
                  </Label>
                  <AvField id="teacher-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="doBLabel" for="doB">
                    <Translate contentKey="virtualAssistantApp.teacher.doB">Do B</Translate>
                  </Label>
                  <AvInput
                    id="teacher-doB"
                    type="datetime-local"
                    className="form-control"
                    name="doB"
                    value={isNew ? null : convertDateTimeFromServer(this.props.teacherEntity.doB)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    <Translate contentKey="virtualAssistantApp.teacher.address">Address</Translate>
                  </Label>
                  <AvField id="teacher-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="virtualAssistantApp.teacher.email">Email</Translate>
                  </Label>
                  <AvField id="teacher-email" type="text" name="email" />
                </AvGroup>
                {isAdmin && (
                  <AvGroup>
                    <Label id="levelLabel">
                      <Translate contentKey="virtualAssistantApp.teacher.level">Level</Translate>
                    </Label>
                    <AvInput
                      id="teacher-level"
                      type="select"
                      className="form-control"
                      name="level"
                      value={(!isNew && teacherEntity.level) || 'TEACHER'}
                    >
                      <option value="TEACHER">
                        <Translate contentKey="virtualAssistantApp.TeacherLevel.TEACHER" />
                      </option>
                      <option value="DEAN">
                        <Translate contentKey="virtualAssistantApp.TeacherLevel.DEAN" />
                      </option>
                      <option value="HIGHLEVEL">
                        <Translate contentKey="virtualAssistantApp.TeacherLevel.HIGHLEVEL" />
                      </option>
                    </AvInput>
                  </AvGroup>
                )}
                <Button tag={Link} id="cancel-save" to="/entity/teacher" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  teacherEntity: storeState.teacher.entity,
  loading: storeState.teacher.loading,
  updating: storeState.teacher.updating,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherUpdate);
