// Importing vendors
import React from 'react';
import {browserHistory} from 'react-router';
import Formsy from 'formsy-react';
import cx from 'classnames';
import Auth from 'j-toker';

Auth.configure({
  apiUrl: '/api',
  signOutPath: '/users/sign_out',
  emailSignInPath: '/users/sign_in',
  emailRegistrationPath: '/users',
  accountUpdatePath: '/users',
  accountDeletePath: '/users',
  passwordResetPath: '/users/password',
  passwordUpdatePath: '/users/password',
  tokenValidationPath: '/users/validate_token',
}, true);

// Importing Material UI components.
import {Paper, Checkbox, RaisedButton} from 'material-ui';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

// Project Imports
import {Component} from 'utils';

// Importing component's styles.
import css from './Login.scss';


// Styles for the Signin form.
const SIGNIN_FORM_ROOT_STYLE = {
  position: 'relative',
  display: 'inline-block',
  width: '380px',
  padding: '24px',
  margin: '35px 0'
};

// Defining the <Login /> component.
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'joao.cruz@gmail.com',
      password: '12345678',
      rememberme: true,
      invalidLogin: false
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    this.setState({loading: false});
  }

  handleLogin() {
    Auth.emailSignIn({
      email: this.state.username,
      password: this.state.password,
      config: 'default'
    })

      .then((resp) => {
        this.props.set(resp.data);
        if (!!this.props.location.state.nextPathname && this.props.location.state.nextPathname != '/auth/prosite/login') {
          browserHistory.push(this.props.location.state.nextPathname)
        } else {
          browserHistory.push('/')
        }
      })
      .fail((resp) => {
        this.setState({
          invalidLogin: true,
          errors: resp.data.errors
        });
      });
  }

  renderSignin() {
    return (
      <div className={css.LoginBackground}>
        <div className={css.LoginBox}>
          <Paper zDepth={5} rounded={false} style={SIGNIN_FORM_ROOT_STYLE}>
            <Formsy.Form onValidSubmit={this.handleLogin}>
              <div>
                <img src="//s3.amazonaws.com/rd-marketing-objects/lp-model/logos/logo-rdstation.png"
                     alt="RD Station - Logo"
                     style={{width: '40%', margin: '0 auto', display: 'block'}}/>
              </div>
              <div>
                <FormsyText
                  name="emailField"
                  required
                  floatingLabelText="e-mail"
                  fullWidth={true}
                  onChange={this.bindEvent('username', 'input')}
                  validations="isEmail"
                  value="joao.cruz@gmail.com"
                  validationErrors={{
                    isEmail: 'O e-mail inserido não é válido.'
                  }}
                />
                <FormsyText
                  name="passwordField"
                  required
                  floatingLabelText="senha"
                  fullWidth={true}
                  type="password"
                  onChange={this.bindEvent('password', 'input')}
                  validations="minLength:6"
                  value="12345678"
                  validationErrors={{
                    minLength: 'Sua senha tem no mínimo 6 caracteres'
                  }}
                />
              </div>
              <div className={cx('row', css.LoginActions)}>
                <div className="col-12">
                  <RaisedButton
                    type="submit"
                    label="Entrar"
                    primary={true}
                    fullWidth={true}/>
                </div>
              </div>
            </Formsy.Form>
          </Paper>
        </div>
      </div>
    )
  }

  renderLoading() {
    return (
      <div style={{width: 500}}>
        <h1>Loading...</h1>
      </div>
    )
  }

  render() {
    return this.props.loading ? this.renderLoading() : this.renderSignin()
  }
}

// Prop Type definitions
Login.propTypes = {
  loading: React.PropTypes.bool,
  request: React.PropTypes.func.isRequired,
};

export default Login

