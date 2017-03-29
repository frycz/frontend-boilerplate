import { ADD_NOTE } from '../constants/actions'

export function addNote(title, note) {
  return {
    type: ADD_NOTE,
    title,
    note
  }
}