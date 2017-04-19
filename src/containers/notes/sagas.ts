import * as constants from './constants'
import * as actions from './actions'
import { call, put, take, fork } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { showSpinner, hideSpinner } from '../../containers/spinner/actions'
import { initGapi, loadClientAuth, initClient, authenticateUser, uploadFile } from '../../services/googleService'
import { saveUserNote, updateUserNote } from '../../services/dbService'

export function* saveUserNoteInFirebase() {
    while (true) {
        const action = yield take(constants.SAVE_NOTE_IN_FIREBASE);
        const data = yield saveUserNote(action.userId, action.note);
    }
}

export function* updateUserNoteInFirebase() {
    while (true) {
        const action = yield take(constants.UPDATE_NOTE_IN_FIREBASE);
        const data = yield updateUserNote(action.userId, action.note);
    }
}

export function* uploadFileToGoogleDrive() {
    while (true) {
        const action = yield take(constants.UPLOAD_TO_GOOGLE_DRIVE);
        yield put(showSpinner());
        try {
            const gapi = yield initGapi();
            yield  loadClientAuth(gapi);
            yield  initClient(gapi);
            yield  authenticateUser(gapi);
            if(action.note.text) {
                if(!action.note.title) {
                    action.note.title = action.note.text.slice(0,12) + '...';
                }
                yield  uploadFile(gapi, action.note.title, action.note.text);
            }
        }
        catch (error) {

        }
        yield put(hideSpinner());
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }
}

export default startSagas(uploadFileToGoogleDrive, saveUserNoteInFirebase, updateUserNoteInFirebase)