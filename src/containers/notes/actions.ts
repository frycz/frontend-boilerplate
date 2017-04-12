import { ADD_NOTE } from './constants'
import { EDIT_NOTE } from './constants'
import { MOVE_NOTE_TO_TRASH } from './constants'
import { REMOVE_NOTE } from './constants'
import { UPLOAD_TO_GOOGLE_DRIVE } from './constants'

export function addNote(title, text) {
  return {
    type: ADD_NOTE,
    title,
    text
  }
}

export function editNote(id, title, text) {
  return {
    type: EDIT_NOTE,
    id,
    title,
    text
  }
}

export function moveNoteToTrash(id) {
  return {
    type: MOVE_NOTE_TO_TRASH,
    id
  }
}

export function uploadToGoogleDrive(title, text) {
  return {
    type: UPLOAD_TO_GOOGLE_DRIVE,
    title,
    text
  }
}