import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Input, Pagination, PaginationLink, PaginationItem } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export interface ITeacherProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Teacher extends React.Component<any, any> {
  pagesCount: number;
  pageSize: number;
  componentDidMount() {
    this.props.getEntities();
    this.props.getSession();
  }

  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      currentPage: 0,
      phoneSearch: '',
      emailSearch: ''
    };
  }

  handlePhoneSearch(e) {
    e.preventDefault();

    this.setState({
      phoneSearch: e.target.value.toLowerCase()
    });
  }

  handleEmailSearch(e) {
    e.preventDefault();

    this.setState({
      emailSearch: e.target.value.toLowerCase()
    });
  }

  handleChangePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }
  render() {
    const { teacherList, match } = this.props;
    const { account } = this.props;
    const { isAdmin } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <Row>
          <Col lg={3}>
            <h2 id="teacher-heading">
              <Translate contentKey="virtualAssistantApp.teacher.home.title">Teachers</Translate>
            </h2>
          </Col>
          <Col lg={3}>
            <Input type="text" className="float-right" placeholder="Tìm kiếm theo SĐT" onChange={e => this.handlePhoneSearch(e)} />
          </Col>
          <Col lg={3}>
            <Input type="text" className="float-right" placeholder="Tìm kiếm theo email" onChange={e => this.handleEmailSearch(e)} />
          </Col>
          <Col lg={3}>
            {teacherList.map(
              (teacher, i) =>
                teacher.user.id === account.id && (
                  <Button className="float-right" tag={Link} to={`${match.url}/${teacher.id}/edit`} color="primary">
                    <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Chỉnh sửa thông tin giáo viên của bạn</span>
                  </Button>
                )
            )}
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive hover>
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
                    teacher.phone.toLowerCase().includes(this.state.phoneSearch) &&
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
                        {isAdmin && (
                          <div>
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
                            </Button>{' '}
                          </div>
                        )}
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

const mapStateToProps = ({ authentication, teacher }: IRootState) => ({
  teacherList: teacher.entities,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  account: authentication.account
});

const mapDispatchToProps = {
  getEntities,
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teacher);
