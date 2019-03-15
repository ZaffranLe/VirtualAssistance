import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CriteriaType from './criteria-type';
import CriteriaTypeDetail from './criteria-type-detail';
import CriteriaTypeUpdate from './criteria-type-update';
import CriteriaTypeDeleteDialog from './criteria-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CriteriaTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CriteriaTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CriteriaTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CriteriaType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CriteriaTypeDeleteDialog} />
  </>
);

export default Routes;
