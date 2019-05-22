import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Pagination, PaginationLink, PaginationItem } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './notification-type.reducer';
import { INotificationType } from 'app/shared/model/notification-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class NotificationType extends React.Component<any, any> {
  pagesCount: number;
  pageSize: number;
  componentDidMount() {
    this.props.getEntities();
  }

  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.state = {
      currentPage: 0
    };
  }

  handleChangePage(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  render() {
    const { notificationTypeList, match } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <h2 id="notification-type-heading">
          <Translate contentKey="virtualAssistantApp.notificationType.home.title">Notification Types</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="virtualAssistantApp.notificationType.home.createLabel">Create new Notification Type</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="virtualAssistantApp.notificationType.content">Content</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notificationTypeList.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize).map((notificationType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Link to={`${match.url}/${notificationType.id}`}>{notificationType.id}</Link>
                  </td>
                  <td>
                    <Link to={`${match.url}/${notificationType.id}`}>{notificationType.content}</Link>
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${notificationType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${notificationType.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ notificationType }: IRootState) => ({
  notificationTypeList: notificationType.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationType);
