import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, Storage } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { SERVER_API_URL } from 'app/config/constants';
import { IProofType } from 'app/shared/model/proof-type.model';
import { IAnswer } from 'app/shared/model/answer.model';
import { getEntities as getAnswers } from 'app/entities/answer/answer.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/proofs/proofs.reducer';
import { IProofs } from 'app/shared/model/proofs.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

export class ProofsUpdate extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      idsanswer: [],
      typeId: 0,
      isNew: true,
      fileid: null
    };
  }

  componentDidMount() {}

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...values,
        url: this.state.fileid
      };
      console.log(values);
      this.props.handleSaveProof(this.props.keyy, entity);
    }
  };

  handleUploadFile = (error, file) => {
    if (error) {
      console.log('Oh no');
      return;
    }
    console.log('File processed', file.serverId);
    // this.props.handleUploadFile(file.serverId, this.state.criteriaEvaluate.id);
    this.setState({ fileid: file.serverId });
  };
  render() {
    const { proofTypeList } = this.props;
    const { isNew } = this.state;
    let tokenLocal = Storage.local.get('jhi-authenticationToken'); // || Storage.session.get('jhi-authenticationToken');
    // tslint:disable-next-line:triple-equals
    if (tokenLocal == undefined) {
      tokenLocal = Storage.session.get('jhi-authenticationToken');
    }
    const token = 'Bearer ' + tokenLocal;
    return (
      <Col md="3">
        <Row className="justify-content-center">
          <Col md="8">Thêm minh chứng mới</Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm model={{}} onSubmit={this.saveEntity}>
              <AvGroup>
                <Label id="nameLabel" for="name">
                  <Translate contentKey="virtualAssistantApp.proofs.name">Name</Translate>
                </Label>
                <AvField id="proofs-name" type="text" name="name" disable={!isNew} />
              </AvGroup>
              <AvGroup>
                <Label id="urlLabel" for="url">
                  <Translate contentKey="virtualAssistantApp.proofs.url">Url</Translate>
                </Label>
                <AvField id="proofs-url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label for="type.id">
                  <Translate contentKey="virtualAssistantApp.proofs.type">Type</Translate>
                </Label>
                <AvInput id="proofs-type" type="select" className="form-control" name="type.id">
                  <option value="" key="0" />
                  {proofTypeList
                    ? proofTypeList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="answers">
                  <Translate contentKey="virtualAssistantApp.proofs.answer">Answer</Translate>
                </Label>
              </AvGroup>
              <FilePond
                acceptedFileTypes={['image/png', 'image/jpeg']}
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
              <Row>
                <Button id="cancel-save" replace color="info" type="submit">
                  <span className="d-none d-md-inline">Lưu minh chứng</span>
                </Button>
                <Button id="cancel-reset" replace color="info">
                  <span className="d-none d-md-inline">Xóa</span>
                </Button>
              </Row>
            </AvForm>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ProofsUpdate;
