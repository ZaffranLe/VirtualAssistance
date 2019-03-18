import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getCriteriaTypeEntities } from './criteria-type.reducer';
import { ICriteriaType } from 'app/shared/model/criteria-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICriteriaTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CriteriaType extends React.Component<ICriteriaTypeProps> {
  componentDidMount() {
    this.props.getCriteriaTypeEntities();
  }

  render() {
    const { criteriaTypeList, match } = this.props;
    return (
      <div>
        <h2 id="criteria-type-heading">
          <Translate contentKey="virtualAssistantApp.criteriaType.home.title">Criteria Types</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.criteriaType.home.createLabel">Create new Criteria Type</Translate>
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
                  <Translate contentKey="virtualAssistantApp.criteriaType.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.criteriaType.level">Level</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {criteriaTypeList.map((criteriaType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${criteriaType.id}`} color="link" size="sm">
                      {criteriaType.id}
                    </Button>
                  </td>
                  <td>{criteriaType.content}</td>
                  <td>{criteriaType.level}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${criteriaType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${criteriaType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${criteriaType.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ criteriaType }: IRootState) => ({
  criteriaTypeList: criteriaType.entities
});

const mapDispatchToProps = {
  getCriteriaTypeEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaType);
