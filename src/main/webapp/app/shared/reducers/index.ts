import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import teacher, {
  TeacherState
} from 'app/entities/teacher/teacher.reducer';
// prettier-ignore
import teacherDocument, {
  TeacherDocumentState
} from 'app/entities/teacher-document/teacher-document.reducer';
// prettier-ignore
import notificationType, {
  NotificationTypeState
} from 'app/entities/notification-type/notification-type.reducer';
// prettier-ignore
import headQuater, {
  HeadQuaterState
} from 'app/entities/head-quater/head-quater.reducer';
// prettier-ignore
import criteriaType, {
  CriteriaTypeState
} from 'app/entities/criteria-type/criteria-type.reducer';
// prettier-ignore
// prettier-ignore
import fullEvaluate, {
  FullEvaluateState
} from 'app/entities/full-evaluate/full-evaluate.reducer';
// prettier-ignore
// prettier-ignore
import criteriaEvaluate, {
  CriteriaEvaluateState
} from 'app/entities/criteria-evaluate/criteria-evaluate.reducer';
// prettier-ignore
import documentType, {
  DocumentTypeState
} from 'app/entities/document-type/document-type.reducer';
// prettier-ignore
import document, {
  DocumentState
} from 'app/entities/document/document.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification.reducer';
// prettier-ignore
import answer, {
  AnswerState
} from 'app/entities/answer/answer.reducer';
// prettier-ignore
import proofs, {
  ProofsState
} from 'app/entities/proofs/proofs.reducer';
// prettier-ignore
import proofType, {
  ProofTypeState
} from 'app/entities/proof-type/proof-type.reducer';
// prettier-ignore
import forum, {
  ForumState
} from 'app/entities/forum/forum.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly teacher: TeacherState;
  readonly teacherDocument: TeacherDocumentState;
  readonly document: DocumentState;
  readonly documentType: DocumentTypeState;
  readonly notification: NotificationState;
  readonly notificationType: NotificationTypeState;
  readonly headQuater: HeadQuaterState;
  readonly criteriaType: CriteriaTypeState;
  readonly answer: AnswerState;
  readonly fullEvaluate: FullEvaluateState;
  readonly criteriaEvaluate: CriteriaEvaluateState;
  readonly proofs: ProofsState;
  readonly proofType: ProofTypeState;
  readonly forum: ForumState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  teacher,
  teacherDocument,
  document,
  documentType,
  notification,
  notificationType,
  headQuater,
  criteriaType,
  answer,
  fullEvaluate,
  criteriaEvaluate,
  proofs,
  proofType,
  forum,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
