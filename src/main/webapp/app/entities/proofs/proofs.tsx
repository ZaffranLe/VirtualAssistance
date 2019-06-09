import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './proofs.reducer';
import { IProofs } from 'app/shared/model/proofs.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProofsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Proofs extends React.Component<IProofsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { proofsList, match } = this.props;
    return (
      <div>
        <h2 id="proofs-heading">
          <Translate contentKey="virtualAssistantApp.proofs.home.title">Proofs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.proofs.home.createLabel">Create new Proofs</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.proofs.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.proofs.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.proofs.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.proofs.answer">Answer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proofsList.map((proofs, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${proofs.id}`} color="link" size="sm">
                      {proofs.id}
                    </Button>
                  </td>
                  <td>{proofs.name}</td>
                  <td>{proofs.url}</td>
                  <td>{proofs.type ? <Link to={`proof-type/${proofs.type.id}`}>{proofs.type.id}</Link> : ''}</td>
                  <td>
                    {proofs.answers
                      ? proofs.answers.map((val, j) => (
                          <span key={j}>
                            <Link to={`answer/${val.id}`}>{val.id}</Link>
                            {j === proofs.answers.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${proofs.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proofs.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proofs.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ proofs }: IRootState) => ({
  proofsList: proofs.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Proofs);
