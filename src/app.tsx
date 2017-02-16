import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, DefaultRoute } from 'react-router';

import Dashboard from './containers/dashboard';
import About from './containers/about';
import Users from './containers/users';
import User from './containers/user';
import Nomatch from './containers/nomatch';

ReactDOM.render((<Router history={hashHistory}>
      <Route path="/" component={Dashboard}/>
      <Route path="/about" component={About}/>
      <Route path="/user" component={User}/>
      <Route path="/users" component={Users}/>
      <Route path="*" component={Nomatch}/>
    </Router>), document.getElementById('app'));