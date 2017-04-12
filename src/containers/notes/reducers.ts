import * as constants from './constants'

import { addNote } from './actions'
import { editNote } from './actions'

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
          isInTrash: false
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

    case constants.MOVE_NOTE_TO_TRASH: {
      return (<any>Object).assign({}, state, { 
        notes: state.notes.map(note =>
        note.id === action.id
          ? (<any>Object).assign({}, note, {isInTrash: true}) : note
        )
      })
    }

    default:
      return state
  }
}