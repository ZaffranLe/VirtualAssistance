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
import { getEntity, updateEntity, createEntityNewtopic, reset } from './forum.reducer';
import { IForum } from 'app/shared/model/forum.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import value from '*.json';

export interface IForumUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IForumUpdateState {
  isNew: boolean;
  forumId: number;
  rootId: number;
  userId: number;
  content: string;
}

export class ForumNewTopic extends React.Component<IForumUpdateProps, IForumUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      forumId: 0,
      rootId: 0,
      userId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id,
      content: ''
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
    if (errors.length === 0) {
      const { forumEntity } = this.props;
      const entity = {
        ...forumEntity,
        ...values
      };
      entity.content = this.state.content;
      entity.createDay = new Date(values.createDay);
      entity.level = 1;
      this.props.createEntityNewtopic(entity);
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/forum/list');
  };

  handleChangeContent = value => {
    this.state.content = value;
  };
  render() {
    const { forumEntity, forums, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.forum.home.createOrEditLabel">Tạo chủ đề mới</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={{}} onSubmit={this.saveEntity}>
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
                  <ReactQuill value={this.state.content} onChange={this.handleChangeContent} className="mb-3" />
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
  createEntityNewtopic,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumNewTopic);
