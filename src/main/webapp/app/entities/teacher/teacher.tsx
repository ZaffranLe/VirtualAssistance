import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Pagination, PaginationItem, PaginationLink, Card, CardHeader, CardBody, Input } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Teacher extends React.Component<ITeacherProps, any> {
  pagesCount: number;
  pageSize: number;
  componentDidMount() {
    this.props.getEntities();
  }

  handleChangePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      currentPage: 0,
      nameSearch: '',
      emailSearch: ''
    };
  }

  handleSearchName(e) {
    e.preventDefault();

    this.setState({
      nameSearch: e.target.value.toLowerCase()
    });
  }

  handleSearchEmail(e) {
    e.preventDefault();

    this.setState({
      emailSearch: e.target.value.toLowerCase()
    });
  }

  render() {
    const { teacherList, match } = this.props;
    this.pagesCount = Math.ceil(teacherList.length / this.pageSize);
    const { currentPage } = this.state;
    return (
      <div>
        <Card>
          <CardHeader>
            <Row>
              <Col lg={4}>
                <h2 id="teacher-heading">
                  <Translate contentKey="virtualAssistantApp.teacher.home.title">Teachers</Translate>
                </h2>
              </Col>
              <Col lg={3}>
                <Input type="text" className="float-right" placeholder="Tìm theo tên giáo viên" onChange={e => this.handleSearchName(e)} />
              </Col>
              <Col lg={3}>
                <Input type="text" className="float-right" placeholder="Tìm theo email" onChange={e => this.handleSearchEmail(e)} />
              </Col>
              <Col lg={2}>
                <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                  <FontAwesomeIcon icon="plus" />&nbsp;
                  <Translate contentKey="virtualAssistantApp.teacher.home.createLabel">Create new Teacher</Translate>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="global.field.id">ID</Translate>
                    </th>
                    <th>
                      <Translate contentKey="virtualAssistantApp.teacher.fullName">Full Name</Translate>
                    </th>
                    <th>
                      <Translate contentKey="virtualAssistantApp.teacher.phone">Phone</Translate>
                    </th>
                    <th>
                      <Translate contentKey="virtualAssistantApp.teacher.address">Address</Translate>
                    </th>
                    <th>
                      <Translate contentKey="virtualAssistantApp.teacher.email">Email</Translate>
                    </th>
                    <th>
                      <Translate contentKey="virtualAssistantApp.teacher.level">Level</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {teacherList
                    .filter(teacher => {
                      if (
                        teacher.fullName.toLowerCase().includes(this.state.nameSearch) &&
                        teacher.email.toLowerCase().includes(this.state.emailSearch)
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                    .map((teacher, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${teacher.id}`} color="link" size="sm">
                            {teacher.id}
                          </Button>
                        </td>
                        <td>{teacher.fullName}</td>
                        <td>{teacher.phone}</td>
                        <td>{teacher.address}</td>
                        <td>{teacher.email}</td>
                        <td>
                          <Translate contentKey={`virtualAssistantApp.TeacherLevel.${teacher.level}`} />
                        </td>
                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${teacher.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${teacher.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${teacher.id}/delete`} color="danger" size="sm">
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
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherList: teacher.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teacher);
