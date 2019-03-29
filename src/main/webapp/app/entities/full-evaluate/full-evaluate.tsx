import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Badge } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './full-evaluate.reducer';
import { IFullEvaluate } from 'app/shared/model/full-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFullEvaluateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const getBadge = result => {
  const foo = 0;
  return result === 'EXCELLENT'
    ? 'success'
    : result === 'PASS'
      ? 'secondary'
      : result === 'GOOD'
        ? 'primary'
        : result === 'FAIL'
          ? 'danger'
          : 'primary';
};
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
                    <Badge color={getBadge(fullEvaluate.result)} pill>
                      <Translate contentKey={`virtualAssistantApp.ScoreLadder.${fullEvaluate.result}`} />
                    </Badge>
                  </td>
                  <td>
                    {fullEvaluate.teacher ? <Link to={`teacher/${fullEvaluate.teacher.id}`}>{fullEvaluate.teacher.fullName}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fullEvaluate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
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
