import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import onClickOutside from 'react-onclickoutside';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { preventEnterDefault } from '../../helpers/form';

interface INoteInputProps {
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
      { note: merge({}, this.state.note, { text: e.target.value.replace(/\n/g, '<br/>') })}
    ));
  }

  handleTitleChange(e) {
    this.setState(merge({}, this.state,
      { note: merge({}, this.state.note, { title: e.target.value.replace(/\n/g, '<br/>') })}
    ));
  }

  onFocus() {
    this.setState(merge({}, this.state, { showAddNote: true }));
  }

  addNote() {
    if (this.state.note.title !== '' || this.state.note.text !== '') {
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
                multiLine={true}
                fullWidth={true} 
                rowsMax={10}
                className={this.state.showAddNote ? '' : 'hidden'}
                value={this.state.note.title.replace(/<br\/>/g, '\n')}
                onChange={this.handleTitleChange.bind(this)}
                onKeyPress={preventEnterDefault}
                style={{fontWeight: 'bold', fontSize: '18px'}}
            ></TextField>
            <TextField 
                hintText="Create note..." 
                multiLine={true}
                fullWidth={true} 
                rowsMax={10}
                value={this.state.note.text.replace(/<br\/>/g, '\n')}
                onFocus={this.onFocus.bind(this)}
                onChange={this.handleTextChange.bind(this)}
                style={{fontSize: '14px'}}
            ></TextField>
            </CardText>
            <CardActions className={this.state.showAddNote ? '' : 'hidden'}>
              <RaisedButton onClick={this.addNote.bind(this)} label="Done" primary={true}/>
            </CardActions>
        </Card>
    );
  }
}

export default onClickOutside(NoteInput);