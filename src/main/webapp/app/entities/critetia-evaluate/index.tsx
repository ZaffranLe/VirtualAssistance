import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CritetiaEvaluate from './critetia-evaluate';
import CritetiaEvaluateDetail from './critetia-evaluate-detail';
import CritetiaEvaluateUpdate from './critetia-evaluate-update';
import CritetiaEvaluateDeleteDialog from './critetia-evaluate-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CritetiaEvaluateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CritetiaEvaluateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CritetiaEvaluateDetail} />
      <ErrorBoundaryRoute path={match.url} component={CritetiaEvaluate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CritetiaEvaluateDeleteDialog} />
  </>
);

export default Routes;
