import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Forum from './forum';
import ForumTeacher from './forumTeacher';
import ForumDetailTeacher from './forum-detail-Teacher';
import ForumDetail from './forum-detail';
import ForumUpdate from './forum-update';
import ForumDeleteDialog from './forum-delete-dialog';
import ForumNewTopic from './forum-newtopic';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/list`} component={ForumTeacher} />
      <ErrorBoundaryRoute exact path={`${match.url}/list/newteacher`} component={ForumNewTopic} />
      <ErrorBoundaryRoute exact path={`${match.url}/list/:id`} component={ForumDetailTeacher} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ForumUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ForumUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ForumDetail} />
      <ErrorBoundaryRoute path={match.url} component={Forum} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ForumDeleteDialog} />
  </>
);

export default Routes;
