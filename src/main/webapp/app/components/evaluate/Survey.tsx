import React, { Component } from 'react';
import { Row, Col, Table, Form, Button, Alert, Input, InputGroup } from 'reactstrap';
import QuestionRow from './QuestionRow';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCriteriaTypeEntities } from '../../entities/criteria-type/criteria-type.reducer';
import { getCriteriaEvaluateEntities } from '../../entities/criteria-evaluate/criteria-evaluate.reducer';
import { IRootState } from 'app/shared/reducers';
import { handleCreate, handleCreateWithName, getEntity } from '../../entities/full-evaluate/full-evaluate.reducer';
import { getEntityByFullEval } from '../../entities/answer/answer.reducer';
import { getSession } from 'app/shared/reducers/authentication';
import { IAnswer, ScoreLadder } from 'app/shared/model/answer.model';
import { ICriteriaEvaluate } from 'app/shared/model/criteria-evaluate.model';
import answer from 'app/entities/answer/answer';
export interface ICriteriaTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface ICriteriaEvaluateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export interface ISurveyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

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

class Survey extends React.Component<ISurveyUpdateProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      questionResult: Array(15).fill(1),
      fileResult: Array(15).fill(''),
      result: 'Chưa đạt',
      nameSurvey: '',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
    // console.
    // this.handleUploadFile.bind(this);
    this.props.getSession();
    this.props.getCriteriaTypeEntities();
    this.props.getCriteriaEvaluateEntities();
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
      this.props.getEntityByFullEval(this.props.match.params.id);
      this.setState({
        questionResult: this.props.answerList.map(a => a.scoreLadder).slice()
      });
      const result = this.calculateResult(this.state.questionResult);
      this.setState({
        result
      });
    }
  }
  componentWillMount() {}

  componentDidMount() {
    // this.handleUploadFile.bind(this);
  }

  handleUploadFile = (file, id) => {
    console.log('file::::::' + file);
    const fileList = this.state.fileResult.slice();
    fileList[id - 1] = file;
    console.log(fileList);
    this.setState({
      fileResult: fileList
    });
  };

  getValueFromAnsCriteria(id: number) {
    console.log('id=' + id);
    const ans = this.props.answerList.find(a => a.criteriaEvaluate.id === id);
    if (ans) {
      console.log(JSON.stringify(ans.scoreLadder));
      return ans.scoreLadder;
    }
    return ScoreLadder.FAIL;
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
    if (!this.state.nameSurvey) {
      alert('Chưa nhập tên bản đánh giá!');
      return;
    }
    handleCreateWithName(this.state.questionResult.toString(), this.state.result, this.state.fileResult.toString(), this.state.nameSurvey);
    alert('Đánh giá hoàn thành!');
    this.setState({
      questionResult: Array(15).fill(ScoreLadder.FAIL),
      fileResult: Array(15).fill(''),
      result: 'Chưa đạt',
      nameSurvey: 'Ban danh gia moi'
    });
    window.location.reload();
  };

  calculateResult(resultList) {
    let i;
    let kha = 0;
    let tot = 0;
    for (i = 0; i < resultList.length; i++) {
      if (resultList[i] === ScoreLadder.FAIL) return 'Chưa đạt';
      resultList[i] === ScoreLadder.GOOD ? kha++ : resultList[i] === ScoreLadder.EXCELLENT && tot++;
    }

    for (i = 2; i < 7; i++) {
      if (resultList[i] === ScoreLadder.PASS) return 'Đạt';
    }

    if (kha + tot < 10) return 'Đạt';

    if (tot >= 10) {
      for (i = 2; i < 7; i++) {
        // tslint:disable-next-line:triple-equals
        if (resultList[i] === ScoreLadder.GOOD) return 'Khá';
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
    const { criteriaTypeList } = this.props;
    const { fullEvaluateEntity, criteriaEvaluateList } = this.props;
    const { loadingAns } = this.props;
    if (loadingAns) return null;
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
                  placeholder="Tên bản đánh giá"
                  value={this.state.isNew ? this.state.nameSurvey : fullEvaluateEntity.description}
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
                          <QuestionRow
                            handleUploadFile={this.handleUploadFile}
                            key={indexEvaluate}
                            onChange={e => this.handleChange(e)}
                            criteriaEvaluate={criteriaEvaluate}
                            value={this.state.isNew ? null : this.getValueFromAnsCriteria(criteriaEvaluate.id)}
                          />
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

const mapStateToProps = ({ authentication, criteriaType, criteriaEvaluate, fullEvaluate, answer }: IRootState) => ({
  criteriaTypeList: criteriaType.entities,
  criteriaEvaluateList: criteriaEvaluate.entities,
  account: authentication.account,
  fullEvaluateEntity: fullEvaluate.entity,
  answerList: answer.entities,
  loadingAns: answer.loading
});

const mapDispatchToProps = {
  getCriteriaTypeEntities,
  getCriteriaEvaluateEntities,
  getSession,
  getEntity,
  getEntityByFullEval
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey);
