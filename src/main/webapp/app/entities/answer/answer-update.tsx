import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFullEvaluate } from 'app/shared/model/full-evaluate.model';
import { getEntities as getFullEvaluates } from 'app/entities/full-evaluate/full-evaluate.reducer';
import { ICriteriaEvaluate } from 'app/shared/model/criteria-evaluate.model';
import { getEntities as getCriteriaEvaluates } from 'app/entities/criteria-evaluate/criteria-evaluate.reducer';
import { getEntity, updateEntity, createEntity, reset } from './answer.reducer';
import { IAnswer } from 'app/shared/model/answer.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAnswerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAnswerUpdateState {
  isNew: boolean;
  fullEvaluateId: number;
  criteriaEvaluateId: number;
}

export class AnswerUpdate extends React.Component<IAnswerUpdateProps, IAnswerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      fullEvaluateId: 0,
      criteriaEvaluateId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getFullEvaluates();
    this.props.getCriteriaEvaluates();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { answerEntity } = this.props;
      const entity = {
        ...answerEntity,
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
    this.props.history.push('/entity/answer');
  };

  render() {
    const { answerEntity, fullEvaluates, criteriaEvaluates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.answer.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.answer.home.createOrEditLabel">Create or edit a Answer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : answerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="answer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="scoreLadderLabel">
                    <Translate contentKey="virtualAssistantApp.answer.scoreLadder">Score Ladder</Translate>
                  </Label>
                  <AvInput
                    id="answer-scoreLadder"
                    type="select"
                    className="form-control"
                    name="scoreLadder"
                    value={(!isNew && answerEntity.scoreLadder) || 'FAIL'}
                  >
                    <option value="FAIL">
                      <Translate contentKey="virtualAssistantApp.ScoreLadder.FAIL" />
                    </option>
                    <option value="PASS">
                      <Translate contentKey="virtualAssistantApp.ScoreLadder.PASS" />
                    </option>
                    <option value="GOOD">
                      <Translate contentKey="virtualAssistantApp.ScoreLadder.GOOD" />
                    </option>
                    <option value="EXCELLENT">
                      <Translate contentKey="virtualAssistantApp.ScoreLadder.EXCELLENT" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="proofLabel" for="proof">
                    <Translate contentKey="virtualAssistantApp.answer.proof">Proof</Translate>
                  </Label>
                  <AvField id="answer-proof" type="text" name="proof" />
                </AvGroup>
                <AvGroup>
                  <Label for="fullEvaluate.id">
                    <Translate contentKey="virtualAssistantApp.answer.fullEvaluate">Full Evaluate</Translate>
                  </Label>
                  <AvInput id="answer-fullEvaluate" type="select" className="form-control" name="fullEvaluate.id">
                    <option value="" key="0" />
                    {fullEvaluates
                      ? fullEvaluates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="criteriaEvaluate.id">
                    <Translate contentKey="virtualAssistantApp.answer.criteriaEvaluate">Criteria Evaluate</Translate>
                  </Label>
                  <AvInput id="answer-criteriaEvaluate" type="select" className="form-control" name="criteriaEvaluate.id">
                    <option value="" key="0" />
                    {criteriaEvaluates
                      ? criteriaEvaluates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/answer" replace color="info">
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
  fullEvaluates: storeState.fullEvaluate.entities,
  criteriaEvaluates: storeState.criteriaEvaluate.entities,
  answerEntity: storeState.answer.entity,
  loading: storeState.answer.loading,
  updating: storeState.answer.updating
});

const mapDispatchToProps = {
  getFullEvaluates,
  getCriteriaEvaluates,
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
)(AnswerUpdate);
