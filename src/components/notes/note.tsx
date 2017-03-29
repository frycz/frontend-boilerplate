import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

interface INoteProps {
    note: any
}

interface NoteState {
    showActionButtons: boolean,
    isEdited: false
}

class NotesList extends React.Component<INoteProps, NoteState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        showActionButtons: false,
        isEdited: false,
      };
  }

  onNoteHover() {
    this.setState(merge({}, this.state, { showActionButtons: true }));
  }

  onNoteLeave() {
    this.setState(merge({}, this.state, { showActionButtons: false }));
  }

  handleNoteChange(e) {
    this.setState(merge({}, this.state, { text: e.target.value }));
  }

  handleTitleChange(e) {
    this.setState(merge({}, this.state, { title: e.target.value }));
  }

  editNote() {
    /*if (this.state.text !== '') {
      this.props.addNote(this.state.title, this.state.text);
      this.setState(merge({}, this.state, {title: '', text: '', showAddNote: false}));
    }*/
  }

  public render() {
    return (
        <div>
            <Card 
                className={this.state.isEdited ? 'hidden' : ''}
                style={{margin: '20px 0'}}
                onMouseEnter={this.onNoteHover.bind(this)}
                onMouseLeave={this.onNoteLeave.bind(this)}>
                <CardTitle
                    title={this.props.note.title}
                    className={this.props.note.title ? '' : 'hidden'}
                />
                <CardText>
                    { this.props.note.text }
                </CardText>
                <CardActions style={{ minHeight: '36px' }}>
                    <FlatButton label="Action1" className={this.state.showActionButtons ? '' : 'hidden'}/>
                    <FlatButton label="Action2" className={this.state.showActionButtons ? '' : 'hidden'}/>
                </CardActions>
            </Card>

            <Card
                className={this.state.isEdited ? '' : 'hidden'}>
                <CardText>
                <TextField 
                    hintText="Title" 
                    multiLine={false}
                    fullWidth={true} 
                    value={this.props.note.title}
                    onChange={this.handleTitleChange.bind(this)}
                ></TextField>
                <TextField 
                    hintText="Create note..." 
                    id="note_input"
                    ref="noteInput" 
                    multiLine={true}
                    fullWidth={true} 
                    value={this.props.note.text}
                    onChange={this.handleNoteChange.bind(this)}
                ></TextField>
                </CardText>
                <CardActions>
                <FlatButton onClick={this.editNote.bind(this)} label="Save Note" primary={true}/>
                </CardActions>
            </Card>
        </div>
    );
  }
}

export default NotesList;