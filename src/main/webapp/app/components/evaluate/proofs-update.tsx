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
      fileid: null,
      isOK: false
    };
  }

  componentDidMount() {}

  saveEntity = (event, errors, values) => {
    if (this.state.fileid !== null && errors.length === 0) {
      const entity = {
        ...values,
        url: this.state.fileid
      };
      console.log(values);
      this.props.handleSaveProof(this.props.keyy, entity);
      this.setState({ isOK: true });
    } else {
      alert('Thiếu thông tin minh chứng!');
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
      <Col md="3 border border-primary m-1 p-1">
        <Row className="justify-content-center">
          <Col md="8" className="justify-content-center">
            Minh chứng mới
          </Col>
          <Col md="12">
            <AvForm model={{}} onSubmit={this.saveEntity} disabled={this.state.isOK}>
              <AvGroup>
                <Label id="nameLabel" for="name">
                  Tên tài liệu
                </Label>
                <AvField alt="Tên tài liệu" id="proofs-name" type="text" name="name" disable={!isNew} />
              </AvGroup>
              {/* <AvGroup>
                <Label id="urlLabel" for="url">
                  <Translate contentKey="virtualAssistantApp.proofs.url">Url</Translate>
                </Label>
                <AvField id="proofs-url" type="text" name="url" />
              </AvGroup> */}
              <AvGroup>
                <Label for="type.id">Loại tài liệu</Label>
                <AvInput id="proofs-type" type="select" className="form-control" name="type.id" disabled={this.state.isOK}>
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
                  disabled={this.state.isOK}
                  onprocessfile={this.handleUploadFile}
                />
              </AvGroup>
              <Row className="justify-content-center">
                <Button id="cancel-save" replace color="info" type="submit" disabled={this.state.isOK}>
                  <span className="d-none d-md-inline">Lưu minh chứng</span>
                </Button>
                {/* <Button id="cancel-reset" replace color="info">
                  <span className="d-none d-md-inline">Xóa</span>
                </Button> */}
              </Row>
            </AvForm>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ProofsUpdate;
