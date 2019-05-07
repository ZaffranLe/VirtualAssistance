import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Badge, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAnswerEntities } from '../answer/answer.reducer';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './full-evaluate.reducer';
import { IFullEvaluate } from 'app/shared/model/full-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFullEvaluateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

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
export class FullEvaluateDetail extends React.Component<any, any> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getAnswerEntities();
  }
  download(link) {
    return (
      <a href={`api/downloadFileProof/${link}`}>
        <Button replace color="primary">
          <FontAwesomeIcon icon="download" /> Download
        </Button>
      </a>
    );
  }

  render() {
    const { fullEvaluateEntity } = this.props;
    const { answerList } = this.props;
    return (
      <Row>
        <Col md="12">
          <h2>
            <Translate contentKey="virtualAssistantApp.fullEvaluate.detail.title">FullEvaluate</Translate> của giáo viên [<b>
              {fullEvaluateEntity.teacher ? fullEvaluateEntity.teacher.fullName : ''}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="virtualAssistantApp.fullEvaluate.description">Description</Translate>
              </span>
            </dt>
            <dd>{fullEvaluateEntity.description}</dd>
            <dt>
              <span id="result">
                <Translate contentKey="virtualAssistantApp.fullEvaluate.result">Result</Translate>
              </span>
            </dt>
            <dd>
              <Badge color={getBadge(fullEvaluateEntity.result)} pill>
                <Translate contentKey={`virtualAssistantApp.ScoreLadder.${fullEvaluateEntity.result}`} />
              </Badge>
            </dd>
          </dl>
          <Table responsive hover bordered>
            <thead>
              <th>Tiêu chí</th>
              <th>Minh chứng</th>
              <th>Mức điểm</th>
            </thead>
            <tbody>
              {answerList
                .filter(answer => {
                  if (answer.fullEvaluate.id === fullEvaluateEntity.id) {
                    return true;
                  }
                  return false;
                })
                .map((answer, i) => (
                  <tr>
                    <td>{answer.criteriaEvaluate ? answer.criteriaEvaluate.content : ''}</td>
                    <td>{answer.proof ? this.download(answer.proof) : ''}</td>
                    <td>
                      <Translate contentKey={`virtualAssistantApp.ScoreLadder.${answer.scoreLadder}`} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button tag={Link} to="/entity/full-evaluate" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ fullEvaluate, answer }: IRootState) => ({
  fullEvaluateEntity: fullEvaluate.entity,
  answerList: answer.entities
});

const mapDispatchToProps = { getEntity, getAnswerEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullEvaluateDetail);
