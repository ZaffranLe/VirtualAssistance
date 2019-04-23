import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Card, CardImg } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Document, Page } from 'react-pdf';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-submodule-imports
import 'react-pdf-reader/dist/TextLayerBuilder.css';
import FileViewer from 'react-file-viewer';
import GoogleDocsViewer from 'react-google-docs-viewer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
export interface IDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DocumentDetail extends React.Component<any, any> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 0
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { documentEntity } = this.props;
    const { pageNumber, numPages } = this.state;
    const { authenkey } = this.props;
    return (
      <Row className="justify-content-center">
        <Col md="6">
          <h2>
            <Translate contentKey="virtualAssistantApp.document.detail.title">Document</Translate> [<b>{documentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="virtualAssistantApp.document.name">Name</Translate>
              </span>{' '}
              &nbsp;
              <a href={`api/downloadFile/${documentEntity.uRL}`}>Download</a>
            </dt>
            <dd>{documentEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="virtualAssistantApp.document.description">Description</Translate>
              </span>
            </dt>
            <dd>{documentEntity.description}</dd>
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
              <span id="isShared">
                <Translate contentKey="virtualAssistantApp.document.isShared">Is Shared</Translate>
              </span>
            </dt>
            <dd>{documentEntity.isShared ? 'Chia sẻ' : 'Riêng tư'}</dd>
            <dt>
              <span id="fileExtension">
                <Translate contentKey="virtualAssistantApp.document.fileExtension">File Extension</Translate>
              </span>
            </dt>
            <dd>{documentEntity.fileExtension}</dd>
            <dt>
              <Translate contentKey="virtualAssistantApp.document.documentType">Document Type</Translate>
            </dt>
            <dd>
              {documentEntity.documentTypes
                ? documentEntity.documentTypes.map((val, i) => (
                    <span key={val.id}>
                      {val.content}
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
        <Col md="6">
          {documentEntity.fileExtension === 'JPG' || documentEntity.fileExtension === 'PNG' ? (
            <Card>
              {/* <CardImg width="100%" src={`api/opendocument/${authenkey}`} /> */}
              <CardImg width="100%" src={`api/downloadFile/${documentEntity.uRL}`} />
            </Card>
          ) : documentEntity.fileExtension === 'pdf' || documentEntity.fileExtension === 'PDF' ? (
            <Card>
              <Document
                style={{ overflow: 'scroll', height: '500px' }}
                renderMode="svg"
                height="500"
                file={`api/downloadFile/${documentEntity.uRL}`}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => <Page key={`page_${index + 1}`} pageNumber={index + 1} />)}
              </Document>
            </Card>
          ) : (
            <Card>
              <FileViewer fileType="docx" filePath={`api/downloadFile/${documentEntity.uRL}`} />
            </Card>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ document }: IRootState) => ({
  documentEntity: document.entity,
  authenkey: document.authenkey
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentDetail);
