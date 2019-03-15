import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Document extends React.Component<IDocumentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { documentList, match } = this.props;
    return (
      <div>
        <h2 id="document-heading">
          <Translate contentKey="virtualAssistantApp.document.home.title">Documents</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.document.home.createLabel">Create new Document</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.document.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.document.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.document.uRL">U RL</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.document.size">Size</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.document.tag">Tag</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.document.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.document.documentType">Document Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {documentList.map((document, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${document.id}`} color="link" size="sm">
                      {document.id}
                    </Button>
                  </td>
                  <td>{document.name}</td>
                  <td>{document.description}</td>
                  <td>{document.uRL}</td>
                  <td>{document.size}</td>
                  <td>{document.tag}</td>
                  <td>
                    <Translate contentKey={`virtualAssistantApp.Status.${document.status}`} />
                  </td>
                  <td>
                    {document.documentTypes
                      ? document.documentTypes.map((val, j) => (
                          <span key={j}>
                            <Link to={`document-type/${val.id}`}>{val.id}</Link>
                            {j === document.documentTypes.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${document.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${document.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${document.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ document }: IRootState) => ({
  documentList: document.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Document);
