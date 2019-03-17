import React, { Component } from 'react';
import { Row, Col, Table, Form, Button, Alert } from 'reactstrap';
import surveyQuestionsData from './SurveyQuestionsData';
import QuestionRow from './QuestionRow';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCriteriaTypeEntities } from '../../entities/criteria-type/criteria-type.reducer';
import { getCriteriaEvaluateEntities } from '../../entities/critetia-evaluate/critetia-evaluate.reducer';
import { IRootState } from 'app/shared/reducers';
export interface ICriteriaTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface ICriteriaEvaluateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

function QuestionGroupHeader(props) {
  const criteriaType = props.criteriaType;
  return (
    <tr key={criteriaType.id.toString()}>
      <td colSpan={5} className="text-left bg-light">
        <strong>
          <h4>
            Tiêu chuẩn {criteriaType.id}. {criteriaType.content}
          </h4>
        </strong>
      </td>
    </tr>
  );
}

const getAlertColor = result => {
  const foo = 0;
  return result === 'Tốt'
    ? 'success'
    : result === 'Đạt'
      ? 'secondary'
      : result === 'Khá'
        ? 'primary'
        : result === 'Chưa đạt'
          ? 'danger'
          : 'primary';
};

class Survey extends React.Component<any, any> {
  componentDidMount() {
    this.props.getCriteriaTypeEntities();
    this.props.getCriteriaEvaluateEntities();
  }

  constructor(props) {
    super(props);

    this.state = {
      questionResult: Array(15).fill(1),
      result: ''
    };
  }

  handleChange(e) {
    const resultList = this.state.questionResult.slice();
    resultList[e.target.name] = e.target.value;
    const result = this.calculateResult(resultList);
    this.setState({
      questionResult: resultList,
      result: result
    });
  }

  calculateResult(resultList) {
    let i;
    let kha = 0;
    let tot = 0;
    for (i = 0; i < resultList.length; i++) {
      // eslint-disable-next-line
      if (resultList[i] === 1) return 'Chưa đạt';
      // eslint-disable-next-line
      resultList[i] === 3 ? kha++ : resultList[i] === 4 && tot++;
    }

    for (i = 2; i < 7; i++) {
      // eslint-disable-next-line
      if (resultList[i] === 2) return 'Đạt';
    }

    if (kha + tot < 10) return 'Đạt';

    if (tot >= 10) {
      // eslint-disable-next-line
      for (i = 2; i < 7; i++) {
        // eslint-disable-next-line
        if (resultList[i] === 3) return 'Khá';
      }
      return 'Tốt';
    }
    return 'Khá';
  }

  render() {
    const { criteriaTypeList, matchType } = this.props;
    const { criteriaEvaluateList, matchEvaluate } = this.props;
    return (
      <div className="animated fadeIn">
        <Form>
          <Row>
            <Col lg={12}>
              <Table bordered responsive className="bg-white text-center">
                <thead className="bg-primary">
                  <th className="text-left align-middle">Mô tả tiêu chí đánh giá</th>
                  <th className="align-middle">Chưa đạt</th>
                  <th className="align-middle">Đạt</th>
                  <th className="align-middle">Khá</th>
                  <th className="align-middle">Tốt</th>
                </thead>
                <tbody>
                  {criteriaTypeList.map((criteriaType, index) => [
                    <QuestionGroupHeader key={index} criteriaType={criteriaType} />,
                    criteriaEvaluateList.map(
                      (criteriaEvaluate, index) =>
                        criteriaEvaluate.criteriaType.id === criteriaType.id && (
                          <QuestionRow key={index} onChange={e => this.handleChange(e)} criteriaEvaluate={criteriaEvaluate} />
                        )
                    )
                  ])}
                  <tr>
                    <td className="align-middle">
                      {/* <Alert color={getAlertColor(this.state.result)}>
                        Xếp loại hiện tại: <strong>{this.state.result}</strong>
                      </Alert> */}
                    </td>
                    <td colSpan={4} className="align-middle">
                      <Button className="btn-pill" color="primary">
                        Lưu bản đánh giá
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ criteriaType, critetiaEvaluate }: IRootState) => ({
  criteriaTypeList: criteriaType.entities,
  criteriaEvaluateList: critetiaEvaluate.entities
});

const mapDispatchToProps = {
  getCriteriaTypeEntities,
  getCriteriaEvaluateEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey);
