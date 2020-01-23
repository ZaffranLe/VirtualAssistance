import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Badge, Input, Pagination, PaginationLink, PaginationItem } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, Storage } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Downloader from 'js-file-downloader';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './full-evaluate.reducer';
import { IFullEvaluate } from 'app/shared/model/full-evaluate.model';
import { SERVER_API_URL } from 'app/config/constants';
// tslint:disable-next-line:no-unused-variable

export interface IFullEvaluateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const getBadge = result => {
  const foo = 0;
  return result === 'EXCELLENT'
    ? 'success'
    : result === 'PASS'
      ? 'secondary'
      : result === 'GOOD'
        ? 'primary'
        : result === 'FAIL'
          ? 'danger'
          : 'primary';
};
export class FullEvaluate extends React.Component<any, any> {
  pagesCount: number;
  pageSize: number;

  componentDidMount() {
    this.props.getEntities();
  }

  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      currentPage: 0,
      nameSearch: ''
    };
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      nameSearch: e.target.value.toLowerCase()
    });
  }

  handleChangePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  downloadLink(e, id) {
    e.preventDefault();
    let tokenLocal = Storage.local.get('jhi-authenticationToken'); // || Storage.session.get('jhi-authenticationToken');
    // tslint:disable-next-line:triple-equals
    if (tokenLocal == undefined) {
      tokenLocal = Storage.session.get('jhi-authenticationToken');
    }
    const token = 'Bearer ' + tokenLocal;
    const download = new Downloader({
      url: `${SERVER_API_URL}api/full-eval-download/${id}`,
      headers: [{ name: 'Authorization', value: token }]
    });

    console.log('download:............... ');
    console.log(download);
  }

  render() {
    const { fullEvaluateList, match } = this.props;
    const { currentPage } = this.state;
    this.pagesCount = Math.ceil(fullEvaluateList.length / this.pageSize);
    return (
      <div>
        <Row>
          <Col lg={7}>
            <h2 id="full-evaluate-heading">
              <Translate contentKey="virtualAssistantApp.fullEvaluate.home.title">Full Evaluates</Translate>
            </h2>
          </Col>
          <Col lg={5}>
            <Input type="text" className="float-right" placeholder="Tìm kiếm bản đánh giá" onChange={e => this.handleSearch(e)} />
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="virtualAssistantApp.fullEvaluate.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.fullEvaluate.result">Result</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.fullEvaluate.teacher">Teacher</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fullEvaluateList
                .filter(fullEvaluate => {
                  if (fullEvaluate.description.toLowerCase().includes(this.state.nameSearch)) {
                    return true;
                  }
                  return false;
                })
                .slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                .map((fullEvaluate, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Link to={`${match.url}/${fullEvaluate.id}`}>{fullEvaluate.description}</Link>
                    </td>
                    <td>
                      <Link to={`${match.url}/${fullEvaluate.id}`}>
                        <Badge color={getBadge(fullEvaluate.result)} pill>
                          <Translate contentKey={`virtualAssistantApp.ScoreLadder.${fullEvaluate.result}`} />
                        </Badge>
                      </Link>
                    </td>
                    <td>
                      {fullEvaluate.teacher ? <Link to={`${match.url}/${fullEvaluate.id}`}>{fullEvaluate.teacher.fullName}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Button} color="info" size="sm" onClick={e => this.downloadLink(e, fullEvaluate.id)}>
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Download</span>
                        </Button>&nbsp;
                        <Button tag={Link} to={`${match.url}/${fullEvaluate.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>&nbsp;
                        <Button tag={Link} to={`${match.url}/${fullEvaluate.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>&nbsp;
                        <Button tag={Link} to={`../component/survey/${fullEvaluate.id}/edit`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Update</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Pagination>
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink previous tag="button" onClick={e => this.handleChangePage(e, currentPage - 1)} />
            </PaginationItem>
            {[...Array(this.pagesCount)].map((page, i) => (
              <PaginationItem className="d-none d-sm-block" active={i === currentPage} key={i}>
                <PaginationLink onClick={e => this.handleChangePage(e, i)}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
              <PaginationLink next tag="button" onClick={e => this.handleChangePage(e, currentPage + 1)} />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fullEvaluate }: IRootState) => ({
  fullEvaluateList: fullEvaluate.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullEvaluate);
