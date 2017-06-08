import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import NoteInput from '../../components/notes/note-input';
import NotesList from '../../components/notes/notes-list';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { 
  editNote,
  uploadToGoogleDrive,
  saveNoteInFirebase,
  updateNoteInFirebase,
  moveNoteToTrashInFirebase,
  discardNoteInFirebase,
  searchUserInFirebase,
  updateUserNoteCollaborators
 } from './actions';

interface INotesProps {
  notes: Array<any>,
  user: any,
  foundUsers: Array<any>,
  editNote(note): void,
  uploadToGoogleDrive(note): void,
  saveNoteInFirebase(userId, note): void,
  updateNoteInFirebase(userId, note): void,
  moveNoteToTrashInFirebase(userId, noteId): void
  discardNoteInFirebase(userId, noteId): void
  searchUserInFirebase(searchText): void
}

interface NoteState {

}

class Notes extends React.Component<INotesProps, NoteState> {
  constructor(props, context) {
      super(props, context);
      this.state = {

      };
  }

  componentWillReceiveProps(nextProps) {

  }

  saveNoteInFirebase(note) {
    const fullNote = Object.assign({},note, {
      isInTrash: false,
      isShared: false,
      ownerId: this.props.user.user.uid,
      createdAt: (new Date()).toString()
    })
    this.props.saveNoteInFirebase(this.props.user.user.uid, fullNote);
  }

  updateNoteInFirebase(note) {
    this.props.updateNoteInFirebase(this.props.user.user.uid, note);
  }

  moveNoteToTrashInFirebase(noteId) {
    this.props.moveNoteToTrashInFirebase(this.props.user.user.uid, noteId);
  }

  discardNoteInFirebase(noteId) {
    this.props.discardNoteInFirebase(this.props.user.user.uid, noteId);
  }

  public render() {
    const style = {
      'maxWidth': '650px',
      'margin': '0 auto',
      'padding': '0 10px'
    }
    return (
      <div 
        style={style}>
        <div className="row">
          <div style={{padding: '40px 0'}} className="input-field col s12">
            <NoteInput
              saveNoteInFirebase={this.saveNoteInFirebase.bind(this)}>
            </NoteInput>
          </div>
          <div className="col s12">
              <NotesList
                notes={ this.props.notes }
                user={ this.props.user }
                foundUsers={ this.props.foundUsers }
                editNote={this.props.editNote.bind(this)}
                uploadToGoogleDrive={this.props.uploadToGoogleDrive.bind(this)}
                updateNoteInFirebase={this.updateNoteInFirebase.bind(this)}
                moveNoteToTrashInFirebase={this.moveNoteToTrashInFirebase.bind(this)}
                discardNoteInFirebase={this.discardNoteInFirebase.bind(this)}
                searchUserInFirebase={this.props.searchUserInFirebase.bind(this)}
                updateUserNoteCollaborators={this.props.updateUserNoteCollaborators.bind(this)}
                >
              </NotesList>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    notes: state.notes.notes,
    foundUsers: state.notes.foundUsers,
    user: state.login.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      editNote: (note) => dispatch(editNote(note)),
      uploadToGoogleDrive: (note) => dispatch(uploadToGoogleDrive(note)),
      saveNoteInFirebase: (userId, note) => dispatch(saveNoteInFirebase(userId, note)),
      updateNoteInFirebase: (userId, note) => dispatch(updateNoteInFirebase(userId, note)),
      moveNoteToTrashInFirebase: (userId, noteId) => dispatch(moveNoteToTrashInFirebase(userId, noteId)),
      discardNoteInFirebase: (userId, noteId) => dispatch(discardNoteInFirebase(userId, noteId)),
      searchUserInFirebase: (searchText) => dispatch(searchUserInFirebase(searchText))
      updateUserNoteCollaborators: (note, collaborators, usersToShareNote, usersToRemoveNote) => dispatch(updateUserNoteCollaborators(note, collaborators, usersToShareNote, usersToRemoveNote))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);