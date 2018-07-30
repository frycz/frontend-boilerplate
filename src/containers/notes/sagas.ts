import * as _ from 'lodash'
import * as constants from './constants'
import * as actions from './actions'
import { call, put, take, fork } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { showSpinner, hideSpinner } from '../../containers/spinner/actions'
import { showGlobalMessage } from '../../containers/message/actions'
import { initGapi, loadClientAuth, initClient, authenticateUser, uploadFile } from '../../services/googleService'
import { 
    saveUserNote,
    updateUserNote,
    moveUserNoteToTrash,
    discardUserNote,
    searchUser,
    updateCollaborators 
} from '../../services/dbService'

export function* saveUserNoteInFirebase() {
    while (true) {
        const action = yield take(constants.SAVE_NOTE_IN_FIREBASE);
        const note = _.omit(action.note, ['collaborators']);
        yield saveUserNote(action.userId, note);
        yield put(actions.addNote(action.userId, note));
    }
}

export function* updateUserNoteInFirebase() {
    while (true) {
        const action = yield take(constants.UPDATE_NOTE_IN_FIREBASE);
        const note = _.omit(action.note, ['collaborators']);
        const collaborators = _.pick(action.note, ['collaborators']);
        yield updateUserNote(action.userId, note, collaborators);
        yield put(actions.editNote(action.note));
    }
}

export function* moveNoteToTrashInFirebase() {
    while (true) {
        const action = yield take(constants.MOVE_NOTE_TO_TRASH_IN_FIREBASE);
        const noteId = yield moveUserNoteToTrash(action.userId, action.noteId);
        yield put(actions.moveNoteToTrash(noteId));
    }
}

export function* discardNoteInFirebase() {
    while (true) {
        const action = yield take(constants.DISCARD_NOTE_IN_FIREBASE);
        const noteId = yield discardUserNote(action.userId, action.noteId);
        yield put(actions.discardNote(noteId));
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
            if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
                yield  authenticateUser(gapi);
            }
            if(action.note.text) {
                if(!action.note.title) {
                    action.note.title = action.note.text.slice(0,12) + '...';
                }
                yield uploadFile(gapi, action.note.title, action.note.text);
                yield put(showGlobalMessage('Note uploaded successfully'));
            }
        }
        catch (error) {
            console.error(error);
        }
        yield put(hideSpinner());
    }
}

export function* searchUserInFirebase() {
    while (true) {
        const action = yield take(constants.SEARCH_USER_IN_FIREBASE);
        let users = null;
        if (action.searchText.length > 1) {
            const snapshot = yield searchUser(action.searchText);
            users = snapshot.val();
        }
        yield put(actions.searchUserInFirebaseSuccess(users));
    }
}

export function* updateUserNoteCollaborators() {
    while (true) {
        const action = yield take(constants.UPDATE_USER_NOTE_COLLABORATORS);
        const {collaborators, usersToShareNote, usersToRemoveNote} = action;
        const isShared = !!(Object.keys(action.collaborators).length > 1);
        const note = { ...action.note, isShared };
        yield updateCollaborators(
            note,
            collaborators,
            usersToShareNote,
            usersToRemoveNote
        );
        yield put(actions.updateUserNoteCollaboratorsSuccess(note, collaborators));
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
        updateUserNoteInFirebase,
        moveNoteToTrashInFirebase,
        discardNoteInFirebase,
        searchUserInFirebase,
        updateUserNoteCollaborators
    )