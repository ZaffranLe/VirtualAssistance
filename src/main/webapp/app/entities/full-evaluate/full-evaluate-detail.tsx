import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './full-evaluate.reducer';
import { IFullEvaluate } from 'app/shared/model/full-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFullEvaluateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FullEvaluateDetail extends React.Component<IFullEvaluateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fullEvaluateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.fullEvaluate.detail.title">FullEvaluate</Translate> [<b>{fullEvaluateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="virtualAssistantApp.fullEvaluate.description">Description</Translate>
              </span>
            </dt>
            <dd>{fullEvaluateEntity.description}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.fullEvaluate.teacher">Teacher</Translate>
            </dt>
            <dd>{fullEvaluateEntity.teacher ? fullEvaluateEntity.teacher.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/full-evaluate" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/full-evaluate/${fullEvaluateEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ fullEvaluate }: IRootState) => ({
  fullEvaluateEntity: fullEvaluate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullEvaluateDetail);
