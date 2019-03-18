import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Teacher from './teacher';
import TeacherDocument from './teacher-document';
import Document from './document';
import DocumentType from './document-type';
import Notification from './notification';
import NotificationType from './notification-type';
import HeadQuater from './head-quater';
import CriteriaType from './criteria-type';
import Answer from './answer';
import FullEvaluate from './full-evaluate';
import CriteriaEvaluate from './criteria-evaluate';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/teacher`} component={Teacher} />
      <ErrorBoundaryRoute path={`${match.url}/teacher-document`} component={TeacherDocument} />
      <ErrorBoundaryRoute path={`${match.url}/document`} component={Document} />
      <ErrorBoundaryRoute path={`${match.url}/document-type`} component={DocumentType} />
      <ErrorBoundaryRoute path={`${match.url}/notification`} component={Notification} />
      <ErrorBoundaryRoute path={`${match.url}/notification-type`} component={NotificationType} />
      <ErrorBoundaryRoute path={`${match.url}/head-quater`} component={HeadQuater} />
      <ErrorBoundaryRoute path={`${match.url}/criteria-type`} component={CriteriaType} />
      <ErrorBoundaryRoute path={`${match.url}/answer`} component={Answer} />
      <ErrorBoundaryRoute path={`${match.url}/full-evaluate`} component={FullEvaluate} />
      <ErrorBoundaryRoute path={`${match.url}/criteria-evaluate`} component={CriteriaEvaluate} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
