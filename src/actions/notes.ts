import { ADD_NOTE } from '../constants/actions'
import { EDIT_NOTE } from '../constants/actions'

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