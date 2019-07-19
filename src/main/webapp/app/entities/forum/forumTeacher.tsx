import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Container, Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, getNewEntities } from './forum.reducer';
import { IForum } from 'app/shared/model/forum.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_TIMESTAMP_FORMAT } from 'app/config/constants';
import renderHTML from 'react-render-html';

export interface IForumProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ForumTeacher extends React.Component<IForumProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getNewEntities();
  }

  render() {
    const { forumList, match, forumListnew } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col>
            <Button
              tag={Link}
              to={`${match.url}/newteacher`}
              size="lg"
              className="btn btn-primary float-right jh-create-entity mb-3"
              replace
              color="info"
            >
              <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Tạo chủ đề mới</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={8} sm={12}>
            {forumList.map((forum, i) => (
              <Card className="mb-3">
                <CardHeader>
                  <i color="info">{forum.user.login}</i>: {forum.title}
                  {' - '}
                  <TextFormat value={forum.createDay} type="date" format={APP_TIMESTAMP_FORMAT} />
                </CardHeader>
                <CardBody>
                  <CardText>{renderHTML(forum.content)}</CardText>
                  <Button tag={Link} to={`${match.url}/${forum.id}`}>
                    Chi tiết
                  </Button>
                </CardBody>
              </Card>
            ))}
          </Col>
          <Col md={4} sm={12} className="mb-1">
            <Card>
              <CardHeader> Bài mới nhất</CardHeader>
            </Card>
            {forumListnew.map((forum, i) => (
              <Card className="mb-1">
                <CardHeader>
                  <i color="info">{forum.user.login}</i>: {forum.title}
                  {' - '}
                  <TextFormat value={forum.createDay} type="date" format={APP_TIMESTAMP_FORMAT} />
                </CardHeader>
                <CardBody>
                  <CardText>{renderHTML(forum.content)}</CardText>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ forum }: IRootState) => ({
  forumList: forum.entities,
  forumListnew: forum.entitiesnew
});

const mapDispatchToProps = {
  getEntities,
  getNewEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumTeacher);
