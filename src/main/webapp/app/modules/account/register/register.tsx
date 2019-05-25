import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';
import { FilePond } from 'react-filepond';
// tslint:disable-next-line:no-submodule-imports
import 'filepond/dist/filepond.min.css';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export interface IRegisterProps extends StateProps, DispatchProps {}

export interface IRegisterState {
  password: string;
  date: Date;
}

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: '',
    date: null
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    values.doB = new Date(values.doB);
    this.props.handleRegister(
      values.username,
      values.email,
      values.firstPassword,
      values.identityNumber,
      values.firstName,
      values.lastName,
      values.phone,
      values.address,
      values.doB,
      this.props.currentLocale
    );
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };
  //

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1 id="register-title">
              <Translate contentKey="register.title">Registration</Translate>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm id="register-form" onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="username"
                label={translate('global.form.username')}
                placeholder={translate('global.form.username.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                  pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                  minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                  maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
                }}
              />
              <FilePond
                //  ref={this.fileRef}
                allowMultiple={false}
              />
              <AvField
                name="email"
                label={translate('global.form.email')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                }}
              />
              <AvField
                name="firstPassword"
                label={translate('global.form.newpassword')}
                placeholder={translate('global.form.newpassword.placeholder')}
                type="password"
                onChange={this.updatePassword}
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                }}
              />
              <PasswordStrengthBar password={this.state.password} />
              <AvField
                name="secondPassword"
                label={translate('global.form.confirmpassword')}
                placeholder={translate('global.form.confirmpassword.placeholder')}
                type="password"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                  match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                }}
              />

              <AvField
                name="identityNumber"
                label={translate('virtualAssistantApp.teacher.identityNumber')}
                placeholder={translate('virtualAssistantApp.teacher.identityNumber')}
                type="number"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.required.id') },
                  minLength: { value: 9, errorMessage: translate('global.messages.validate.required.idMinLength') },
                  maxLength: { value: 12, errorMessage: translate('global.messages.validate.required.idMaxLength') }
                }}
              />
              <AvField
                name="firstName"
                label="Tên riêng"
                placeholder="Tên riêng"
                type="text"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.required.firstName') }
                }}
              />
              <AvField
                name="lastName"
                label="Tên họ"
                placeholder="Tên họ"
                type="text"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.required.látName') }
                }}
              />
              <AvField
                name="phone"
                label={translate('virtualAssistantApp.teacher.phone')}
                placeholder={translate('virtualAssistantApp.teacher.phone')}
                type="number"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.required.phone') },
                  minLength: { value: 10, errorMessage: translate('global.messages.validate.required.phoneLength') },
                  maxLength: { value: 10, errorMessage: translate('global.messages.validate.required.phoneLength') }
                }}
              />
              <AvField
                name="address"
                label={translate('virtualAssistantApp.teacher.address')}
                placeholder={translate('virtualAssistantApp.teacher.address')}
                type="text"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.required.address') }
                }}
              />
              <AvField
                name="doB"
                label={translate('virtualAssistantApp.teacher.doB')}
                placeholder={translate('virtualAssistantApp.teacher.doB')}
                type="datetime"
                value={null}
              />
              <Button id="register-submit" color="primary" type="submit">
                <Translate contentKey="register.form.button">Register</Translate>
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
