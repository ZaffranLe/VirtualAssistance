import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Input, Pagination, PaginationLink, PaginationItem } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable

export interface INotificationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Notification extends React.Component<any, any> {
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
    const { notificationList, match } = this.props;
    const { isAdmin } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <Row>
          <Col md="3">
            <h2 id="notification-heading">
              <Translate contentKey="virtualAssistantApp.notification.home.title">Notifications</Translate>
            </h2>
          </Col>
          <Col md="6">
            <Input type="text" className="float-right" placeholder="Tìm kiếm theo tên văn bản" onChange={e => this.handleSearch(e)} />
          </Col>
          <Col md="3">
            {isAdmin && (
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />&nbsp;
                <Translate contentKey="virtualAssistantApp.notification.home.createLabel">Create new Notification</Translate>
              </Link>
            )}
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="virtualAssistantApp.notification.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.notification.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.notification.headQuater">Head Quater</Translate>
                </th>
                <th>
                  <Translate contentKey="virtualAssistantApp.notification.documentType">Notification Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notificationList
                .filter(notification => {
                  if (notification.description.toLowerCase().includes(this.state.nameSearch)) {
                    return true;
                  }
                  return false;
                })
                .slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                .map((notification, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Link to={`${match.url}/${notification.id}`}>{notification.name}</Link>
                    </td>
                    <td>
                      <Link to={`${match.url}/${notification.id}`}>{notification.description}</Link>
                    </td>
                    <td>
                      {notification.headQuater ? <Link to={`${match.url}/${notification.id}`}>{notification.headQuater.name}</Link> : ''}
                    </td>
                    <td>
                      {notification.documentType ? (
                        <Link to={`${match.url}/${notification.id}}`}>{notification.documentType.content}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        {isAdmin && (
                          <div>
                            <Button tag={Link} to={`${match.url}/${notification.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${notification.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ notification, authentication }: IRootState) => ({
  notificationList: notification.entities,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
