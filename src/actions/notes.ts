import { ADD_NOTE } from '../constants/actions'

export function addNote(note) {
  return {
    type: ADD_NOTE,
    note
  }
}