import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CriteriaEvaluate from './criteria-evaluate';
import CriteriaEvaluateDetail from './criteria-evaluate-detail';
import CriteriaEvaluateUpdate from './criteria-evaluate-update';
import CriteriaEvaluateDeleteDialog from './criteria-evaluate-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CriteriaEvaluateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CriteriaEvaluateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CriteriaEvaluateDetail} />
      <ErrorBoundaryRoute path={match.url} component={CriteriaEvaluate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CriteriaEvaluateDeleteDialog} />
  </>
);

export default Routes;
