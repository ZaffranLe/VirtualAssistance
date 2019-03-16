import React, { Component } from 'react';
import { Row, Col, Table, Form, Button, Alert, Collapse } from 'reactstrap';
import surveyQuestionsData from './SurveyQuestionsData';
import groupsQuestionData from './GroupsQuestionData';
import QuestionRow from './QuestionRow';
function QuestionGroupHeader(props) {
  const group = props.group;
  return (
    <tr key={group.id.toString()}>
      <td colspan="5" className="text-left bg-light">
        <strong>
          <h4>
            Tiêu chuẩn {group.id + 1}. {group.name}
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
      if (resultList[i] == 1) return 'Chưa đạt';
      // eslint-disable-next-line
      resultList[i] == 3 ? kha++ : resultList[i] == 4 && tot++;
    }

    for (i = 2; i < 7; i++) {
      // eslint-disable-next-line
      if (resultList[i] == 2) return 'Đạt';
    }

    if (kha + tot < 10) return 'Đạt';

    if (tot >= 10) {
      // eslint-disable-next-line
      for (i = 2; i < 7; i++) {
        // eslint-disable-next-line
        if (resultList[i] == 3) return 'Khá';
      }
      return 'Tốt';
    }
    return 'Khá';
  }

  render() {
    const groupQuestionList = groupsQuestionData;
    const questionList = surveyQuestionsData;
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
                  {groupQuestionList.map((group, index) => [
                    <QuestionGroupHeader key={index} group={group} />,
                    questionList.map(
                      (question, index) =>
                        question.group === group.id && <QuestionRow key={index} onChange={e => this.handleChange(e)} question={question} />
                    )
                  ])}
                  <tr>
                    <td className="align-middle">
                      <Alert color={getAlertColor(this.state.result)}>
                        Xếp loại hiện tại: <strong>{this.state.result}</strong>
                      </Alert>
                    </td>
                    <td colspan="4" className="align-middle">
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

export default Survey;
