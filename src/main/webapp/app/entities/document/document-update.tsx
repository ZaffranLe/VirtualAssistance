import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDocumentType } from 'app/shared/model/document-type.model';
import { getEntities as getDocumentTypes } from 'app/entities/document-type/document-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDocumentUpdateState {
  isNew: boolean;
  idsdocumentType: any[];
}

export class DocumentUpdate extends React.Component<IDocumentUpdateProps, IDocumentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsdocumentType: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDocumentTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { documentEntity } = this.props;
      const entity = {
        ...documentEntity,
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
    this.props.history.push('/entity/document');
  };

  render() {
    const { documentEntity, documentTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.document.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.document.home.createOrEditLabel">Create or edit a Document</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : documentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="document-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="virtualAssistantApp.document.name">Name</Translate>
                  </Label>
                  <AvField id="document-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="virtualAssistantApp.document.description">Description</Translate>
                  </Label>
                  <AvField id="document-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="uRLLabel" for="uRL">
                    <Translate contentKey="virtualAssistantApp.document.uRL">U RL</Translate>
                  </Label>
                  <AvField id="document-uRL" type="text" name="uRL" />
                </AvGroup>
                <AvGroup>
                  <Label id="sizeLabel" for="size">
                    <Translate contentKey="virtualAssistantApp.document.size">Size</Translate>
                  </Label>
                  <AvField id="document-size" type="string" className="form-control" name="size" />
                </AvGroup>
                <AvGroup>
                  <Label id="tagLabel" for="tag">
                    <Translate contentKey="virtualAssistantApp.document.tag">Tag</Translate>
                  </Label>
                  <AvField id="document-tag" type="text" name="tag" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="virtualAssistantApp.document.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="document-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && documentEntity.status) || 'EXIST'}
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
                  <Label for="documentTypes">
                    <Translate contentKey="virtualAssistantApp.document.documentType">Document Type</Translate>
                  </Label>
                  <AvInput
                    id="document-documentType"
                    type="select"
                    multiple
                    className="form-control"
                    name="documentTypes"
                    value={documentEntity.documentTypes && documentEntity.documentTypes.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/document" replace color="info">
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
  documentTypes: storeState.documentType.entities,
  documentEntity: storeState.document.entity,
  loading: storeState.document.loading,
  updating: storeState.document.updating
});

const mapDispatchToProps = {
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
)(DocumentUpdate);
