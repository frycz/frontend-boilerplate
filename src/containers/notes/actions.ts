import { LOAD_NOTES_SUCCESS } from './constants'
import { ADD_NOTE } from './constants'
import { EDIT_NOTE } from './constants'
import { MOVE_NOTE_TO_TRASH } from './constants'
import { REMOVE_NOTE } from './constants'
import { UPLOAD_TO_GOOGLE_DRIVE } from './constants'
import { SAVE_NOTE_IN_FIREBASE } from './constants'
import { UPDATE_NOTE_IN_FIREBASE } from './constants'

export function loadNotesSuccess(notes) {
  return {
    type: LOAD_NOTES_SUCCESS,
    notes
  }
}

export function addNote(note) {
  return {
    type: ADD_NOTE,
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