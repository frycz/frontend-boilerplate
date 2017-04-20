import * as firebase from 'firebase';

export function fetchUserNotes(userId) {
    const database = firebase.database();

    firebase.database().ref('/user-notes/' + userId).on('value', function(snapshot) {
        console.log('snapshot.val()');
        // ...
    });

    /*
        return new Promise(function(resolve, reject) {
            gapi.load('client:auth2', resolve);
        });
    */

    return database.ref('/user-notes/' + userId).once('value');
}

export function saveUserNote(userId, note) {
    const notesRef = firebase.database().ref('/user-notes/' + userId).push();
    const noteEntry = (<any>Object).assign({}, note, {id: notesRef.key});
    notesRef.set(noteEntry);
    return noteEntry;
}

export function updateUserNote(userId, note) {
    const notesRef = firebase.database().ref('/user-notes/' + userId + '/' + note.id);
    notesRef.update(note);
    return note;
}

export function moveUserNoteToTrash(userId, noteId) {
    const notesRef = firebase.database().ref('/user-notes/' + userId + '/' + noteId);
    notesRef.update({isInTrash: true});
    return noteId;
}