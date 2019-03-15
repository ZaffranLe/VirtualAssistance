import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificationDetail extends React.Component<INotificationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.notification.detail.title">Notification</Translate> [<b>{notificationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="virtualAssistantApp.notification.name">Name</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="virtualAssistantApp.notification.description">Description</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.description}</dd>
            <dt>
              <span id="uRL">
                <Translate contentKey="virtualAssistantApp.notification.uRL">U RL</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.uRL}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="virtualAssistantApp.notification.status">Status</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.status}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.notification.headQuater">Head Quater</Translate>
            </dt>
            <dd>{notificationEntity.headQuater ? notificationEntity.headQuater.id : ''}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.notification.notificationType">Notification Type</Translate>
            </dt>
            <dd>{notificationEntity.notificationType ? notificationEntity.notificationType.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/notification" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/notification/${notificationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationEntity: notification.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDetail);
