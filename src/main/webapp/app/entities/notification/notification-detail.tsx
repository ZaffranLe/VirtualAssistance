import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, CardImg, Card } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
// tslint:disable-next-line:no-unused-variable

export interface INotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificationDetail extends React.Component<INotificationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificationEntity } = this.props;
    const { isAdmin } = this.props;
    return (
      <Row className="justify-content-center">
        <Col md="6">
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
              <Translate contentKey="virtualAssistantApp.notification.headQuater">Head Quater</Translate>
            </dt>
            <dd>{notificationEntity.headQuater ? notificationEntity.headQuater.name : ''}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.notification.notificationType">Notification Type</Translate>
            </dt>
            <dd>{notificationEntity.notificationType ? notificationEntity.notificationType.content : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/notification" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/notification/${notificationEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
          )}
        </Col>
        <Col md="5">
          <Card>
            <CardImg src={notificationEntity.uRL} width="100%" />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ authentication, notification }: IRootState) => ({
  notificationEntity: notification.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDetail);
