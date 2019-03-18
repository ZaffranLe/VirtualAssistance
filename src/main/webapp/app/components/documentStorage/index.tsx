import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DocumentStorage from './documentStorage';
import UploadDocument from './uploadDocument/uploadDocument';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={match.url} component={DocumentStorage} />
    <ErrorBoundaryRoute exact path={match.url} component={UploadDocument} />
  </>
);

export default Routes;
