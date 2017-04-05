import * as React from 'react';
import {  Link } from 'react-router';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux'

import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { loginUser } from './actions'

import { login } from '../../services/userService';

interface ILoginProps {
  loginUser(email, password): void 
}

interface ILoginState {
    email: string,
    password: string
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: ''
    };
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onLogin() {
    console.log('login');
    this.props.loginUser(this.state.email, this.state.password);
  }

  public render() {
    const style = {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '0 10px',
      textAlign: 'center'
    }
    return (
      <div
        style={style}>
          <div className="row">
            <div style={{padding: '40px 0'}} className="input-field col s12">
              <Card>
                <CardTitle title="Login"/>
                <CardText>
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
                <RaisedButton onClick={this.onLogin.bind(this)} label="Sign in" primary={true} fullWidth={true} style={{marginTop: '25px'}}/>
                <div style={{paddingTop: '12px'}}>or</div>
                <Link style={{display: 'inline-block', boxSizing: 'border-box', width: '100%', padding: '12px'}} to={'/register'} >register</Link>
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      loginUser: (email, password) => dispatch(loginUser(email, password))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
