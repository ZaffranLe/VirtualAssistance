import React, { Component } from 'react';
import { CustomInput, Card, CardHeader, CardBody, Button, Collapse, Row, Col, Label, Container } from 'reactstrap';
import { Storage } from 'react-jhipster';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import { SERVER_API_URL } from 'app/config/constants';
import { IAnswer, ScoreLadder } from 'app/shared/model/answer.model';
import { IProofs } from 'app/shared/model/proofs.model';
import { ProofsUpdate } from './proofs-update';

registerPlugin(FilePondPluginFileValidateType);
class QuestionRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      criteriaEvaluate: props.criteriaEvaluate,
      proofList: Array<IProofs>()
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  handleChange = e => {
    this.props.onChange(e, this.state.proofList);
  };
  handleSaveProof = (index, proof) => {
    const proofList = this.state.proofList;
    if (index < 0 || index >= proofList.lenght) {
      console.log('Oh no');
      return;
    }
    proofList[index] = proof;
    // proofList = proofList.splice(index, 1, proof);
    // proofList = proofList.map((key, value) => {
    //   if (key === index) {
    //     return proof;
    //   } else {
    //     return value;
    //   }
    // });
    // proofList.push({ proof });

    this.setState({ proofList });
    console.log('yes: ' + index + ' ............ ' + JSON.stringify(proof));
    console.log('yes yessss:............ ');
    console.log(proofList);
  };

  buttonAddClick = () => {
    const proofList = this.state.proofList;
    proofList.push({
      name: 'new proof',
      url: 'upload'
    });
    this.setState({ proofList });
  };

  render() {
    let tokenLocal = Storage.local.get('jhi-authenticationToken'); // || Storage.session.get('jhi-authenticationToken');
    // tslint:disable-next-line:triple-equals
    if (tokenLocal == undefined) {
      tokenLocal = Storage.session.get('jhi-authenticationToken');
    }
    const proofList = this.state.proofList;

    const token = 'Bearer ' + tokenLocal;
    return (
      <tr key={this.state.criteriaEvaluate.id.toString()}>
        <td className="text-left">
          <Card>
            <CardHeader>
              <strong>
                Tiêu chí {this.state.criteriaEvaluate.id}: {this.state.criteriaEvaluate.content}
              </strong>
              <Button color="link" onClick={this.toggle} className="float-right" id={'toggleCollapse' + this.state.criteriaEvaluate.id}>
                Chi tiết và minh chứng
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.collapse}>
              <CardBody>
                - <strong>Mức Đạt:</strong> {this.state.criteriaEvaluate.pass} <br />- <strong>Mức Khá:</strong>{' '}
                {this.state.criteriaEvaluate.good} <br />- <strong>Mức Tốt:</strong> {this.state.criteriaEvaluate.excellent} <br />
                <Button onClick={this.buttonAddClick}> Thêm minh chứng </Button> <br />
                <Row>
                  {proofList.map((proof, index) => [
                    <ProofsUpdate
                      key={index}
                      proofTypeList={this.props.proofTypeList}
                      handleSaveProof={this.handleSaveProof}
                      keyy={index}
                    />
                  ])}
                </Row>
              </CardBody>
            </Collapse>
          </Card>
          <br />
          <Container>
            <Row>
              <Col md={2}>
                <CustomInput
                  type="radio"
                  id={this.state.criteriaEvaluate.id + 'CD'}
                  name={this.state.criteriaEvaluate.id}
                  value={ScoreLadder.FAIL}
                  onChange={this.handleChange}
                  label="Chưa đạt"
                  checked={!this.props.value || this.props.value === ScoreLadder.FAIL}
                />
              </Col>
              <Col md={2}>
                <CustomInput
                  type="radio"
                  id={this.state.criteriaEvaluate.id + 'D'}
                  name={this.state.criteriaEvaluate.id}
                  value={ScoreLadder.PASS}
                  onChange={this.handleChange}
                  label="Đạt"
                  checked={this.props.value === ScoreLadder.PASS}
                />
              </Col>
              <Col md={2}>
                <CustomInput
                  type="radio"
                  id={this.state.criteriaEvaluate.id + 'K'}
                  name={this.state.criteriaEvaluate.id}
                  value={ScoreLadder.GOOD}
                  onChange={this.handleChange}
                  label="Khá"
                  checked={this.props.value === ScoreLadder.GOOD}
                />
              </Col>
              <Col md={2}>
                <CustomInput
                  type="radio"
                  id={this.state.criteriaEvaluate.id + 'T'}
                  name={this.state.criteriaEvaluate.id}
                  value={ScoreLadder.EXCELLENT}
                  onChange={this.handleChange}
                  label="Tốt"
                  checked={this.props.value === ScoreLadder.EXCELLENT}
                />
              </Col>
            </Row>
          </Container>
        </td>
        {/* <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.criteriaEvaluate.id + 'CD'}
            name={this.state.criteriaEvaluate.id}
            value={1}
            onChange={this.props.onChange}
          />

        </td>
        <td className="align-middle">
          <CustomInput 
            type="radio"
            id={this.state.criteriaEvaluate.id + 'D'}
            name={this.state.criteriaEvaluate.id}
            value={2}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.criteriaEvaluate.id + 'K'}
            name={this.state.criteriaEvaluate.id}
            value={3}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.criteriaEvaluate.id + 'T'}
            name={this.state.criteriaEvaluate.id}
            value={4}
            onChange={this.props.onChange}
          />
        </td> */}
      </tr>
    );
  }
}

export default QuestionRow;
