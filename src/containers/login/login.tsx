import * as React from 'react';
import { Link, hashHistory } from 'react-router';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as classNames from 'classnames';

import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { loginUserWithGoogle, loginUserWithEmail } from './actions'

import { loginWithGoogle, loginWithEmail } from '../../services/userService';

interface ILoginProps {
  error: any,
  loginUserWithGoogle(): void,
  loginUserWithEmail(email, password): void 
}

interface ILoginState {
    email: string,
    password: string,
    loginWithEmail: boolean
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      loginWithEmail: false
    };
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onRegisterClick() {
    hashHistory.push('/register');
  }

  toggleEmailLogin() {
    this.setState({loginWithEmail: !this.state.loginWithEmail});
  }

  onLoginUserWithGoogle() {
    this.props.loginUserWithGoogle();
  }

  onLoginUserWithGithub() {
    //this.props.loginUserWithGithub();
  }

  onLoginUserWithTwitter() {
    //this.props.loginUserWithTwitter();
  }

  onLoginUserWithFacebook() {
    //this.props.loginUserWithFacebook();
  }

  onLoginUserWithEmail() {
    this.props.loginUserWithEmail(this.state.email, this.state.password);
  }

  public render() {
    const style = {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '0 10px',
      textAlign: 'center'
    }
    const loginMethodsClasses = classNames({
      'hidden': this.state.loginWithEmail
    })
    const loginFormClasses = classNames({
      'hidden': !this.state.loginWithEmail
    })
    return (
      <div
        style={style}>
          <div className="row">
            <div style={{padding: '40px 0'}} className="input-field col s12">
              <Card>
                <CardTitle title="Login"/>
                <CardText>
                  <div style={{color: '#bd4141'}}>{this.props.error ? this.props.error.message : null}</div>
                  <div className={loginMethodsClasses}>
                    <RaisedButton onClick={this.onLoginUserWithGoogle.bind(this)} label="Google" fullWidth={true} style={{marginTop: '15px', boxShadow: 'none', border: '1px solid #efefef'}}/>
{/*
                    <RaisedButton onClick={this.onLoginUserWithGithub.bind(this)}  label="Github" fullWidth={true} style={{marginTop: '15px', boxShadow: 'none', border: '1px solid #efefef'}}/>
                    <RaisedButton onClick={this.onLoginUserWithTwitter.bind(this)} label="Twitter" fullWidth={true} style={{marginTop: '15px', boxShadow: 'none', border: '1px solid #efefef'}}/>
                    <RaisedButton onClick={this.onLoginUserWithFacebook.bind(this)} label="Facebook" fullWidth={true} style={{marginTop: '15px', boxShadow: 'none', border: '1px solid #efefef'}}/>
*/}
                    <RaisedButton onClick={this.toggleEmailLogin.bind(this)} label="Email" fullWidth={true} style={{marginTop: '15px', boxShadow: 'none', border: '1px solid #efefef'}}/>
                  </div>
                  <div className={loginFormClasses}>
                    <TextField
                      fullWidth={true} 
                      floatingLabelText="Email"
                      value={this.state.email}
                      onChange={this.onEmailChange.bind(this)}
                    /><br />
                    <TextField
                      fullWidth={true} 
                      floatingLabelText="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onPasswordChange.bind(this)}
                    />
                    <RaisedButton onClick={this.onLoginUserWithEmail.bind(this)} label="Sign in" primary={true} fullWidth={true} style={{marginTop: '15px'}}/>
                    <div style={{textAlign: 'left'}}>
                      <FlatButton onClick={this.toggleEmailLogin.bind(this)} label="Back" style={{marginTop: '15px'}}/>
                      <FlatButton onClick={this.onRegisterClick.bind(this)} label="Register" style={{marginTop: '15px', float: 'right'}}/>
                    </div>
                  </div>
                </CardText>
              </Card>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.login.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      loginUserWithGoogle: () => dispatch(loginUserWithGoogle()),
      loginUserWithEmail: (email, password) => dispatch(loginUserWithEmail(email, password))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
