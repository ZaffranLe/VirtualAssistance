import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TeacherDocument from './teacher-document';
import TeacherDocumentDetail from './teacher-document-detail';
import TeacherDocumentUpdate from './teacher-document-update';
import TeacherDocumentDeleteDialog from './teacher-document-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TeacherDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TeacherDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TeacherDocumentDetail} />
      <ErrorBoundaryRoute path={match.url} component={TeacherDocument} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TeacherDocumentDeleteDialog} />
  </>
);

export default Routes;
