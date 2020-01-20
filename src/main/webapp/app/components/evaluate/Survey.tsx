import React, { Component } from 'react';
import { Row, Col, Table, Form, Button, Alert, Input, InputGroup, Badge } from 'reactstrap';
import QuestionRow from './QuestionRow';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCriteriaTypeEntities } from '../../entities/criteria-type/criteria-type.reducer';
import { getCriteriaEvaluateEntities } from '../../entities/criteria-evaluate/criteria-evaluate.reducer';
import { IRootState } from 'app/shared/reducers';
import {
  handleCreate,
  handleCreateWithName,
  getEntity,
  handleUpdateWithName,
  handleCreateWithAns
} from '../../entities/full-evaluate/full-evaluate.reducer';
import { getEntityByFullEval } from '../../entities/answer/answer.reducer';
import { getSession } from 'app/shared/reducers/authentication';
import { IAnswer, ScoreLadder } from 'app/shared/model/answer.model';
import { ICriteriaEvaluate } from 'app/shared/model/criteria-evaluate.model';
import answer, { Answer } from 'app/entities/answer/answer';
import teacherDeleteDialog from 'app/entities/teacher/teacher-delete-dialog';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { getEntities as getProofTypes } from '../../entities/proof-type/proof-type.reducer';

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
const getBadge = result => {
  const foo = 0;
  return result === ScoreLadder.EXCELLENT
    ? 'success'
    : result === ScoreLadder.PASS
      ? 'secondary'
      : result === ScoreLadder.GOOD
        ? 'primary'
        : result === ScoreLadder.FAIL
          ? 'danger'
          : 'primary';
};
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
      // result: 'Chưa đạt',
      result: ScoreLadder.FAIL,
      nameSurvey: '',
      isNew: !this.props.match.params || !this.props.match.params.id,
      answerList: null,
      isSelected: false
    };
    // console.
    // this.handleUploadFile.bind(this);
    this.props.getSession();
    this.props.getCriteriaTypeEntities();
    this.props.getCriteriaEvaluateEntities();
    this.props.getProofTypes();
    // this.setStateBefforGetData.bind(this);
    if (!this.state.isNew) {
      // (async () => {
      this.props.getEntity(this.props.match.params.id);
      this.props.getEntityByFullEval(this.props.match.params.id);
      // if(!this.props.loadingAns){}
      setTimeout(this.setStateBefforGetData, 1000);
      // })();
    } else {
      setTimeout(this.setStateInitBeforGetDate, 1000);
    }
  }

  setStateInitBeforGetDate = () => {
    const answerList: IAnswer[] = [];
    this.props.criteriaEvaluateList.map((criteriaEvaluate, indexEvaluate) => {
      const anew: IAnswer = {
        scoreLadder: ScoreLadder.FAIL,
        criteriaEvaluate
      };
      answerList.push(anew);
    });
    this.setState({
      answerList
    });
  };

  setStateBefforGetData = () => {
    console.log('edit full: ');
    this.setState({
      // questionResult: this.props.answerList.map(a => a.scoreLadder).slice(),
      answerList: this.props.answerList,
      nameSurvey: this.props.fullEvaluateEntity.description
    });
    // const result = this.calculateResult(this.state.questionResult);
    const result = this.caculateResultFromAnswerList();
    this.setState({
      result
      // answerList
    });
  };
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

  getValueFromAnsCriteria(answerList: IAnswer[], id: number) {
    // console.log('id=' + id);
    // if (this.state.answerList) {
    const answerList2 = answerList ? answerList : this.props.answerList;
    if (answerList2) {
      const ans = answerList2.find(a => a.criteriaEvaluate.id === id);
      if (ans) {
        //   console.log(JSON.stringify(ans.scoreLadder));
        return ans.scoreLadder;
      }
    }
    return ScoreLadder.FAIL;
  }

  getProffsFromAnswer(answerList: IAnswer[], id: number) {
    console.log('id=' + id);
    // if (this.state.answerList) {
    const answerList2 = answerList ? answerList : this.props.answerList;
    if (answerList2) {
      const ans = answerList2.find(a => a.criteriaEvaluate.id === id);
      if (ans) {
        console.log('PROFF: ' + JSON.stringify(ans.proffs));
        return ans.proffs;
      }
    }
    return null;
  }

  // handleChange(e) {
  handleChange = (e, proofList) => {
    console.log('ok ok ' + e.target.name);
    console.log('ok ok:............ ' + JSON.stringify(proofList));
    // const resultList = this.state.questionResult.slice();
    const answerList = this.state.answerList ? this.state.answerList : this.props.answerList;
    // resultList[e.target.name - 1] = e.target.value;
    if (answerList) {
      const a = answerList.find(a => a.criteriaEvaluate.id === Number(e.target.name));
      if (a) {
        a.scoreLadder = e.target.value;
        a.proffs = proofList;
      }
    }

    // console.log('ok ok ok:............ ' + JSON.stringify(answerList));

    const resultExpect = this.caculateResultFromAnswerList();

    this.setState({
      // questionResult: resultList,
      result: resultExpect,
      answerList
    });
  };

  handleValidSubmit = () => {
    // handleCreate(this.state.questionResult.toString(), this.state.result);
    if (!this.state.nameSurvey) {
      alert('Chưa nhập tên bản đánh giá!');
      return;
    }

    if (this.state.isNew) {
      // handleCreateWithName(this.state.questionResult.toString(), this.state.result, this.state.fileResult.toString(), this.state.nameSurvey);
      handleCreateWithAns(this.state.nameSurvey, this.state.answerList);
    } else {
      const answerList = this.state.answerList ? this.state.answerList : this.props.answerList;
      const idFullEvaluate = this.props.fullEvaluateEntity.id;
      handleUpdateWithName(idFullEvaluate, this.state.result, this.state.nameSurvey, answerList);
    }

    alert('Đánh giá hoàn thành!');
    this.setState({
      questionResult: Array(15).fill(ScoreLadder.FAIL),
      fileResult: Array(15).fill(''),
      result: ScoreLadder.FAIL,
      nameSurvey: 'Ban danh gia moi'
    });
    if (!this.state.isNew) {
      const href = '#/entity/full-evaluate/' + this.props.fullEvaluateEntity.id;
      window.location.href = href;
    } else {
      // window.location.reload();
      console.log('Save survey doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    }
  };

  caculateResultFromAnswerList() {
    const result = ScoreLadder.FAIL;
    const answerFail = this.state.answerList.find((answer, index) => answer.scoreLadder === ScoreLadder.FAIL);
    if (answerFail) {
      return result;
    }
    const PASS = this.state.answerList.find(
      (asw, index) => asw.scoreLadder === ScoreLadder.PASS && asw.criteriaEvaluate.id >= 2 && asw.criteriaEvaluate.id < 7
    );
    if (PASS) {
      return ScoreLadder.PASS;
    }

    const counterEX = this.state.answerList.filter((asw, index) => asw.scoreLadder === ScoreLadder.EXCELLENT).length;

    const counterGOOD = this.state.answerList.filter((asw, index) => asw.scoreLadder === ScoreLadder.GOOD).length;

    if (counterEX + counterGOOD < 10) return ScoreLadder.PASS;

    if (counterEX > 10) {
      const GOODS = this.state.answerList.find(
        (asw, index) => asw.scoreLadder === ScoreLadder.GOOD && asw.criteriaEvaluate.id >= 2 && asw.criteriaEvaluate.id < 7
      );
      if (!GOODS) {
        return ScoreLadder.EXCELLENT;
      }
    }
    return ScoreLadder.GOOD;
  }

  updateInputValue(e) {
    this.setState({
      nameSurvey: e.target.value
    });
  }

  render() {
    const { criteriaTypeList, proofTypeList } = this.props;
    const { fullEvaluateEntity, criteriaEvaluateList } = this.props;
    const { loadingAns } = this.props;
    // const
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
                          <QuestionRow
                            handleUploadFile={this.handleUploadFile}
                            key={indexEvaluate}
                            // onChange={e => this.handleChange(e)}
                            onChange={this.handleChange}
                            criteriaEvaluate={criteriaEvaluate}
                            value={this.getValueFromAnsCriteria(this.state.answerList, criteriaEvaluate.id)}
                            proofTypeList={proofTypeList}
                            proofList={this.getProffsFromAnswer(this.state.answerList, criteriaEvaluate.id)}
                          />
                        )
                    )
                  ])}
                  <tr>
                    <td className="align-middle">
                      {/* <Badge color={getBadge(this.state.result)} pill> */}
                      {/* Xếp loại hiện tại:<Translate contentKey={`virtualAssistantApp.ScoreLadder.${this.state.result}`} /> */}
                      {/* </Badge> */}
                      <Alert color={getAlertColor(this.state.result)}>
                        Xếp loại hiện tại:{' '}
                        <strong>
                          <Translate contentKey={`virtualAssistantApp.ScoreLadder.${this.state.result}`} />
                        </strong>
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

const mapStateToProps = ({ authentication, criteriaType, criteriaEvaluate, fullEvaluate, answer, proofType }: IRootState) => ({
  criteriaTypeList: criteriaType.entities,
  criteriaEvaluateList: criteriaEvaluate.entities,
  account: authentication.account,
  fullEvaluateEntity: fullEvaluate.entity,
  answerList: answer.entities,
  loadingAns: answer.loading,
  proofTypeList: proofType.entities
});

const mapDispatchToProps = {
  getCriteriaTypeEntities,
  getCriteriaEvaluateEntities,
  getSession,
  getEntity,
  getEntityByFullEval,
  handleCreateWithAns,
  getProofTypes
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey);
