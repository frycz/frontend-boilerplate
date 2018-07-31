import * as React from 'react';
import {  Link, hashHistory } from 'react-router';
import * as ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

interface IRegisterProps {
}

class Register extends React.Component<IRegisterProps, {}> {
  constructor(props, context) {
    super(props, context);

  }

  onLoginClick() {
    hashHistory.push('/login');
  }

  onRegister() {
    console.log('Register');
  }

  public render() {
    const style = {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '0 10px',
      textAlign: 'center'
    } as React.CSSProperties
    return (
      <div
        style={style}>
          <div className="row">
            <div style={{padding: '40px 0'}} className="input-field col s12">
              <Card>
                <CardTitle title="Register"/>
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
                <TextField
                  fullWidth={true} 
                  floatingLabelText="Retype password"
                  type="password"
                />
                <RaisedButton onClick={this.onRegister.bind(this)} label="Register" primary={true} fullWidth={true} style={{marginTop: '25px'}}/>
                <FlatButton onClick={this.onLoginClick.bind(this)} label="Login" style={{marginTop: '25px'}}/>
                </CardText>
              </Card>
            </div>
          </div>
      </div>
    );
  }
}

export default Register;