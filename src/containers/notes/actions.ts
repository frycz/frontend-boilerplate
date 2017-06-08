import { LOAD_NOTES_SUCCESS } from './constants'
import { ADD_NOTE } from './constants'
import { EDIT_NOTE } from './constants'
import { MOVE_NOTE_TO_TRASH } from './constants'
import { DISCARD_NOTE } from './constants'
import { UPLOAD_TO_GOOGLE_DRIVE } from './constants'
import { SAVE_NOTE_IN_FIREBASE } from './constants'
import { UPDATE_NOTE_IN_FIREBASE } from './constants'
import { MOVE_NOTE_TO_TRASH_IN_FIREBASE } from './constants'
import { DISCARD_NOTE_IN_FIREBASE } from './constants'
import { SEARCH_USER_IN_FIREBASE } from './constants'
import { SEARCH_USER_IN_FIREBASE_SUCCESS } from './constants'
import { UPDATE_USER_NOTE_COLLABORATORS } from './constants'

export function loadNotesSuccess(notes) {
  return {
    type: LOAD_NOTES_SUCCESS,
    notes
  }
}

export function addNote(userId, note) {
  return {
    type: ADD_NOTE,
    userId,
    note
  }
}

export function editNote(note) {
  return {
    type: EDIT_NOTE,
    note
  }
}

export function moveNoteToTrash(id) {
  return {
    type: MOVE_NOTE_TO_TRASH,
    id
  }
}

export function discardNote(id) {
  return {
    type: DISCARD_NOTE,
    id
  }
}

export function uploadToGoogleDrive(note) {
  return {
    type: UPLOAD_TO_GOOGLE_DRIVE,
    note
  }
}

export function saveNoteInFirebase(userId, note) {
  return {
    type: SAVE_NOTE_IN_FIREBASE,
    userId,
    note
  }
}

export function updateNoteInFirebase(userId, note) {
  return {
    type: UPDATE_NOTE_IN_FIREBASE,
    userId,
    note
  }
}

export function moveNoteToTrashInFirebase(userId, noteId) {
  return {
    type: MOVE_NOTE_TO_TRASH_IN_FIREBASE,
    userId,
    noteId
  }
}

export function discardNoteInFirebase(userId, noteId) {
  return {
    type: DISCARD_NOTE_IN_FIREBASE,
    userId,
    noteId
  }
}

export function searchUserInFirebase(searchText) {
  return {
    type: SEARCH_USER_IN_FIREBASE,
    searchText
  }
}

export function searchUserInFirebaseSuccess(users) {
  return {
    type: SEARCH_USER_IN_FIREBASE_SUCCESS,
    users
  }
}

export function updateUserNoteCollaborators(note, collaborators, usersToShareNote, usersToRemoveNote) {
  return {
    type: UPDATE_USER_NOTE_COLLABORATORS,
    note,
    collaborators,
    usersToShareNote,
    usersToRemoveNote
  }
}