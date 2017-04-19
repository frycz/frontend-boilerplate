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
  addNote,
  editNote,
  moveNoteToTrash,
  uploadToGoogleDrive,
  saveNoteInFirebase,
  updateNoteInFirebase
 } from './actions';

interface INotesProps {
  notes: Array<any>,
  userId: Array<any>,
  addNote(note): void,
  editNote(note): void,
  moveNoteToTrash(id): void,
  uploadToGoogleDrive(note): void,
  saveNoteInFirebase(userId, note): void,
  updateNoteInFirebase(userId, note): void
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
    this.props.saveNoteInFirebase(this.props.userId, note);
  }

  updateNoteInFirebase(noteId, note) {
    this.props.updateNoteInFirebase(this.props.userId, note);
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
              addNote={this.props.addNote.bind(this)}
              saveNoteInFirebase={this.saveNoteInFirebase.bind(this)}>
            </NoteInput>
          </div>
          <div className="col s12">
              <NotesList
                notes={ this.props.notes }
                editNote={this.props.editNote.bind(this)}
                moveNoteToTrash={this.props.moveNoteToTrash.bind(this)}
                uploadToGoogleDrive={this.props.uploadToGoogleDrive.bind(this)}
                updateNoteInFirebase={this.updateNoteInFirebase.bind(this)}>
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
    userId: state.login.user.user.uid
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      addNote: (note) => dispatch(addNote(note)),
      editNote: (note) => dispatch(editNote(note)),
      moveNoteToTrash: (id) => dispatch(moveNoteToTrash(id)),
      uploadToGoogleDrive: (note) => dispatch(uploadToGoogleDrive(note)),
      saveNoteInFirebase: (userId, note) => dispatch(saveNoteInFirebase(userId, note)),
      updateNoteInFirebase: (userId, note) => dispatch(updateNoteInFirebase(userId, note))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);