import * as constants from './constants'
import * as actions from './actions'
import { call, put, take, fork } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { showSpinner, hideSpinner } from '../spinner/actions'
import { loadNotesSuccess } from '../notes/actions'
import { loginWithGoogle, loginWithEmail, logout } from '../../services/userService'
import { fetchUserNotes, fetchSharedToUserNotes, fetchNoteCollaborators, updateUserData } from '../../services/dbService'

import * as firebase from 'firebase';

export function* setUser() {
    while (true) {
        const action = yield take(constants.SET_USER);
        yield put(showSpinner());
        yield updateUserData(action.user.user.uid, action.user.user);
        const userNotesSnapshot = yield fetchUserNotes(action.user.user.uid);
        const sharedNotesSnapshot = yield fetchSharedToUserNotes(action.user.user.uid);
        const notes = Object.assign({}, userNotesSnapshot.val(), sharedNotesSnapshot.val());

        for (let key of Object.keys(notes)) {
            if (notes[key].isShared) {
                const noteSnapshot = yield fetchNoteCollaborators(notes[key].id);
                notes[key].collaborators = {};
                Object.assign(notes[key].collaborators, noteSnapshot.val());
            }
	    }
        yield put(loadNotesSuccess(notes));
        yield put(hideSpinner());
        hashHistory.push('/notes');
    }
}

export function* loginUserWithGoogle() {
    while (true) {
        try {
            const action = yield take(constants.LOGIN_USER_WITH_GOOGLE);
            yield put(showSpinner());
            const response = yield loginWithGoogle();
            yield put(actions.loginUserSuccess(response));
            const snapshot = yield fetchUserNotes(response.user.uid);
            yield put(loadNotesSuccess(snapshot.val()));
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

export default startSagas(setUser, loginUserWithGoogle, loginUserWithEmail, logoutUser)