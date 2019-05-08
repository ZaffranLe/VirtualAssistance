import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress
} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities as getFullEvaluateEntities } from '../full-evaluate/full-evaluate.reducer';
// tslint:disable-next-line:no-unused-variable

function EvaluateRow(props) {
  const evaluate = props.evaluate;

  return (
    <tr key={evaluate.id.toString()}>
      <th scope="row">{evaluate.description}</th>
      <td>
        <Badge color={getBadge(evaluate.result)} pill>
          <Translate contentKey={`virtualAssistantApp.ScoreLadder.${evaluate.result}`} />
        </Badge>
      </td>
      <td>
        <Button tag={Link} to={`${'../full-evaluate'}/${evaluate.id}`} color="info" size="sm">
          <FontAwesomeIcon icon="eye" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.view">View</Translate>
          </span>
        </Button>
      </td>
    </tr>
  );
}

// tslint:disable-next-line:ter-arrow-body-style
const getBadge = result => {
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

export class EvaluateResult extends React.Component<any, any> {
  pagesSurveysCount: number;
  pageSize: number;

  constructor(props) {
    super(props);

    this.pageSize = 4;

    this.state = {
      currentSurveyPage: 0,
      txtSearchSurvey: '',
      fullEvaluateList: props.fullEvaluateList
    };
  }

  handleChangeSurveyPage(e, index) {
    e.preventDefault();

    this.setState({
      currentSurveyPage: index
    });
  }

  handleSearchSurveyChange(e) {
    e.preventDefault();

    this.setState({
      txtSearchSurvey: e.target.value.toLowerCase()
    });
  }

  render() {
    const { currentSurveyPage } = this.state;
    this.pagesSurveysCount = Math.ceil(this.state.fullEvaluateList.length / this.pageSize);
    return (
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row>
                <Col lg={4}>
                  <h4>
                    <i className="cui-speech" /> Kết quả tự đánh giá
                  </h4>
                </Col>
                <Col lg={8}>
                  <Input
                    type="text"
                    name="txtSurveySearch"
                    placeholder="Nhập tên kỳ đánh giá cần tìm"
                    onChange={e => this.handleSearchSurveyChange(e)}
                  />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive hover className="text-center">
                <thead className="thead-light">
                  <th>Bản đánh giá</th>
                  <th>Xếp loại</th>
                  <th />
                </thead>
                <tbody>
                  {this.state.fullEvaluateList
                    .filter(
                      evaluate =>
                        evaluate.description.toLowerCase().includes(this.state.txtSearchSurvey) &&
                        evaluate.teacher.id === this.props.teacherId
                    )
                    .slice(currentSurveyPage * this.pageSize, (currentSurveyPage + 1) * this.pageSize)
                    .map((evaluate, index) => <EvaluateRow key={index} evaluate={evaluate} />)}
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem disabled={currentSurveyPage <= 0}>
                  <PaginationLink previous tag="button" onClick={e => this.handleChangeSurveyPage(e, currentSurveyPage - 1)} />
                </PaginationItem>
                {[...Array(this.pagesSurveysCount)].map((page, i) => (
                  <PaginationItem className="d-none d-sm-block" active={i === currentSurveyPage} key={i}>
                    <PaginationLink onClick={e => this.handleChangeSurveyPage(e, i)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentSurveyPage >= this.pagesSurveysCount - 1}>
                  <PaginationLink next tag="button" onClick={e => this.handleChangeSurveyPage(e, currentSurveyPage + 1)} />
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default EvaluateResult;
