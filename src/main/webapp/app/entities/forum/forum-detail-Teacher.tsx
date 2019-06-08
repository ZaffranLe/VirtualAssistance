import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './forum.reducer';
import { IForum } from 'app/shared/model/forum.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IForumDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ForumDetailTeacher extends React.Component<IForumDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  constructor(props: IForumDetailProps) {
    super(props);
    this.state = {
      content: 'any'
    };
  }

  handleChange = value => {
    this.setState({ content: value });
  };
  render() {
    const { forumEntity } = this.props;
    console.log(forumEntity);
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="virtualAssistantApp.forum.detail.title">Forum</Translate> [<b>Teacher: {forumEntity.id}</b>]
          </h2>
          {forumEntity.content} - {forumEntity.title} - <TextFormat value={forumEntity.createDay} type="date" format={APP_DATE_FORMAT} />
          <Card className="mb-3">
            <CardHeader> {forumEntity.title}</CardHeader>
            <CardBody>
              <CardText>{forumEntity.content}</CardText>
            </CardBody>
          </Card>
          {forumEntity.roots
            ? forumEntity.roots.map((forum, i) => (
                <Card className="mb-3">
                  <CardHeader> {forum.title}</CardHeader>
                  <CardBody>
                    <CardText>{forum.content}</CardText>
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
          <Button replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Trả lời</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ forum }: IRootState) => ({
  forumEntity: forum.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumDetailTeacher);
