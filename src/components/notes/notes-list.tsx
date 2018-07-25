import * as React from 'react';
import { merge } from 'lodash';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Note from './note';
import ShareDialog from './share-dialog';

interface INotesListProps {
    notes: Array<any>,
    user: any,
    foundUsers: Array<any>,
    editNote(id, note): void,
    uploadToGoogleDrive(note): void,
    updateNoteInFirebase(note): void,
    moveNoteToTrashInFirebase(id): void
    discardNoteInFirebase(id): void
    searchUserInFirebase(searchText): void
    updateUserNoteCollaborators(note, collaborators, usersToShareNote, usersToRemoveNote): void
}

interface NotesListState {
    isRemoveDialogOpen: boolean,
    isShareDialogOpen: boolean,
    noteToRemoveId: number,
    noteToShare: any,
}

class NotesList extends React.Component<INotesListProps, NotesListState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        isRemoveDialogOpen: false,
        isShareDialogOpen: false,
        noteToRemoveId: null,
        noteToShare: null,
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

  openShareDialog = (note) => {
    this.setState({
        isShareDialogOpen: true,
        noteToShare: note
    });
  };

  closeShareDialog() {
      this.setState({
        isShareDialogOpen: false,
        noteToShare: null});
  }

  shareNote(note, collaborators, usersToShareNote, usersToRemoveNote) {
      this.props.updateUserNoteCollaborators(note, collaborators, usersToShareNote, usersToRemoveNote);
      this.closeShareDialog();
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
                    user={ this.props.user }
                    editNote={ this.props.editNote }
                    uploadToGoogleDrive={ this.props.uploadToGoogleDrive }
                    updateNoteInFirebase={ this.props.updateNoteInFirebase }
                    discardNoteInFirebase={this.props.discardNoteInFirebase}
                    openRemoveDialog={this.openRemoveDialog.bind(this)}
                    openShareDialog={this.openShareDialog.bind(this)}>
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
            {this.state.isShareDialogOpen ? <ShareDialog
                open={true}
                note={this.state.noteToShare}
                handleClose={this.closeShareDialog.bind(this)}
                handleShare={this.shareNote.bind(this)}
                searchUser={this.props.searchUserInFirebase.bind(this)}
                foundUsers={this.props.foundUsers}
                actualCollaborators={this.state.noteToShare ? this.state.noteToShare.collaborators : null}
            /> : null}
        </div>
    );
  }
}

export default NotesList;