import * as constants from './constants'
import * as actions from './actions'
import { call, put, take, fork } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { showSpinner, hideSpinner } from '../spinner/actions'
import { loginWithGoogle, loginWithEmail, logout } from '../../services/userService'

export function* loginUserWithGoogle() {
    while (true) {
        try {
            const action = yield take(constants.LOGIN_USER_WITH_GOOGLE);
            yield put(showSpinner());
            const response = yield loginWithGoogle();
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

export function* loginUserWithEmail() {
    while (true) {
        try {
            const action = yield take(constants.LOGIN_USER_WITH_EMAIL);
            yield put(showSpinner());
            const response = yield loginWithEmail(action.email, action.password);
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
        yield take(constants.LOGOUT_USER);
        yield logout();
        hashHistory.push('/login');
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }
}

export default startSagas(loginUserWithGoogle, loginUserWithEmail, logoutUser)