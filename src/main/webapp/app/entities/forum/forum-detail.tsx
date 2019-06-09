import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './forum.reducer';
import { IForum } from 'app/shared/model/forum.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IForumDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ForumDetail extends React.Component<IForumDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { forumEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.forum.detail.title">Forum</Translate> [<b>{forumEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="virtualAssistantApp.forum.title">Title</Translate>
              </span>
            </dt>
            <dd>{forumEntity.title}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="virtualAssistantApp.forum.content">Content</Translate>
              </span>
            </dt>
            <dd>{forumEntity.content}</dd>
            <dt>
              <span id="createDay">
                <Translate contentKey="virtualAssistantApp.forum.createDay">Create Day</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={forumEntity.createDay} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="level">
                <Translate contentKey="virtualAssistantApp.forum.level">Level</Translate>
              </span>
            </dt>
            <dd>{forumEntity.level}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.forum.forum">Forum</Translate>
            </dt>
            <dd>{forumEntity.forum ? forumEntity.forum.id : ''}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.forum.user">User</Translate>
            </dt>
            <dd>{forumEntity.user ? forumEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/forum" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/forum/${forumEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ forum }: IRootState) => ({
  forumEntity: forum.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumDetail);
