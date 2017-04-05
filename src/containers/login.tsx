import * as React from 'react';
import {  Link } from 'react-router';
import * as ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

interface ILoginProps {
}

class Login extends React.Component<ILoginProps, {}> {
  constructor(props, context) {
    super(props, context);

  }

  onLogin() {
    console.log('login');
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
                /><br />
                <TextField
                  fullWidth={true} 
                  floatingLabelText="Password"
                  type="password"
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

export default Login;