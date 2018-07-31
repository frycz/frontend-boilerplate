import * as _ from 'lodash';
import * as firebase from 'firebase';

export function fetchUserNotes(userId) {
    const database = firebase.database();
    return database.ref('/user-notes/' + userId).once('value');
}

export function fetchNoteCollaborators(noteId) {
    return firebase.database().ref('/collaborators/' + noteId).once('value');
}

export function fetchSharedToUserNotes(userId) {
    return firebase.database().ref('/shared-notes/' + userId).once('value');
}

export function saveUserNote(userId, note) {
    const notesRef = firebase.database().ref('/user-notes/' + userId).push();
    const noteEntry = (<any>Object).assign({}, note, {id: notesRef.key});
    notesRef.set(noteEntry);
    return noteEntry;
}

export function updateUserNote(userId, note, collaborators) {
    var updates = {};
    updates['/user-notes/' + userId + '/' + note.id] = note;
    _.toArray(collaborators).forEach(collaborator => {
        updates['/shared-notes/' + collaborator.id + '/' + note.id] = note;
    });
    firebase.database().ref().update(updates);
    return note;
}

export function updateCollaborators(note, collaborators, usersToShareNote, usersToRemoveNote) {
    var updates = {};
    updates['/user-notes/' + note.ownerId + '/' + note.id] = note;
    updates['/collaborators/' + note.id] = collaborators;
    Object.keys(usersToShareNote).forEach(key => {
        updates['/shared-notes/' + usersToShareNote[key].id + '/' + note.id] = note;
    })
    Object.keys(usersToRemoveNote).forEach(key => {
        firebase.database().ref('/shared-notes/' + usersToRemoveNote[key].id + '/' + note.id).remove();
    })

    firebase.database().ref().update(updates);
    return true;
}

export function moveUserNoteToTrash(userId, note, collaborators) {
    var updates = {};
    const noteInTrash = { ...note, isInTrash: true };
    updates['/user-notes/' + userId + '/' + note.id] = noteInTrash;
    _.toArray(collaborators).forEach(collaborator => {
        updates['/shared-notes/' + collaborator.id + '/' + note.id] = noteInTrash;
    });
    firebase.database().ref().update(updates);
    return note.id;
}

export function discardUserNote(userId, noteId) {
    // check if is owner
    const notesRef = firebase.database().ref('/user-notes/' + userId + '/' + noteId);
    // update shared notes too
    // remove collabolators
    notesRef.remove();
    return noteId;
}

export function updateUserData(userId, user) {
    var userData = {
        id: user.uid,
        email: user.providerData[0].email,
        displayName: user.providerData[0].displayName,
        fullDisplayName: (user.providerData[0].displayName + ' (' + user.providerData[0].email + ')'),
        fullName: (user.providerData[0].displayName + ' (' + user.providerData[0].email + ')').toLowerCase(),
        photoURL: user.providerData[0].photoURL,
        lastLogin: new Date()
    }
    const notesRef = firebase.database().ref('/users/' + userId);
    // update collaborators
    notesRef.update(userData);
    return userData;
}

export function fetchUser(userId) {
    return firebase.database().ref('/users/' + userId).once('value');
}

export function fetchUsers() {
    return firebase.database().ref('/users').once('value');
}

export function searchUser(searchText) {
    const searchString = searchText.toLowerCase();
    return firebase.database()
        .ref('/users')
        .orderByChild('fullName')
        .limitToFirst(5)
        .startAt(searchString)
        .once('value');
}