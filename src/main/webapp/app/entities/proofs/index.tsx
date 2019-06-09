import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Proofs from './proofs';
import ProofsDetail from './proofs-detail';
import ProofsUpdate from './proofs-update';
import ProofsDeleteDialog from './proofs-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProofsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProofsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProofsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Proofs} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProofsDeleteDialog} />
  </>
);

export default Routes;
