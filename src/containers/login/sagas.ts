import * as constants from './constants'
import * as actions from './actions'
import { showSpinner, hideSpinner } from '../spinner/actions'
import { login } from '../../services/userService'
import { call, put, take, fork } from 'redux-saga/effects'

export function* loginUser() {
    while (true) {
        try {
            const action = yield take(constants.LOGIN_USER);
            yield put(showSpinner());
            const response = yield login(action.email, action.password);
            console.log('response', response);
            yield put(actions.loginUserSuccess(response));
            yield put(hideSpinner());
        }
        catch (error) {
            yield put(actions.loginUserError(error));
            yield put(hideSpinner());
        }
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }
}

export default startSagas(loginUser)