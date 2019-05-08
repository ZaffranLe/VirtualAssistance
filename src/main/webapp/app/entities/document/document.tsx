import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Document extends React.Component<any, any> {
  pageSize: number;
  pagesPriCount: number;
  pagesPubCount: number;
  componentDidMount() {
    this.props.getEntities();
  }

  handleChangePrivatePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPrivatePage: index
    });
  }

  handleChangePublicPage(e, index) {
    e.preventDefault();

    this.setState({
      currentPublicPage: index
    });
  }

  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      currentPrivatePage: 0,
      currentPublicPage: 0,
      nameSearch: '',
      tagSearch: ''
    };
  }

  handleSearchName(e) {
    e.preventDefault();

    this.setState({
      nameSearch: e.target.value.toLowerCase()
    });
  }

  handleSearchTag(e) {
    e.preventDefault();

    this.setState({
      tagSearch: e.target.value.toLowerCase()
    });
  }

  render() {
    const { documentList, match } = this.props;
    const lengthpub = documentList.filter(document => !document.isShared).length;
    this.pagesPriCount = Math.ceil(lengthpub / this.pageSize);
    this.pagesPubCount = Math.ceil((documentList.length - lengthpub) / this.pageSize);
    const { currentPrivatePage, currentPublicPage } = this.state;
    return (
      <div>
        <Row>
          <Col lg={4}>
            <h2 id="teacher-heading">Tài liệu dạy học cá nhân</h2>
          </Col>
          <Col lg={3}>
            <Input type="text" className="float-right" placeholder="Tìm theo tên tài liệu" onChange={e => this.handleSearchName(e)} />
          </Col>
          <Col lg={3}>
            <Input type="text" className="float-right" placeholder="Tìm theo tag" onChange={e => this.handleSearchTag(e)} />
          </Col>
          <Col lg={2}>
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />&nbsp;
              <Translate contentKey="virtualAssistantApp.document.home.createLabel">Create new Document</Translate>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="table-responsive">
              <Table responsive striped hover>
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
                      <Translate contentKey="virtualAssistantApp.document.tag">Tag</Translate>
                    </th>
                    {/* <th>
                      <Translate contentKey="virtualAssistantApp.document.isShared">Is Shared</Translate>
                    </th> */}
                    <th>
                      <Translate contentKey="virtualAssistantApp.document.documentType">Document Type</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {documentList
                    .filter(document => {
                      if (document.isShared === false) {
                        return true;
                      }
                      return false;
                    })
                    .slice(currentPrivatePage * this.pageSize, (currentPrivatePage + 1) * this.pageSize)
                    .map((document, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${document.id}`} color="link" size="sm">
                            {document.id}
                          </Button>
                        </td>
                        <td>{document.name}</td>
                        <td>{document.description}</td>
                        <td>{document.tag}</td>
                        {/* <td>{document.isShared ? 'Chia sẻ' : 'Riêng tư'}</td> */}
                        <td>
                          {document.documentTypes
                            ? document.documentTypes.map((val, j) => (
                                <span key={j}>
                                  {/* <Link to={`document-type/${val.id}`}> */}
                                  {val.content}
                                  {/* </Link> */}
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
              <Pagination>
                <PaginationItem disabled={currentPrivatePage <= 0}>
                  <PaginationLink previous tag="button" onClick={e => this.handleChangePrivatePage(e, currentPrivatePage - 1)} />
                </PaginationItem>
                {[...Array(this.pagesPriCount)].map((page, i) => (
                  <PaginationItem className="d-none d-sm-block" active={i === currentPrivatePage} key={i}>
                    <PaginationLink onClick={e => this.handleChangePrivatePage(e, i)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentPrivatePage >= this.pagesPriCount - 1}>
                  <PaginationLink next tag="button" onClick={e => this.handleChangePrivatePage(e, currentPrivatePage + 1)} />
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <h2 id="document-heading">Tài liệu chia sẻ</h2>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <div className="table-responsive">
              <Table responsive striped hover>
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
                      <Translate contentKey="virtualAssistantApp.document.tag">Tag</Translate>
                    </th>
                    {/* <th>
                      <Translate contentKey="virtualAssistantApp.document.isShared">Is Shared</Translate>
                    </th> */}
                    <th>
                      <Translate contentKey="virtualAssistantApp.document.documentType">Document Type</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {documentList
                    .filter(document => {
                      if (
                        document.isShared === true &&
                        document.name.toLowerCase().includes(this.state.nameSearch) &&
                        document.tag.toLowerCase().includes(this.state.tagSearch)
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .slice(currentPublicPage * this.pageSize, (currentPublicPage + 1) * this.pageSize)
                    .map((document, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${document.id}`} color="link" size="sm">
                            {document.id}
                          </Button>
                        </td>
                        <td>{document.name}</td>
                        <td>{document.description}</td>
                        <td>{document.tag}</td>
                        {/* <td>{document.isShared ? 'Chia sẻ' : 'Riêng tư'}</td> */}
                        <td>
                          {document.documentTypes
                            ? document.documentTypes.map((val, j) => (
                                <span key={j}>
                                  {/* <Link to={`document-type/${val.id}`}> */}
                                  {val.content}
                                  {/* </Link> */}
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
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem disabled={currentPublicPage <= 0}>
                  <PaginationLink previous tag="button" onClick={e => this.handleChangePublicPage(e, currentPublicPage - 1)} />
                </PaginationItem>
                {[...Array(this.pagesPubCount)].map((page, i) => (
                  <PaginationItem className="d-none d-sm-block" active={i === currentPublicPage} key={i}>
                    <PaginationLink onClick={e => this.handleChangePublicPage(e, i)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentPublicPage >= this.pagesPubCount - 1}>
                  <PaginationLink next tag="button" onClick={e => this.handleChangePublicPage(e, currentPublicPage + 1)} />
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
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
