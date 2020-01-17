import React, { Component } from 'react';
import { CustomInput, Card, CardHeader, CardBody, Button, Collapse, Row, Col, Label, Container } from 'reactstrap';
import { Storage } from 'react-jhipster';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import { SERVER_API_URL } from 'app/config/constants';
import { IAnswer, ScoreLadder } from 'app/shared/model/answer.model';

registerPlugin(FilePondPluginFileValidateType);
class Proof extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      criteriaEvaluate: props.criteriaEvaluate
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  handleUploadFile = (error, file) => {
    if (error) {
      console.log('Oh no');
      return;
    }
    console.log('File processed', file.serverId);
    this.props.handleUploadFile(file.serverId, this.state.criteriaEvaluate.id);
  };

  render() {
    let tokenLocal = Storage.local.get('jhi-authenticationToken'); // || Storage.session.get('jhi-authenticationToken');
    // tslint:disable-next-line:triple-equals
    if (tokenLocal == undefined) {
      tokenLocal = Storage.session.get('jhi-authenticationToken');
    }

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
                <p>Thêm minh chứng</p> <br />
                <FilePond
                  acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf', 'application/doc', 'application/docx']}
                  //  ref={this.fileRef}
                  allowMultiple={false}
                  server={{
                    url: `${SERVER_API_URL}api`,
                    process: {
                      url: '/uploadFileEvaluate',
                      method: 'POST',
                      withCredentials: true,
                      headers: {
                        Authorization: token
                      },
                      timeout: 7000
                    }
                  }}
                  onprocessfile={this.handleUploadFile}
                />
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
                  onChange={this.props.onChange}
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
                  onChange={this.props.onChange}
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
                  onChange={this.props.onChange}
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
                  onChange={this.props.onChange}
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

export default Proof;
