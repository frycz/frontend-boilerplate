import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, DefaultRoute } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Dashboard from './containers/dashboard';
import About from './containers/about';
import Users from './containers/users';
import User from './containers/user';
import Nomatch from './containers/nomatch';
import notes from './reducers/notes';

let store = createStore(notes);

ReactDOM.render((<Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Dashboard}/>
        <Route path="/about" component={About}/>
        <Route path="/user" component={User}/>
        <Route path="/users" component={Users}/>
        <Route path="*" component={Nomatch}/>
      </Router>
    </Provider>), document.getElementById('app'));