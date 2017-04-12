import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, DefaultRoute } from 'react-router';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as firebase from "firebase"

import loginSaga from "./containers/login/sagas"
import notesSaga from "./containers/notes/sagas"

import Authorized from './containers/authorized'
import Unauthorized from './containers/unauthorized'
import Notes from './containers/notes/notes'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Settings from './containers/settings/settings'
import NotFound from './containers/not-found/not-found'
import notesReducer from './containers/notes/reducers'
import loginReducer from './containers/login/reducers'
import spinnerReducer from './containers/spinner/reducers'

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
});

const sagaMiddleware = createSagaMiddleware();

const initialState: any = {}

let store = createStore(combineReducers({
        login: loginReducer,
        spinner: spinnerReducer,
        notes: notesReducer
    }), 
    initialState,
    compose(
      applyMiddleware(sagaMiddleware)
    )
  );

function* sagas() {
    yield [fork(loginSaga), fork(notesSaga)];
}

sagaMiddleware.run(sagas);

function requireAuth(nextState, replace) {
  if (!store.getState().login.user) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((<Provider store={store}>

      <Router history={hashHistory}>
        <Route >
          <Route path="/" component={Authorized} onEnter={requireAuth}>
            <Route path="notes" component={Notes}/>
            <Route path="settings" component={Settings}/>
          </Route>
          <Route path="/" component={Unauthorized}>
            <Route path="register" component={Register}/>
            <Route path="login" component={Login}/>
          </Route>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    </Provider>), document.getElementById('app'));