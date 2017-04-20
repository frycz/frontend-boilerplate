import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import * as onClickOutside from 'react-onclickoutside';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

interface INoteInputProps {
  addNote(note): void,
  saveNoteInFirebase(note): void
}

interface NoteInputState {
  note: any,
  showAddNote: boolean;
}

class NoteInput extends React.Component<INoteInputProps, NoteInputState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
          note: {
            title: '',
            text: ''
          },
          showAddNote: false
      };
  }

  componentWillReceiveProps(nextProps) {

  }

  handleClickOutside(e) {
    this.setState(merge({}, this.state, { note: { title: '', text: '' }, showAddNote: false }));
  }

  handleTextChange(e) {
    this.setState(merge({}, this.state,
      { note: merge({}, this.state.note, { text: e.target.value })}
    ));
  }

  handleTitleChange(e) {
    this.setState(merge({}, this.state,
      { note: merge({}, this.state.note, { title: e.target.value })}
    ));
  }

  onFocus() {
    this.setState(merge({}, this.state, { showAddNote: true }));
  }

  addNote() {
    if (this.state.note.text !== '') {
      this.props.saveNoteInFirebase(this.state.note);
      this.setState(merge({}, this.state, { note: { title: '', text: '' }, showAddNote: false }));
    }
  }

  public render() {
    return (
        <Card>
            <CardText>
            <TextField 
                hintText="Title" 
                id="note_input"
                ref="noteInput" 
                multiLine={false}
                fullWidth={true} 
                className={this.state.showAddNote ? '' : 'hidden'}
                value={this.state.note.title}
                onChange={this.handleTitleChange.bind(this)}
                style={{fontWeight: 'bold', fontSize: '18px'}}
            ></TextField>
            <TextField 
                hintText="Create note..." 
                id="note_input"
                ref="noteInput" 
                multiLine={true}
                fullWidth={true} 
                value={this.state.note.text}
                onFocus={this.onFocus.bind(this)}
                onChange={this.handleTextChange.bind(this)}
                style={{fontSize: '14px'}}
            ></TextField>
            </CardText>
            <CardActions className={this.state.showAddNote ? '' : 'hidden'}>
              <RaisedButton onClick={this.addNote.bind(this)} label="Add Note" primary={true}/>
            </CardActions>
        </Card>
    );
  }
}

export default onClickOutside(NoteInput);