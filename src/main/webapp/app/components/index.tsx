import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Survey from './evaluate/Survey';
import DocumentStorage from './documentStorage/documentStorage';
import UploadDocument from './documentStorage/uploadDocument/uploadDocument';
import FindNotification from './notification/FindNotification';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/survey/:id/edit`} component={Survey} />
      <ErrorBoundaryRoute path={`${match.url}/survey`} component={Survey} />
      <ErrorBoundaryRoute path={`${match.url}/documents`} component={DocumentStorage} />
      <ErrorBoundaryRoute path={`${match.url}/upload`} component={UploadDocument} />
      <ErrorBoundaryRoute path={`${match.url}/notifications`} component={FindNotification} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
