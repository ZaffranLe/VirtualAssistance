import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Pagination, PaginationItem, PaginationLink, Card, CardHeader, CardBody, Input } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Notification extends React.Component<INotificationProps, any> {
  pagesCount: number;
  pageSize: number;
  componentDidMount() {
    this.props.getEntities();
  }
  constructor(props) {
    super(props);
    this.pageSize = 5;
    this.state = {
      currentPage: 0,
      nameSearch: ''
    };
  }

  handleChangePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  handleSearchName(e) {
    e.preventDefault();

    this.setState({
      nameSearch: e.target.value.toLowerCase()
    });
  }

  render() {
    const { notificationList, match } = this.props;
    this.pagesCount = Math.ceil(notificationList.length / this.pageSize);
    const { currentPage } = this.state;
    return (
      <div>
        <Card>
          <CardHeader>
            <Row>
              <Col lg={4}>
                <h2 id="notification-heading">
                  <Translate contentKey="virtualAssistantApp.notification.home.title">Notifications</Translate>
                </h2>
              </Col>
              <Col lg={6}>
                <Input type="text" className="float-right" placeholder="Tìm theo tên văn bản" onChange={e => this.handleSearchName(e)} />
              </Col>
              <Col lg={2}>
                <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                  <FontAwesomeIcon icon="plus" />&nbsp;
                  <Translate contentKey="virtualAssistantApp.notification.home.createLabel">Create new Notification</Translate>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
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
                    <Translate contentKey="virtualAssistantApp.notification.notificationType">Notification Type</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {notificationList
                  .filter(notification => {
                    if (notification.name.toLowerCase().includes(this.state.nameSearch)) {
                      return true;
                    }
                    return false;
                  })
                  .slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                  .map((notification, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${notification.id}`} color="link" size="sm">
                          {notification.id}
                        </Button>
                      </td>
                      <td>{notification.name}</td>
                      <td>{notification.description}</td>
                      <td>
                        {notification.headQuater ? (
                          <Link to={`head-quater/${notification.headQuater.id}`}>{notification.headQuater.id}</Link>
                        ) : (
                          ''
                        )}
                      </td>
                      <td>
                        {notification.notificationType ? (
                          <Link to={`notification-type/${notification.notificationType.id}`}>{notification.notificationType.content}</Link>
                        ) : (
                          ''
                        )}
                      </td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${notification.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
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
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationList: notification.entities
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
