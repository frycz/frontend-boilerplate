import * as firebase from 'firebase';

export function fetchUserNotes(userId) {
    const database = firebase.database();

    firebase.database().ref('/user-notes/' + userId).on('value', function(snapshot) {
        //console.log('snapshot.val()');
        // ...
    });

    /*
        return new Promise(function(resolve, reject) {
            gapi.load('client:auth2', resolve);
        });
    */

    return database.ref('/user-notes/' + userId).once('value');
}

export function fetchSharedToUserNotes(userId) {
    return firebase.database().ref('/shared-notes/' + userId).once('value');
}

export function shareUserNote(collaboratorId, note) {
    const notesRef = firebase.database().ref('/shared-notes/' + collaboratorId + '/' + note.id);
    notesRef.update(note);
    return note;
}

export function saveUserNote(userId, note) {
    const notesRef = firebase.database().ref('/user-notes/' + userId).push();
    const noteEntry = (<any>Object).assign({}, note, {id: notesRef.key});
    notesRef.set(noteEntry);
    return noteEntry;
}

export function updateUserNote(userId, note) {
    var updates = {};
    updates['/user-notes/' + userId + '/' + note.id] = note;
    if (note.sharedTo) {
        note.sharedTo.split(',').forEach((collaboratorId) => {
            updates['/shared-notes/' + collaboratorId + '/' + note.id] = note;
        })
    }
    firebase.database().ref().update(updates);
    return note;
}

export function moveUserNoteToTrash(userId, noteId) {
    const notesRef = firebase.database().ref('/user-notes/' + userId + '/' + noteId);
    notesRef.update({isInTrash: true});
    return noteId;
}

export function discardUserNote(userId, noteId) {
    const notesRef = firebase.database().ref('/user-notes/' + userId + '/' + noteId);
    notesRef.remove();
    return noteId;
}

export function updateUserData(userId, user) {
    var userData = {
        email: user.providerData[0].email,
        displayName: user.providerData[0].displayName,
        lastLogin: new Date()
    }
    const notesRef = firebase.database().ref('/users/' + userId);
    notesRef.update(userData);
    return userData;
}