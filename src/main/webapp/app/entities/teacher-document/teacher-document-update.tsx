import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITeacher } from 'app/shared/model/teacher.model';
import { getEntities as getTeachers } from 'app/entities/teacher/teacher.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { getEntity, updateEntity, createEntity, reset } from './teacher-document.reducer';
import { ITeacherDocument } from 'app/shared/model/teacher-document.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITeacherDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITeacherDocumentUpdateState {
  isNew: boolean;
  teacherId: number;
  documentId: number;
}

export class TeacherDocumentUpdate extends React.Component<ITeacherDocumentUpdateProps, ITeacherDocumentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: 0,
      documentId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTeachers();
    this.props.getDocuments();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { teacherDocumentEntity } = this.props;
      const entity = {
        ...teacherDocumentEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/teacher-document');
  };

  render() {
    const { teacherDocumentEntity, teachers, documents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.teacherDocument.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.teacherDocument.home.createOrEditLabel">
                Create or edit a TeacherDocument
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : teacherDocumentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="teacher-document-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="roleLabel">
                    <Translate contentKey="virtualAssistantApp.teacherDocument.role">Role</Translate>
                  </Label>
                  <AvInput
                    id="teacher-document-role"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && teacherDocumentEntity.role) || 'OWNER'}
                  >
                    <option value="OWNER">
                      <Translate contentKey="virtualAssistantApp.Role.OWNER" />
                    </option>
                    <option value="SHARED">
                      <Translate contentKey="virtualAssistantApp.Role.SHARED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="teacher.id">
                    <Translate contentKey="virtualAssistantApp.teacherDocument.teacher">Teacher</Translate>
                  </Label>
                  <AvInput id="teacher-document-teacher" type="select" className="form-control" name="teacher.id">
                    <option value="" key="0" />
                    {teachers
                      ? teachers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="document.id">
                    <Translate contentKey="virtualAssistantApp.teacherDocument.document">Document</Translate>
                  </Label>
                  <AvInput id="teacher-document-document" type="select" className="form-control" name="document.id">
                    <option value="" key="0" />
                    {documents
                      ? documents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/teacher-document" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  teachers: storeState.teacher.entities,
  documents: storeState.document.entities,
  teacherDocumentEntity: storeState.teacherDocument.entity,
  loading: storeState.teacherDocument.loading,
  updating: storeState.teacherDocument.updating
});

const mapDispatchToProps = {
  getTeachers,
  getDocuments,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDocumentUpdate);
