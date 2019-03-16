import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Survey from './Survey';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={match.url} component={Survey} />
  </>
);

export default Routes;
