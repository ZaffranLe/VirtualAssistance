import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProofType from './proof-type';
import ProofTypeDetail from './proof-type-detail';
import ProofTypeUpdate from './proof-type-update';
import ProofTypeDeleteDialog from './proof-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProofTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProofTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProofTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProofType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProofTypeDeleteDialog} />
  </>
);

export default Routes;
