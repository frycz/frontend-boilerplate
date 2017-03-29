import * as constants from '../constants/actions'

import { addNote } from '../actions/notes'

const initialState = {
  notes: []
}

export default function notesApp(state = initialState, action) {
  switch (action.type) {

    case constants.ADD_NOTE: {
      console.log('reducer ok');
      console.log('action.note', action.note);
      const newState = (<any>Object).assign({}, state, { 
        notes: [(<any>Object).assign({}, [], {
          id: state.notes.reduce((maxId, note) => Math.max(note.id, maxId), -1) + 1,
          title: action.title,
          text: action.note,
        }),
        ...state.notes]
      })
      console.log('newState', newState);
      return newState;
    }

    default:
      return state
  }
}