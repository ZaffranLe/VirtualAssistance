import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher-document.reducer';
import { ITeacherDocument } from 'app/shared/model/teacher-document.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TeacherDocumentDetail extends React.Component<ITeacherDocumentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teacherDocumentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.teacherDocument.detail.title">TeacherDocument</Translate> [<b>
              {teacherDocumentEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="role">
                <Translate contentKey="virtualAssistantApp.teacherDocument.role">Role</Translate>
              </span>
            </dt>
            <dd>{teacherDocumentEntity.role}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.teacherDocument.teacher">Teacher</Translate>
            </dt>
            <dd>{teacherDocumentEntity.teacher ? teacherDocumentEntity.teacher.id : ''}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.teacherDocument.document">Document</Translate>
            </dt>
            <dd>{teacherDocumentEntity.document ? teacherDocumentEntity.document.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/teacher-document" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/teacher-document/${teacherDocumentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ teacherDocument }: IRootState) => ({
  teacherDocumentEntity: teacherDocument.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDocumentDetail);
