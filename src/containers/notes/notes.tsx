import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import NoteInput from '../../components/notes/note-input';
import NotesList from '../../components/notes/notes-list';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { addNote, editNote, moveNoteToTrash, uploadToGoogleDrive } from './actions';

interface INotesProps {
  notes: Array<any>,
  addNote(stirng, string): void,
  editNote(id, title, text): void,
  moveNoteToTrash(id): void
  uploadToGoogleDrive(title, text): void
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
              addNote={this.props.addNote.bind(this)}>
            </NoteInput>
          </div>
          <div className="col s12">
              <NotesList
                notes={ this.props.notes }
                editNote={this.props.editNote.bind(this)}
                moveNoteToTrash={this.props.moveNoteToTrash.bind(this)}
                uploadToGoogleDrive={this.props.uploadToGoogleDrive.bind(this)}>
              </NotesList>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    notes: state.notes.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      addNote: (title, note) => dispatch(addNote(title, note)),
      editNote: (id, title, note) => dispatch(editNote(id, title, note)),
      moveNoteToTrash: (id) => dispatch(moveNoteToTrash(id)),
      uploadToGoogleDrive: (title, text) => dispatch(uploadToGoogleDrive(title, text))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);