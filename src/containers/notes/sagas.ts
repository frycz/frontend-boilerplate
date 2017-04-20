import * as constants from './constants'
import * as actions from './actions'
import { call, put, take, fork } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { showSpinner, hideSpinner } from '../../containers/spinner/actions'
import { initGapi, loadClientAuth, initClient, authenticateUser, uploadFile } from '../../services/googleService'
import { saveUserNote, updateUserNote, moveUserNoteToTrash } from '../../services/dbService'

export function* saveUserNoteInFirebase() {
    while (true) {
        const action = yield take(constants.SAVE_NOTE_IN_FIREBASE);
        const note = yield saveUserNote(action.userId, action.note);
        yield put(actions.addNote(note));
    }
}

export function* updateUserNoteInFirebase() {
    while (true) {
        const action = yield take(constants.UPDATE_NOTE_IN_FIREBASE);
        const note = yield updateUserNote(action.userId, action.note);
        yield put(actions.editNote(note));
    }
}

export function* moveNoteToTrashInFirebase() {
    while (true) {
        const action = yield take(constants.MOVE_NOTE_TO_TRASH_IN_FIREBASE);
        const noteId = yield moveUserNoteToTrash(action.userId, action.noteId);
        yield put(actions.moveNoteToTrash(noteId));
    }
}

/**
 TODO:
 - move note to trash saved in firebase
 - update google drive id 
 */

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

export default startSagas(
        uploadFileToGoogleDrive,
        saveUserNoteInFirebase,
        moveNoteToTrashInFirebase,
        updateUserNoteInFirebase
    )