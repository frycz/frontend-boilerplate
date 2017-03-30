import * as constants from '../constants/actions'

import { addNote } from '../actions/notes'
import { editNote } from '../actions/notes'

const initialState = {
  notes: []
}

export default function notesApp(state = initialState, action) {
  switch (action.type) {

    case constants.ADD_NOTE: {
      return (<any>Object).assign({}, state, { 
        notes: [(<any>Object).assign({}, [], {
          id: state.notes.reduce((maxId, note) => Math.max(note.id, maxId), -1) + 1,
          title: action.title,
          text: action.text,
        }),
        ...state.notes]
      })
    }

    case constants.EDIT_NOTE: {
      return (<any>Object).assign({}, state, { 
        notes: state.notes.map(note =>
        note.id === action.id
          ? (<any>Object).assign({}, note, {title: action.title, text: action.text}) : note
        )
      })
    }

    default:
      return state
  }
}