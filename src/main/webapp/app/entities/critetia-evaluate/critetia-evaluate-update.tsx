import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICriteriaType } from 'app/shared/model/criteria-type.model';
import { getEntities as getCriteriaTypes } from 'app/entities/criteria-type/criteria-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './critetia-evaluate.reducer';
import { ICritetiaEvaluate } from 'app/shared/model/critetia-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICritetiaEvaluateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICritetiaEvaluateUpdateState {
  isNew: boolean;
  criteriaTypeId: number;
}

export class CritetiaEvaluateUpdate extends React.Component<ICritetiaEvaluateUpdateProps, ICritetiaEvaluateUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      criteriaTypeId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCriteriaTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { critetiaEvaluateEntity } = this.props;
      const entity = {
        ...critetiaEvaluateEntity,
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
    this.props.history.push('/entity/critetia-evaluate');
  };

  render() {
    const { critetiaEvaluateEntity, criteriaTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.critetiaEvaluate.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.critetiaEvaluate.home.createOrEditLabel">
                Create or edit a CritetiaEvaluate
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : critetiaEvaluateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="critetia-evaluate-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="virtualAssistantApp.critetiaEvaluate.content">Content</Translate>
                  </Label>
                  <AvField id="critetia-evaluate-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel" for="level">
                    <Translate contentKey="virtualAssistantApp.critetiaEvaluate.level">Level</Translate>
                  </Label>
                  <AvField id="critetia-evaluate-level" type="number" className="form-control" name="level" />
                </AvGroup>
                <AvGroup>
                  <Label for="criteriaType.id">
                    <Translate contentKey="virtualAssistantApp.critetiaEvaluate.criteriaType">Criteria Type</Translate>
                  </Label>
                  <AvInput id="critetia-evaluate-criteriaType" type="select" className="form-control" name="criteriaType.id">
                    <option value="" key="0" />
                    {criteriaTypes
                      ? criteriaTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/critetia-evaluate" replace color="info">
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
  criteriaTypes: storeState.criteriaType.entities,
  critetiaEvaluateEntity: storeState.critetiaEvaluate.entity,
  loading: storeState.critetiaEvaluate.loading,
  updating: storeState.critetiaEvaluate.updating
});

const mapDispatchToProps = {
  getCriteriaTypes,
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
)(CritetiaEvaluateUpdate);
