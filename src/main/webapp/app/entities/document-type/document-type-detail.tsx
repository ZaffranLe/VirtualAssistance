import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document-type.reducer';
import { IDocumentType } from 'app/shared/model/document-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class DocumentTypeDetail extends React.Component<IDocumentTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { documentTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.documentType.detail.title">DocumentType</Translate> [<b>{documentTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">
                <Translate contentKey="virtualAssistantApp.documentType.content">Content</Translate>
              </span>
            </dt>
            <dd>{documentTypeEntity.content}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="virtualAssistantApp.documentType.level">Level</Translate>
              </span>
            </dt>
            <dd>{documentTypeEntity.level}</dd>
          </dl>
          <Button tag={Link} to="/entity/document-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/document-type/${documentTypeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ documentType }: IRootState) => ({
  documentTypeEntity: documentType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentTypeDetail);
