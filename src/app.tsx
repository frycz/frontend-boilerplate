import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, DefaultRoute } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import * as firebase from "firebase"

import Main from './containers/main'
import Notes from './containers/notes'
import About from './containers/about'
import Users from './containers/users'
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

console.log('firebase', firebase);

let store = createStore(notes);

ReactDOM.render((<Provider store={store}>
      <Router history={hashHistory}>
        <Route component={Main}>
          <Route path="/" component={Notes}/>
          <Route path="/about" component={About}/>
          <Route path="/user" component={User}/>
          <Route path="/users" component={Users}/>
          <Route path="*" component={Nomatch}/>
        </Route>
      </Router>
    </Provider>), document.getElementById('app'));