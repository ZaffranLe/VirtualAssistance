import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './criteria-type.reducer';
import { ICriteriaType } from 'app/shared/model/criteria-type.model';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
export interface ICriteriaTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CriteriaTypeDetail extends React.Component<ICriteriaTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { criteriaTypeEntity } = this.props;
    const { isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.criteriaType.detail.title">CriteriaType</Translate> [<b>{criteriaTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">
                <Translate contentKey="virtualAssistantApp.criteriaType.content">Content</Translate>
              </span>
            </dt>
            <dd>{criteriaTypeEntity.content}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="virtualAssistantApp.criteriaType.level">Level</Translate>
              </span>
            </dt>
            <dd>{criteriaTypeEntity.level}</dd>
          </dl>
          <Button tag={Link} to="/entity/criteria-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/criteria-type/${criteriaTypeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ criteriaType, authentication }: IRootState) => ({
  criteriaTypeEntity: criteriaType.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaTypeDetail);
