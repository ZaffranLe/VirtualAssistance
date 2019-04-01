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
import { getCriteriaTypeEntities as getCriteriaTypes } from 'app/entities/criteria-type/criteria-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './criteria-evaluate.reducer';
import { ICriteriaEvaluate } from 'app/shared/model/criteria-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICriteriaEvaluateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICriteriaEvaluateUpdateState {
  isNew: boolean;
  criteriaTypeId: number;
}

export class CriteriaEvaluateUpdate extends React.Component<ICriteriaEvaluateUpdateProps, ICriteriaEvaluateUpdateState> {
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
      const { criteriaEvaluateEntity } = this.props;
      const entity = {
        ...criteriaEvaluateEntity,
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
    this.props.history.push('/entity/criteria-evaluate');
  };

  render() {
    const { criteriaEvaluateEntity, criteriaTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.criteriaEvaluate.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.criteriaEvaluate.home.createOrEditLabel">
                Create or edit a CriteriaEvaluate
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : criteriaEvaluateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="criteria-evaluate-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="virtualAssistantApp.criteriaEvaluate.content">Content</Translate>
                  </Label>
                  <AvField id="criteria-evaluate-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel" for="level">
                    <Translate contentKey="virtualAssistantApp.criteriaEvaluate.level">Level</Translate>
                  </Label>
                  <AvField id="criteria-evaluate-level" type="number" className="form-control" name="level" />
                </AvGroup>
                <AvGroup>
                  <Label id="passLabel" for="pass">
                    <Translate contentKey="virtualAssistantApp.criteriaEvaluate.pass">Pass</Translate>
                  </Label>
                  <AvField id="criteria-evaluate-pass" type="text" name="pass" />
                </AvGroup>
                <AvGroup>
                  <Label id="goodLabel" for="good">
                    <Translate contentKey="virtualAssistantApp.criteriaEvaluate.good">Good</Translate>
                  </Label>
                  <AvField id="criteria-evaluate-good" type="text" name="good" />
                </AvGroup>
                <AvGroup>
                  <Label id="excellentLabel" for="excellent">
                    <Translate contentKey="virtualAssistantApp.criteriaEvaluate.excellent">Excellent</Translate>
                  </Label>
                  <AvField id="criteria-evaluate-excellent" type="text" name="excellent" />
                </AvGroup>
                <AvGroup>
                  <Label for="criteriaType.id">
                    <Translate contentKey="virtualAssistantApp.criteriaEvaluate.criteriaType">Criteria Type</Translate>
                  </Label>
                  <AvInput id="criteria-evaluate-criteriaType" type="select" className="form-control" name="criteriaType.id">
                    <option value="" key="0" />
                    {criteriaTypes
                      ? criteriaTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.content}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/criteria-evaluate" replace color="info">
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
  criteriaEvaluateEntity: storeState.criteriaEvaluate.entity,
  loading: storeState.criteriaEvaluate.loading,
  updating: storeState.criteriaEvaluate.updating
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
)(CriteriaEvaluateUpdate);
