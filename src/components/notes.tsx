import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import * as onClickOutside from 'react-onclickoutside';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

interface INotesProps {
  notes: Array<any>,
  onAddNote(stirng, string): void
}

interface NoteTextInputState {
  title: string;
  note: string;
  showAddNote: boolean;
}

class Notes extends React.Component<INotesProps, NoteTextInputState> {
  constructor(props, context) {
      super(props, context);
      console.log('props', props);
      this.state = {
          title: '',
          note: '',
          showAddNote: false
      };
  }

  componentWillReceiveProps(nextProps) {

  }

  handleClickOutside(e) {
    this.setState(merge({}, this.state, {showAddNote: false}));
  }

  handleNoteChange(e) {
    this.setState(merge({}, this.state, {note: e.target.value}));
  }

  handleTitleChange(e) {
    this.setState(merge({}, this.state, {title: e.target.value}));
  }

  onFocus() {
    this.setState(merge({}, this.state, {showAddNote: true}));
  }

  onNoteHover() {
    console.log('note hover');
  }

  onNoteLeave() {
    console.log('note leave');
  }

  addNote() {
    if (this.state.note !== '') {
      this.props.onAddNote(this.state.title, this.state.note);
      this.setState(merge({}, this.state, {title: '', note: '', showAddNote: false}));
    }
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
                  value={this.state.note}
                  onFocus={this.onFocus.bind(this)}
                  onChange={this.handleNoteChange.bind(this)}
                ></TextField>
              </CardText>
              <CardActions className={this.state.showAddNote ? '' : 'hidden'}>
                <FlatButton onClick={this.addNote.bind(this)} label="Add Note" primary={true}/>
              </CardActions>
            </Card>
          </div>
          <div className="col s12">
              {this.props.notes.map(note =>
                <Card 
                  key={note.id}
                  style={{margin: '20px 0'}}
                  onMouseEnter={this.onNoteHover.bind(this)}
                  onMouseLeave={this.onNoteLeave.bind(this)}>
                  <CardTitle
                    title={note.title}
                    className={note.title ? '' : 'hidden'}
                  />
                  <CardText>
                    { note.text }
                  </CardText>
                  <CardActions
                    className={'test'}>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                  </CardActions>
                </Card>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(Notes);