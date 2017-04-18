import * as firebase from 'firebase';

export function fetchUserNotes() {
    const database = firebase.database();
}

export function saveUserNote(userId, note) {
    const notesRef = firebase.database().ref('/user-notes/' + userId);
    const newNoteRef = notesRef.push();
    return newNoteRef.set({
        title: note.title,
        text: note.text
    });
}