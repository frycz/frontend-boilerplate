import * as constants from './constants'
import * as actions from './actions'
import { call, put, take, fork } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { showSpinner, hideSpinner } from '../spinner/actions'
import { login, logout } from '../../services/userService'

export function* loginUser() {
    while (true) {
        try {
            const action = yield take(constants.LOGIN_USER);
            yield put(showSpinner());
            const response = yield login(action.email, action.password);
            yield put(actions.loginUserSuccess(response));
            yield put(hideSpinner());
            hashHistory.push('/notes');
        }
        catch (error) {
            yield put(actions.loginUserError(error));
            yield put(hideSpinner());
        }
    }
}

export function* logoutUser() {
    while (true) {
            const action = yield take(constants.LOGOUT_USER);
            yield logout();
            hashHistory.push('/login');
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }
}

export default startSagas(loginUser, logoutUser)