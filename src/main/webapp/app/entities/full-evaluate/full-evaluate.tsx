import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Badge, Input, Pagination, PaginationLink, PaginationItem } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './full-evaluate.reducer';
import { IFullEvaluate } from 'app/shared/model/full-evaluate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

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
  render() {
    const { fullEvaluateList, match } = this.props;
    const { currentPage } = this.state;
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
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
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
                      <Button tag={Link} to={`${match.url}/${fullEvaluate.id}`} color="link" size="sm">
                        {fullEvaluate.id}
                      </Button>
                    </td>
                    <td>{fullEvaluate.description}</td>
                    <td>
                      <Badge color={getBadge(fullEvaluate.result)} pill>
                        <Translate contentKey={`virtualAssistantApp.ScoreLadder.${fullEvaluate.result}`} />
                      </Badge>
                    </td>
                    <td>
                      {fullEvaluate.teacher ? <Link to={`teacher/${fullEvaluate.teacher.id}`}>{fullEvaluate.teacher.fullName}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
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
              <PaginationItem active={i === currentPage} key={i}>
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
