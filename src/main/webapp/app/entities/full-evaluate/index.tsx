import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FullEvaluate from './full-evaluate';
import FullEvaluateDetail from './full-evaluate-detail';
import FullEvaluateUpdate from './full-evaluate-update';
import FullEvaluateDeleteDialog from './full-evaluate-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FullEvaluateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FullEvaluateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FullEvaluateDetail} />
      <ErrorBoundaryRoute path={match.url} component={FullEvaluate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FullEvaluateDeleteDialog} />
  </>
);

export default Routes;
