import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './critetia-evaluate.reducer';
import { ICritetiaEvaluate } from 'app/shared/model/critetia-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICritetiaEvaluateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CritetiaEvaluate extends React.Component<ICritetiaEvaluateProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { critetiaEvaluateList, match } = this.props;
    return (
      <div>
        <h2 id="critetia-evaluate-heading">
          <Translate contentKey="virtualAssistantApp.critetiaEvaluate.home.title">Critetia Evaluates</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.critetiaEvaluate.home.createLabel">Create new Critetia Evaluate</Translate>
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
                  <Translate contentKey="virtualAssistantApp.critetiaEvaluate.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.critetiaEvaluate.level">Level</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.critetiaEvaluate.criteriaType">Criteria Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {critetiaEvaluateList.map((critetiaEvaluate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${critetiaEvaluate.id}`} color="link" size="sm">
                      {critetiaEvaluate.id}
                    </Button>
                  </td>
                  <td>{critetiaEvaluate.content}</td>
                  <td>{critetiaEvaluate.level}</td>
                  <td>
                    {critetiaEvaluate.criteriaType ? (
                      <Link to={`criteria-type/${critetiaEvaluate.criteriaType.id}`}>{critetiaEvaluate.criteriaType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${critetiaEvaluate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${critetiaEvaluate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${critetiaEvaluate.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ critetiaEvaluate }: IRootState) => ({
  critetiaEvaluateList: critetiaEvaluate.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CritetiaEvaluate);
