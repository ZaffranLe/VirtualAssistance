import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DocumentDetail extends React.Component<IDocumentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { documentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.document.detail.title">Document</Translate> [<b>{documentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="virtualAssistantApp.document.name">Name</Translate>
              </span>
            </dt>
            <dd>{documentEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="virtualAssistantApp.document.description">Description</Translate>
              </span>
            </dt>
            <dd>{documentEntity.description}</dd>
            <dt>
              <span id="uRL">
                <Translate contentKey="virtualAssistantApp.document.uRL">U RL</Translate>
              </span>
            </dt>
            <dd>{documentEntity.uRL}</dd>
            <dt>
              <span id="size">
                <Translate contentKey="virtualAssistantApp.document.size">Size</Translate>
              </span>
            </dt>
            <dd>{documentEntity.size}</dd>
            <dt>
              <span id="tag">
                <Translate contentKey="virtualAssistantApp.document.tag">Tag</Translate>
              </span>
            </dt>
            <dd>{documentEntity.tag}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="virtualAssistantApp.document.status">Status</Translate>
              </span>
            </dt>
            <dd>{documentEntity.status}</dd>
            <dt>
              <span id="isShared">
                <Translate contentKey="virtualAssistantApp.document.isShared">Is Shared</Translate>
              </span>
            </dt>
            <dd>{documentEntity.isShared ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.document.documentType">Document Type</Translate>
            </dt>
            <dd>
              {documentEntity.documentTypes
                ? documentEntity.documentTypes.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === documentEntity.documentTypes.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/document" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/document/${documentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ document }: IRootState) => ({
  documentEntity: document.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentDetail);
