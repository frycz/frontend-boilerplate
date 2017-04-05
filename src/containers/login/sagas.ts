import * as constants from './constants'
import { call, put, take, fork } from 'redux-saga/effects'

export function* loginUser() {
    while (true) {
        const result = yield take(constants.LOGIN_USER);
        console.log('user login saga');
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }
}

export default startSagas(loginUser)