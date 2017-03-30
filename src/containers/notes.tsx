import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import NoteInput from '../components/notes/noteInput';
import NotesList from '../components/notes/notesList';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { addNote, editNote } from '../actions/notes';

interface INotesProps {
  notes: Array<any>,
  addNote(stirng, string): void
  editNote(number, stirng, string): void
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
    console.log('this.props.notes', this.props.notes);
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
                editNote={this.props.editNote.bind(this)}>
              </NotesList>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    notes: state.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      addNote: (title, note) => dispatch(addNote(title, note)),
      editNote: (id, title, note) => dispatch(editNote(id, title, note))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);