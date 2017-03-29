import { ADD_NOTE } from '../constants/actions'

export function addNote(title, text) {
  return {
    type: ADD_NOTE,
    title,
    text
  }
}