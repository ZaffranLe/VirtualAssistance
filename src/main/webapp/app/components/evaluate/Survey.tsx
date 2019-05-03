import React, { Component } from 'react';
import { Row, Col, Table, Form, Button, Alert, Input, InputGroup } from 'reactstrap';
import QuestionRow from './QuestionRow';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCriteriaTypeEntities } from '../../entities/criteria-type/criteria-type.reducer';
import { getCriteriaEvaluateEntities } from '../../entities/criteria-evaluate/criteria-evaluate.reducer';
import { IRootState } from 'app/shared/reducers';
import { handleCreate, handleCreateWithName } from '../../entities/full-evaluate/full-evaluate.reducer';
import { getSession } from 'app/shared/reducers/authentication';
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
    this.props.getSession();
  }

  constructor(props) {
    super(props);
    this.state = {
      questionResult: Array(15).fill(1),
      result: 'Chưa đạt',
      nameSurvey: ''
    };
  }

  handleChange(e) {
    const resultList = this.state.questionResult.slice();
    resultList[e.target.name - 1] = e.target.value;
    const resultExpect = this.calculateResult(resultList);
    this.setState({
      questionResult: resultList,
      result: resultExpect
    });
  }
  handleValidSubmit = () => {
    // handleCreate(this.state.questionResult.toString(), this.state.result);
    handleCreateWithName(this.state.questionResult.toString(), this.state.result, this.state.nameSurvey);
    alert('Đánh giá hoàn thành!');
    window.location.reload();
  };

  calculateResult(resultList) {
    let i;
    let kha = 0;
    let tot = 0;
    for (i = 0; i < resultList.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (resultList[i] == 1) return 'Chưa đạt';
      // tslint:disable-next-line:triple-equals
      resultList[i] == 3 ? kha++ : resultList[i] == 4 && tot++;
    }

    for (i = 2; i < 7; i++) {
      // tslint:disable-next-line:triple-equals
      if (resultList[i] == 2) return 'Đạt';
    }

    if (kha + tot < 10) return 'Đạt';

    if (tot >= 10) {
      for (i = 2; i < 7; i++) {
        // tslint:disable-next-line:triple-equals
        if (resultList[i] == 3) return 'Khá';
      }
      return 'Tốt';
    }
    return 'Khá';
  }

  updateInputValue(e) {
    this.setState({
      nameSurvey: e.target.value
    });
  }

  render() {
    const { criteriaTypeList, matchType } = this.props;
    const { criteriaEvaluateList, matchEvaluate } = this.props;
    const { account } = this.props;
    return (
      <div className="animated fadeIn">
        <Form>
          <Row>
            <Col lg={{ size: 10, offset: 1 }}>
              <InputGroup size="lg">
                <Input
                  type="text"
                  name="nameSurvey"
                  id="nameSurvey"
                  placeholder="Tên  bản đánh giá"
                  value={this.state.nameSurvey}
                  onChange={e => this.updateInputValue(e)}
                />
              </InputGroup>
              <br />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Table bordered responsive className="bg-white text-center">
                <thead className="bg-primary">
                  <th className="text-left align-middle">Mô tả tiêu chí đánh giá</th>
                  {/* <th className="align-middle">Chưa đạt</th>
                  <th className="align-middle">Đạt</th>
                  <th className="align-middle">Khá</th>
                  <th className="align-middle">Tốt</th> */}
                </thead>
                <tbody>
                  {criteriaTypeList.map((criteriaType, index) => [
                    <QuestionGroupHeader key={index} criteriaType={criteriaType} />,
                    criteriaEvaluateList.map(
                      (criteriaEvaluate, indexEvaluate) =>
                        criteriaEvaluate.criteriaType.id === criteriaType.id && (
                          <QuestionRow key={indexEvaluate} onChange={e => this.handleChange(e)} criteriaEvaluate={criteriaEvaluate} />
                        )
                    )
                  ])}
                  <tr>
                    <td className="align-middle">
                      <Alert color={getAlertColor(this.state.result)}>
                        Xếp loại hiện tại: <strong>{this.state.result}</strong>
                      </Alert>

                      <Button className="btn-pill" color="primary" onClick={this.handleValidSubmit}>
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

const mapStateToProps = ({ authentication, criteriaType, criteriaEvaluate }: IRootState) => ({
  criteriaTypeList: criteriaType.entities,
  criteriaEvaluateList: criteriaEvaluate.entities,
  account: authentication.account
});

const mapDispatchToProps = {
  getCriteriaTypeEntities,
  getCriteriaEvaluateEntities,
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey);
