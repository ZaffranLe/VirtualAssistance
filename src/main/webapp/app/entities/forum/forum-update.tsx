import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getForums } from 'app/entities/forum/forum.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './forum.reducer';
import { IForum } from 'app/shared/model/forum.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IForumUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IForumUpdateState {
  isNew: boolean;
  forumId: number;
  rootId: number;
  userId: number;
}

export class ForumUpdate extends React.Component<IForumUpdateProps, IForumUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      forumId: 0,
      rootId: 0,
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

    this.props.getForums();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.createDay = new Date(values.createDay);

    if (errors.length === 0) {
      const { forumEntity } = this.props;
      const entity = {
        ...forumEntity,
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
    this.props.history.push('/entity/forum');
  };

  render() {
    const { forumEntity, forums, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.forum.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.forum.home.createOrEditLabel">Create or edit a Forum</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : forumEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="forum-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="virtualAssistantApp.forum.title">Title</Translate>
                  </Label>
                  <AvField id="forum-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="virtualAssistantApp.forum.content">Content</Translate>
                  </Label>
                  <AvField id="forum-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDayLabel" for="createDay">
                    <Translate contentKey="virtualAssistantApp.forum.createDay">Create Day</Translate>
                  </Label>
                  <AvInput
                    id="forum-createDay"
                    type="datetime-local"
                    className="form-control"
                    name="createDay"
                    value={isNew ? null : convertDateTimeFromServer(this.props.forumEntity.createDay)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel" for="level">
                    <Translate contentKey="virtualAssistantApp.forum.level">Level</Translate>
                  </Label>
                  <AvField id="forum-level" type="number" className="form-control" name="level" />
                </AvGroup>
                <AvGroup>
                  <Label for="forum.id">
                    <Translate contentKey="virtualAssistantApp.forum.forum">Forum</Translate>
                  </Label>
                  <AvInput id="forum-forum" type="select" className="form-control" name="forum.id">
                    <option value="" key="0" />
                    {forums
                      ? forums.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user.id">
                    <Translate contentKey="virtualAssistantApp.forum.user">User</Translate>
                  </Label>
                  <AvInput id="forum-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/forum" replace color="info">
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
  forums: storeState.forum.entities,
  users: storeState.userManagement.users,
  forumEntity: storeState.forum.entity,
  loading: storeState.forum.loading,
  updating: storeState.forum.updating
});

const mapDispatchToProps = {
  getForums,
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
)(ForumUpdate);
