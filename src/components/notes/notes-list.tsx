import * as React from 'react';
import { merge } from 'lodash';

import Note from './note';

interface INotesListProps {
    notes: Array<any>,
    editNote(id, note): void,
    moveNoteToTrash(id): void,
    uploadToGoogleDrive(note): void,
    updateNoteInFirebase(note): void
}

interface NotesListState {

}

class NotesList extends React.Component<INotesListProps, NotesListState> {
  constructor(props, context) {
      super(props, context);
      this.state = {

      };
  }

  public render() {
    return (
        <div>
            {this.props.notes.filter(note => note.isInTrash == false).map(note =>
                <Note
                    key={ note.id }
                    note={ note }
                    editNote={ this.props.editNote }
                    moveNoteToTrash={ this.props.moveNoteToTrash }
                    uploadToGoogleDrive={ this.props.uploadToGoogleDrive }
                    updateNoteInFirebase={ this.props.updateNoteInFirebase }>
                </Note>
            )}
        </div>
    );
  }
}

export default NotesList;