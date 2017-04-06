import * as constants from './constants'
import * as actions from './actions'
import { login } from '../../services/userService'
import { call, put, take, fork } from 'redux-saga/effects'

export function* loginUser() {
    while (true) {
        try {
            const action = yield take(constants.LOGIN_USER);
            const response = yield login(action.email, action.password);
            console.log('response', response);
            yield put(actions.loginUserSuccess(response));
        }
        catch (error) {
            yield put(actions.loginUserError(error));
        }
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }
}

export default startSagas(loginUser)