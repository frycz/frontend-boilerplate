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
    const notesRef = firebase.database().ref('/user-notes/' + userId);
    const newNoteRef = notesRef.push();
    return newNoteRef.set({
        title: note.title,
        text: note.text
    });
}

export function updateUserNote(userId, note) {
    const notesRef = firebase.database().ref('/user-notes/' + userId + '/' + note.id);
    return notesRef.update({
        title: note.title,
        text: note.text
    });
}