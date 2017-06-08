import * as constants from './constants'

import { addNote } from './actions'
import { editNote } from './actions'

import { forOwnRight } from 'lodash'

const initialState = {
  notes: [],
  foundUsers: []

  /*
    notes model:
      id,
      title,
      text,
      isInTrash,
      isArchived,
      googleDriveId
  */
}

export default function notesApp(state = initialState, action) {
  switch (action.type) {

    case constants.LOAD_NOTES_SUCCESS: {
      let notes = [];
      forOwnRight(action.notes, function(value, id) {
        notes.push((<any>Object).assign({}, value, {}));
      });
      return (<any>Object).assign({}, state, { 
        notes: notes
      })
    }

    case constants.ADD_NOTE: {
      return (<any>Object).assign({}, state, { 
        notes: [(<any>Object).assign({}, [], action.note),
        ...state.notes]
      })
    }

    case constants.EDIT_NOTE: {
      return (<any>Object).assign({}, state, { 
        notes: state.notes.map(note =>
        note.id === action.note.id
          ? (<any>Object).assign({}, note, {title: action.note.title, text: action.note.text}) : note
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

    case constants.DISCARD_NOTE: {
      return (<any>Object).assign({}, state, { 
        notes: state.notes.filter(note =>
         note.id !== action.id
        )
      })
    }

    case constants.SEARCH_USER_IN_FIREBASE_SUCCESS: {
      return (<any>Object).assign({}, state, { 
        foundUsers: action.users
      })
    }

    default:
      return state
  }
}