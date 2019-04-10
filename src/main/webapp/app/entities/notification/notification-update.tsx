import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHeadQuater } from 'app/shared/model/head-quater.model';
import { getEntities as getHeadQuaters } from 'app/entities/head-quater/head-quater.reducer';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { getEntities as getDocumentTypes } from 'app/entities/document-type/document-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotificationUpdateState {
  isNew: boolean;
  idsdocumentType: any[];
  headQuaterId: number;
}

export class NotificationUpdate extends React.Component<INotificationUpdateProps, INotificationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsdocumentType: [],
      headQuaterId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getHeadQuaters();
    this.props.getDocumentTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { notificationEntity } = this.props;
      const entity = {
        ...notificationEntity,
        ...values,
        documentTypes: mapIdList(values.documentTypes)
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
    this.props.history.push('/entity/notification');
  };

  render() {
    const { notificationEntity, headQuaters, documentTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.notification.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.notification.home.createOrEditLabel">Create or edit a Notification</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : notificationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="notification-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="virtualAssistantApp.notification.name">Name</Translate>
                  </Label>
                  <AvField id="notification-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="virtualAssistantApp.notification.description">Description</Translate>
                  </Label>
                  <AvField id="notification-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="uRLLabel" for="uRL">
                    <Translate contentKey="virtualAssistantApp.notification.uRL">U RL</Translate>
                  </Label>
                  <AvField id="notification-uRL" type="text" name="uRL" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="virtualAssistantApp.notification.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="notification-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && notificationEntity.status) || 'EXIST'}
                  >
                    <option value="EXIST">
                      <Translate contentKey="virtualAssistantApp.Status.EXIST" />
                    </option>
                    <option value="DELETED">
                      <Translate contentKey="virtualAssistantApp.Status.DELETED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="headQuater.id">
                    <Translate contentKey="virtualAssistantApp.notification.headQuater">Head Quater</Translate>
                  </Label>
                  <AvInput id="notification-headQuater" type="select" className="form-control" name="headQuater.id">
                    <option value="" key="0" />
                    {headQuaters
                      ? headQuaters.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="documentTypes">
                    <Translate contentKey="virtualAssistantApp.notification.notificationType">Document Type</Translate>
                  </Label>
                  <AvInput
                    id="notification-documentType"
                    type="select"
                    multiple
                    className="form-control"
                    name="documentTypes"
                    value={notificationEntity.documentTypes && notificationEntity.documentTypes.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {documentTypes
                      ? documentTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/notification" replace color="info">
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
  headQuaters: storeState.headQuater.entities,
  documentTypes: storeState.documentType.entities,
  notificationEntity: storeState.notification.entity,
  loading: storeState.notification.loading,
  updating: storeState.notification.updating
});

const mapDispatchToProps = {
  getHeadQuaters,
  getDocumentTypes,
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
)(NotificationUpdate);
