import * as firebase from 'firebase';

export function fetchUserNotes(userId) {
    const database = firebase.database();

    firebase.database().ref('/user-notes/' + userId).on('value', function(snapshot) {
        // ...
    });
    return database.ref('/user-notes/' + userId).once('value');
}

export function fetchNoteCollaborators(noteId) {
    return firebase.database().ref('/collaborators/' + noteId).once('value');
}

export function fetchSharedToUserNotes(userId) {
    return firebase.database().ref('/shared-notes/' + userId).once('value');
}

export function shareUserNote(collaborator, note) {
    var updates = {};
    let sharedNote = note;
    sharedNote.shared = true;
    updates['/shared-notes/' + collaborator.id + '/' + sharedNote.id] = sharedNote;
    updates['/collaborators/' + sharedNote.id] = sharedNote;
    firebase.database().ref().update(updates);
    return sharedNote;
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

export function updateUserNoteCollaborators(note, collaborators, usersToShareNote, usersToRemoveNote) {
    var updates = {};
    if (collaborators.length == 0) {
        firebase.database().ref('/collaborators/' + note.id).remove();
        updates['/user-notes/' + note.ownerId + '/' + note.id] = {isShared: false};
    } else {
        updates['/collaborators/' + note.id] = collaborators;
        updates['/user-notes/' + note.ownerId + '/' + note.id] = {isShared: true};
        /*
        if (note.sharedTo) {
            note.sharedTo.split(',').forEach((collaboratorId) => {
                updates['/shared-notes/' + collaboratorId + '/' + note.id] = note;
            })
        }*/
    }
    usersToShareNote.forEach(userId => {
        updates['/shared-notes/' + userId + '/' + note.id] = note;
    })
    usersToRemoveNote.forEach(userId => {
        firebase.database().ref('/shared-notes/' + userId + '/' + note.id).remove();
    })

    firebase.database().ref().update(updates);
    return true;
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
        id: user.uid,
        email: user.providerData[0].email,
        displayName: user.providerData[0].displayName,
        fullDisplayName: (user.providerData[0].displayName + ' (' + user.providerData[0].email + ')'),
        fullName: (user.providerData[0].displayName + ' (' + user.providerData[0].email + ')').toLowerCase(),
        photoURL: user.providerData[0].photoURL,
        lastLogin: new Date()
    }
    const notesRef = firebase.database().ref('/users/' + userId);
    notesRef.update(userData);
    return userData;
}

export function fetchUsers() {
    return firebase.database().ref('/uses').once('value');
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