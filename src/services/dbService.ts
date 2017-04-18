import * as firebase from 'firebase';

export function fetchUserNotes(userId) {
    const database = firebase.database();
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

export function updateUserNote(userId, noteId, note) {
    const notesRef = firebase.database().ref('/user-notes/' + userId + '/' + noteId);
    return notesRef.update({
        title: note.title,
        text: note.text
    });
}