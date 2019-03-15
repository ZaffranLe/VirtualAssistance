import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HeadQuater from './head-quater';
import HeadQuaterDetail from './head-quater-detail';
import HeadQuaterUpdate from './head-quater-update';
import HeadQuaterDeleteDialog from './head-quater-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HeadQuaterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HeadQuaterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HeadQuaterDetail} />
      <ErrorBoundaryRoute path={match.url} component={HeadQuater} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HeadQuaterDeleteDialog} />
  </>
);

export default Routes;
