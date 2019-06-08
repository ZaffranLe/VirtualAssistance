import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProofType } from 'app/shared/model/proof-type.model';
import { getEntities as getProofTypes } from 'app/entities/proof-type/proof-type.reducer';
import { IAnswer } from 'app/shared/model/answer.model';
import { getEntities as getAnswers } from 'app/entities/answer/answer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './proofs.reducer';
import { IProofs } from 'app/shared/model/proofs.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProofsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProofsUpdateState {
  isNew: boolean;
  idsanswer: any[];
  typeId: number;
}

export class ProofsUpdate extends React.Component<IProofsUpdateProps, IProofsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsanswer: [],
      typeId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getProofTypes();
    this.props.getAnswers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { proofsEntity } = this.props;
      const entity = {
        ...proofsEntity,
        ...values,
        answers: mapIdList(values.answers)
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
    this.props.history.push('/entity/proofs');
  };

  render() {
    const { proofsEntity, proofTypes, answers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.proofs.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.proofs.home.createOrEditLabel">Create or edit a Proofs</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : proofsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="proofs-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="virtualAssistantApp.proofs.name">Name</Translate>
                  </Label>
                  <AvField id="proofs-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="virtualAssistantApp.proofs.url">Url</Translate>
                  </Label>
                  <AvField id="proofs-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label for="type.id">
                    <Translate contentKey="virtualAssistantApp.proofs.type">Type</Translate>
                  </Label>
                  <AvInput id="proofs-type" type="select" className="form-control" name="type.id">
                    <option value="" key="0" />
                    {proofTypes
                      ? proofTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="answers">
                    <Translate contentKey="virtualAssistantApp.proofs.answer">Answer</Translate>
                  </Label>
                  <AvInput
                    id="proofs-answer"
                    type="select"
                    multiple
                    className="form-control"
                    name="answers"
                    value={proofsEntity.answers && proofsEntity.answers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {answers
                      ? answers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/proofs" replace color="info">
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
  proofTypes: storeState.proofType.entities,
  answers: storeState.answer.entities,
  proofsEntity: storeState.proofs.entity,
  loading: storeState.proofs.loading,
  updating: storeState.proofs.updating
});

const mapDispatchToProps = {
  getProofTypes,
  getAnswers,
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
)(ProofsUpdate);
