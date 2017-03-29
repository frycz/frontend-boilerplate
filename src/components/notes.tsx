import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import * as onClickOutside from 'react-onclickoutside';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

interface INotesProps {
  notes: Array<any>,
  onAddNote(string): void
}

interface NoteTextInputState {
  note: string;
  showAddNote: boolean;
}

class Notes extends React.Component<INotesProps, NoteTextInputState> {
  constructor(props, context) {
      super(props, context);
      console.log('props', props);
      this.state = {
          note: '',
          showAddNote: false
      };
  }

  componentWillReceiveProps(nextProps) {

  }

  handleClickOutside(e) {
    this.setState(merge({}, this.state, {showAddNote: false}));
  }

  handleChange(e) {
    this.setState(merge({}, this.state, {note: e.target.value}));
  }

  onFocus() {
    this.setState(merge({}, this.state, {showAddNote: true}));
  }

  addNote() {
    if (this.state.note !== '') {
      this.props.onAddNote(this.state.note);
      this.setState(merge({}, this.state, {note: '', showAddNote: false}));
    }
  }

  public render() {
    console.log('this.props.notes', this.props.notes);
    const style = {
      'maxWidth': '650px',
      'margin': '0 auto'
    }
    return (
      <div 
        
        style={style}>
        <div className="row">
          <div style={{padding: '40px 0'}} className="input-field col s12">

            <Card>
              <CardText>
                <TextField 
                  placeholder="Create note..." 
                  id="note_input"
                  multiLine={true}
                  fullWidth={true} 
                  value={this.state.note}
                  onFocus={this.onFocus.bind(this)}
                  onChange={this.handleChange.bind(this)}
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
                style={{margin: '20px 0'}}>
                  <CardText style={{'paddingBottom': '8px'}}>
                    { note.text }
                  </CardText>
                </Card>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(Notes);