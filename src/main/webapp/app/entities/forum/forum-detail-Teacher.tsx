import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { IRootState } from 'app/shared/reducers';
import { getEntity, createEntityNewtopic } from './forum.reducer';
import { IForum } from 'app/shared/model/forum.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_TIMESTAMP_FORMAT } from 'app/config/constants';
import renderHTML from 'react-render-html';

export interface IForumDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IForumDetailState {
  content: string;
}

export class ForumDetailTeacher extends React.Component<IForumDetailProps, IForumDetailState> {
  componentDidMount() {}

  constructor(props: IForumDetailProps) {
    super(props);
    this.state = {
      content: 'any'
    };
    this.props.getEntity(this.props.match.params.id);
  }

  handleChange = (value: string) => {
    this.setState({ content: value });
    console.log('content: ' + this.state.content);
  };

  saveAnsewer = () => {
    const forumEntity = this.props.forumEntity;
    console.log('ans: ' + JSON.stringify(forumEntity));
    const entityForum = {
      title: 'reply - ' + forumEntity.title,
      content: this.state.content,
      idroot: forumEntity.id
    };
    this.props.createEntityNewtopic(entityForum);
    // this.props.history.push('/entity/forum/list/' + forumEntity.id);
    window.location.reload();
  };
  render() {
    const { forumEntity, loading } = this.props;
    if (loading) return null;
    // console.log(forumEntity);
    return (
      <Row>
        <Col md="12" sm={12}>
          <h2>
            <Translate contentKey="virtualAssistantApp.forum.detail.title">Chủ đề:</Translate> [<b>{forumEntity.title}</b>]
          </h2>
          <Card className="mb-3">
            <CardHeader color="info">
              {forumEntity.user ? forumEntity.user.login : 'vô danh'}{' '}
              <TextFormat value={forumEntity.createDay} type="date" format={APP_TIMESTAMP_FORMAT} />
            </CardHeader>
            <CardBody>
              <CardText>{forumEntity.content.search('<') === -1 ? forumEntity.content : renderHTML(forumEntity.content)}</CardText>
            </CardBody>
          </Card>
          <hr />
          {forumEntity.roots
            ? forumEntity.roots.map((forum, i) => (
                <Card className="mb-3" key={'card' + i}>
                  <CardHeader>
                    {forum.user.login} - {forum.title}- <TextFormat value={forum.createDay} type="date" format={APP_TIMESTAMP_FORMAT} />{' '}
                  </CardHeader>
                  <CardBody>
                    <CardText>{forum.content.search('<') === -1 ? forum.content : renderHTML(forum.content)}</CardText>
                  </CardBody>
                </Card>
              ))
            : 'nothing'}
          <ReactQuill value={this.state.content} onChange={this.handleChange} className="mb-3" />
          <Button tag={Link} to="/entity/forum/list" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button replace color="primary" onClick={this.saveAnsewer}>
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Trả lời</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ forum }: IRootState) => ({
  forumEntity: forum.entity,
  loading: forum.loading
});

const mapDispatchToProps = { getEntity, createEntityNewtopic };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumDetailTeacher);
