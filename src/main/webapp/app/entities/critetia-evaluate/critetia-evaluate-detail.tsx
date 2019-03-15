import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './critetia-evaluate.reducer';
import { ICritetiaEvaluate } from 'app/shared/model/critetia-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICritetiaEvaluateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CritetiaEvaluateDetail extends React.Component<ICritetiaEvaluateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { critetiaEvaluateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.critetiaEvaluate.detail.title">CritetiaEvaluate</Translate> [<b>
              {critetiaEvaluateEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">
                <Translate contentKey="virtualAssistantApp.critetiaEvaluate.content">Content</Translate>
              </span>
            </dt>
            <dd>{critetiaEvaluateEntity.content}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="virtualAssistantApp.critetiaEvaluate.level">Level</Translate>
              </span>
            </dt>
            <dd>{critetiaEvaluateEntity.level}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.critetiaEvaluate.criteriaType">Criteria Type</Translate>
            </dt>
            <dd>{critetiaEvaluateEntity.criteriaType ? critetiaEvaluateEntity.criteriaType.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/critetia-evaluate" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/critetia-evaluate/${critetiaEvaluateEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ critetiaEvaluate }: IRootState) => ({
  critetiaEvaluateEntity: critetiaEvaluate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CritetiaEvaluateDetail);
