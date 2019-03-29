import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './criteria-evaluate.reducer';
import { ICriteriaEvaluate } from 'app/shared/model/criteria-evaluate.model';
// tslint:disable-next-line:no-unused-variable

export interface ICriteriaEvaluateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CriteriaEvaluateDetail extends React.Component<ICriteriaEvaluateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { criteriaEvaluateEntity } = this.props;
    const { isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.criteriaEvaluate.detail.title">CriteriaEvaluate</Translate> [<b>
              {criteriaEvaluateEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">
                <Translate contentKey="virtualAssistantApp.criteriaEvaluate.content">Content</Translate>
              </span>
            </dt>
            <dd>{criteriaEvaluateEntity.content}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="virtualAssistantApp.criteriaEvaluate.level">Level</Translate>
              </span>
            </dt>
            <dd>{criteriaEvaluateEntity.level}</dd>
            <dt>
              <span id="pass">
                <Translate contentKey="virtualAssistantApp.criteriaEvaluate.pass">Pass</Translate>
              </span>
            </dt>
            <dd>{criteriaEvaluateEntity.pass}</dd>
            <dt>
              <span id="good">
                <Translate contentKey="virtualAssistantApp.criteriaEvaluate.good">Good</Translate>
              </span>
            </dt>
            <dd>{criteriaEvaluateEntity.good}</dd>
            <dt>
              <span id="excellent">
                <Translate contentKey="virtualAssistantApp.criteriaEvaluate.excellent">Excellent</Translate>
              </span>
            </dt>
            <dd>{criteriaEvaluateEntity.excellent}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.criteriaEvaluate.criteriaType">Criteria Type</Translate>
            </dt>
            <dd>{criteriaEvaluateEntity.criteriaType ? criteriaEvaluateEntity.criteriaType.content : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/criteria-evaluate" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/criteria-evaluate/${criteriaEvaluateEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ criteriaEvaluate, authentication }: IRootState) => ({
  criteriaEvaluateEntity: criteriaEvaluate.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaEvaluateDetail);
