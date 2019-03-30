import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getAnswerEntities } from './answer.reducer';
import { IAnswer } from 'app/shared/model/answer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnswerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Answer extends React.Component<IAnswerProps> {
  componentDidMount() {
    this.props.getAnswerEntities();
  }

  render() {
    const { answerList, match } = this.props;
    return (
      <div>
        <h2 id="answer-heading">
          <Translate contentKey="virtualAssistantApp.answer.home.title">Answers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.answer.home.createLabel">Create new Answer</Translate>
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
                  <Translate contentKey="virtualAssistantApp.answer.scoreLadder">Score Ladder</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.answer.proof">Proof</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.answer.fullEvaluate">Full Evaluate</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.answer.criteriaEvaluate">Criteria Evaluate</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {answerList.map((answer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${answer.id}`} color="link" size="sm">
                      {answer.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`virtualAssistantApp.ScoreLadder.${answer.scoreLadder}`} />
                  </td>
                  <td>{answer.proof}</td>
                  <td>{answer.fullEvaluate ? <Link to={`full-evaluate/${answer.fullEvaluate.id}`}>{answer.fullEvaluate.id}</Link> : ''}</td>
                  <td>
                    {answer.criteriaEvaluate ? (
                      <Link to={`criteria-evaluate/${answer.criteriaEvaluate.id}`}>{answer.criteriaEvaluate.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${answer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${answer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${answer.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ answer }: IRootState) => ({
  answerList: answer.entities
});

const mapDispatchToProps = {
  getAnswerEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
