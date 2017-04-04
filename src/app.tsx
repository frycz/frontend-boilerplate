import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, DefaultRoute } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import * as firebase from "firebase"

import Main from './containers/main'
import Unauthorized from './containers/unauthorized'
import Notes from './containers/notes'
import Login from './containers/login'
import Register from './containers/register'
import User from './containers/user'
import Nomatch from './containers/nomatch'
import notes from './reducers/notes'

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
});

let store = createStore(notes);

ReactDOM.render((<Provider store={store}>

      <Router history={hashHistory}>
        <Route >
          <Route path="/" component={Main}>
            <Route path="notes" component={Notes}/>
            <Route path="settings" component={User}/>
          </Route>
          <Route path="/" component={Unauthorized}>
            <Route path="register" component={Register}/>
            <Route path="login" component={Login}/>
          </Route>
          <Route path="*" component={Nomatch}/>
        </Route>
      </Router>
    </Provider>), document.getElementById('app'));