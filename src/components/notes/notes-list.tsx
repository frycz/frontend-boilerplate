import * as React from 'react';
import { merge } from 'lodash';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Note from './note';

interface INotesListProps {
    notes: Array<any>,
    editNote(id, note): void,
    uploadToGoogleDrive(note): void,
    updateNoteInFirebase(note): void,
    moveNoteToTrashInFirebase(id): void
    discardNoteInFirebase(id): void
}

interface NotesListState {
    isRemoveDialogOpen: boolean,
    noteToRemoveId: number
}

class NotesList extends React.Component<INotesListProps, NotesListState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        isRemoveDialogOpen: false,
        noteToRemoveId: null
      };
  }

  openRemoveDialog = (noteId) => {
    this.setState({
        isRemoveDialogOpen: true,
        noteToRemoveId: noteId
    });
  };

  closeRemoveDialog() {
      this.setState({
        isRemoveDialogOpen: false,
        noteToRemoveId: null});
  }

  removeNote() {
    this.props.moveNoteToTrashInFirebase(this.state.noteToRemoveId);
    this.closeRemoveDialog();
  }

  public render() {
    const removeDialogActions = [
      <RaisedButton
        label="Cancel"
        keyboardFocused={true}
        onTouchTap={this.closeRemoveDialog.bind(this)}
      />,
      <RaisedButton
        label="Remove"
        primary={true}
        onTouchTap={this.removeNote.bind(this)}
      />,
    ];

    return (
        <div>
            {this.props.notes.filter(note => !note.isInTrash).map(note =>
                <Note
                    key={ note.id }
                    note={ note }
                    editNote={ this.props.editNote }
                    uploadToGoogleDrive={ this.props.uploadToGoogleDrive }
                    updateNoteInFirebase={ this.props.updateNoteInFirebase }
                    discardNoteInFirebase={this.props.discardNoteInFirebase}
                    openRemoveDialog={this.openRemoveDialog.bind(this)}>
                </Note>
            )}

            <Dialog
                title="Remove note"
                actions={removeDialogActions}
                modal={true}
                open={this.state.isRemoveDialogOpen}
                contentStyle={{maxWidth: '650px'}}
                >
                Are you sure you want to remove this note?
            </Dialog>
        </div>
    );
  }
}

export default NotesList;