import * as React from 'react';
import {  Link } from 'react-router';
import * as ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

interface IRegisterProps {
}

class Register extends React.Component<IRegisterProps, {}> {
  constructor(props, context) {
    super(props, context);

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
    }
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
                <div style={{paddingTop: '12px'}}>or</div>
                <Link style={{display: 'inline-block', boxSizing: 'border-box', width: '100%', padding: '12px'}} to={'/login'} >login</Link>
                </CardText>
              </Card>
            </div>
          </div>
      </div>
    );
  }
}

export default Register;