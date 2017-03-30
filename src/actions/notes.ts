import { ADD_NOTE } from '../constants/actions'
import { EDIT_NOTE } from '../constants/actions'
import { MOVE_NOTE_TO_TRASH } from '../constants/actions'
import { REMOVE_NOTE } from '../constants/actions'

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