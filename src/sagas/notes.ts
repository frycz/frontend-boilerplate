import * as constants from '../constants/actions'
import * as actions from '../actions/notes'
import { call, put, take, fork } from 'redux-saga/effects'
import {hashHistory} from 'react-router'
import { showSpinner, hideSpinner } from '../containers/spinner/actions'
import { initGapi, loadClientAuth, initClient, authenticateUser, uploadFile } from '../services/googleService'


export function* uploadFileToGoogleDrive() {
    while (true) {
        const action = yield take(constants.UPLOAD_TO_GOOGLE_DRIVE);
        try {
            yield put(showSpinner());
            const gapi = yield initGapi();
            yield  loadClientAuth(gapi);
            yield  initClient(gapi);
            yield  authenticateUser(gapi);
            if(action.text) {
                if(!action.title) {
                    action.title = action.text.slice(0,12) + '...';
                }
                yield  uploadFile(gapi, action.title, action.text);
            }
            yield put(hideSpinner());
        }
        catch (error) {

        }
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }
}

export default startSagas(uploadFileToGoogleDrive)