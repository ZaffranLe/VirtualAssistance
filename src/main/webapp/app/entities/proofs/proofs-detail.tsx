import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './proofs.reducer';
import { IProofs } from 'app/shared/model/proofs.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProofsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProofsDetail extends React.Component<IProofsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { proofsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.proofs.detail.title">Proofs</Translate> [<b>{proofsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="virtualAssistantApp.proofs.name">Name</Translate>
              </span>
            </dt>
            <dd>{proofsEntity.name}</dd>
            <dt>
              <span id="url">
                <Translate contentKey="virtualAssistantApp.proofs.url">Url</Translate>
              </span>
            </dt>
            <dd>{proofsEntity.url}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.proofs.type">Type</Translate>
            </dt>
            <dd>{proofsEntity.type ? proofsEntity.type.id : ''}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.proofs.answer">Answer</Translate>
            </dt>
            <dd>
              {proofsEntity.answers
                ? proofsEntity.answers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === proofsEntity.answers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/proofs" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/proofs/${proofsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ proofs }: IRootState) => ({
  proofsEntity: proofs.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProofsDetail);
