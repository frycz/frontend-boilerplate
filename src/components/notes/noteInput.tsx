import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import * as onClickOutside from 'react-onclickoutside';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

interface INoteInputProps {
  addNote(stirng, string): void
}

interface NoteInputState {
  title: string;
  text: string;
  showAddNote: boolean;
}

class NoteInput extends React.Component<INoteInputProps, NoteInputState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
          title: '',
          text: '',
          showAddNote: false
      };
  }

  componentWillReceiveProps(nextProps) {

  }

  handleClickOutside(e) {
    this.setState(merge({}, this.state, { title: '', text: '', showAddNote: false }));
  }

  handleNoteChange(e) {
    this.setState(merge({}, this.state, { text: e.target.value }));
  }

  handleTitleChange(e) {
    this.setState(merge({}, this.state, { title: e.target.value }));
  }

  onFocus() {
    this.setState(merge({}, this.state, { showAddNote: true }));
  }

  addNote() {
    if (this.state.text !== '') {
      this.props.addNote(this.state.title, this.state.text);
      this.setState(merge({}, this.state, {title: '', text: '', showAddNote: false}));
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
                value={this.state.title}
                onChange={this.handleTitleChange.bind(this)}
            ></TextField>
            <TextField 
                hintText="Create note..." 
                id="note_input"
                ref="noteInput" 
                multiLine={true}
                fullWidth={true} 
                value={this.state.text}
                onFocus={this.onFocus.bind(this)}
                onChange={this.handleNoteChange.bind(this)}
            ></TextField>
            </CardText>
            <CardActions className={this.state.showAddNote ? '' : 'hidden'}>
            <FlatButton onClick={this.addNote.bind(this)} label="Add Note" primary={true}/>
            </CardActions>
        </Card>
    );
  }
}

export default onClickOutside(NoteInput);