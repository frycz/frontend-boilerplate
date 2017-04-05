import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, DefaultRoute } from 'react-router';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as firebase from "firebase"

import loginSaga from "./containers/login/sagas"

import Main from './containers/main'
import Unauthorized from './containers/unauthorized'
import Notes from './containers/notes'
import Login from './containers/login/login'
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

const sagaMiddleware = createSagaMiddleware();

const initialState = {}

let store = createStore(notes, initialState, compose(
    applyMiddleware(sagaMiddleware)
));

function* sagas() {
    yield [fork(loginSaga)];
}
sagaMiddleware.run(sagas);

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