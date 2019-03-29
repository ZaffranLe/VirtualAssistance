import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getCriteriaEvaluateEntities } from './criteria-evaluate.reducer';
import { ICriteriaEvaluate } from 'app/shared/model/criteria-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export interface ICriteriaEvaluateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CriteriaEvaluate extends React.Component<ICriteriaEvaluateProps> {
  componentDidMount() {
    this.props.getCriteriaEvaluateEntities();
  }

  render() {
    const { criteriaEvaluateList, match } = this.props;
    const { isAdmin } = this.props;
    return (
      <div>
        <h2 id="criteria-evaluate-heading">
          <Translate contentKey="virtualAssistantApp.criteriaEvaluate.home.title">Criteria Evaluates</Translate>
          {isAdmin && (
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />&nbsp;
              <Translate contentKey="virtualAssistantApp.criteriaEvaluate.home.createLabel">Create new Criteria Evaluate</Translate>
            </Link>
          )}
        </h2>
        <div className="table-responsive">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.criteriaEvaluate.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.criteriaEvaluate.level">Level</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.criteriaEvaluate.criteriaType">Criteria Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {criteriaEvaluateList.map((criteriaEvaluate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${criteriaEvaluate.id}`} color="link" size="sm">
                      {criteriaEvaluate.id}
                    </Button>
                  </td>
                  <td>{criteriaEvaluate.content}</td>
                  <td>{criteriaEvaluate.level}</td>
                  <td>
                    {criteriaEvaluate.criteriaType ? (
                      <Link to={`criteria-type/${criteriaEvaluate.criteriaType.id}`}>{criteriaEvaluate.criteriaType.content}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${criteriaEvaluate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {isAdmin && (
                        <>
                          <Button tag={Link} to={`${match.url}/${criteriaEvaluate.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${criteriaEvaluate.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        </>
                      )}
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

const mapStateToProps = ({ criteriaEvaluate, authentication }: IRootState) => ({
  criteriaEvaluateList: criteriaEvaluate.entities,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getCriteriaEvaluateEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaEvaluate);
