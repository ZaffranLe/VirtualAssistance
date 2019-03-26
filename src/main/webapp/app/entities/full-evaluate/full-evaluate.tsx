import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './full-evaluate.reducer';
import { IFullEvaluate } from 'app/shared/model/full-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFullEvaluateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FullEvaluate extends React.Component<IFullEvaluateProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { fullEvaluateList, match } = this.props;
    return (
      <div>
        <h2 id="full-evaluate-heading">
          <Translate contentKey="virtualAssistantApp.fullEvaluate.home.title">Full Evaluates</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.fullEvaluate.home.createLabel">Create new Full Evaluate</Translate>
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
                  <Translate contentKey="virtualAssistantApp.fullEvaluate.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.fullEvaluate.result">Result</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.fullEvaluate.teacher">Teacher</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fullEvaluateList.map((fullEvaluate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fullEvaluate.id}`} color="link" size="sm">
                      {fullEvaluate.id}
                    </Button>
                  </td>
                  <td>{fullEvaluate.description}</td>
                  <td>
                    <Translate contentKey={`virtualAssistantApp.ScoreLadder.${fullEvaluate.result}`} />
                  </td>
                  <td>{fullEvaluate.teacher ? <Link to={`teacher/${fullEvaluate.teacher.id}`}>{fullEvaluate.teacher.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fullEvaluate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fullEvaluate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fullEvaluate.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ fullEvaluate }: IRootState) => ({
  fullEvaluateList: fullEvaluate.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullEvaluate);
