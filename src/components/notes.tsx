import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { Input, Button } from 'react-materialize';

interface INotesProps {
  notes: Array<any>,
  onAddNote(string): void
}

interface NoteTextInputState {
  note: string;
}

class Notes extends React.Component<INotesProps, NoteTextInputState> {
  constructor(props, context) {
      super(props, context);
      console.log('props', props);
      this.state = {
          note: ''
      };
  }

  componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps nextProps', nextProps);
    }

  handleChange(e) {
    this.setState(merge({}, this.state, {note: e.target.value}));
  }

  addNote() {
    this.props.onAddNote(this.state.note);
  }

  public render() {
console.log('this.props.notes', this.props.notes);
    return (
        <div>
          <div className="row">
            <div className="input-field col s12">
              <textarea 
                placeholder="Create note..." 
                id="note_input" 
                className="materialize-textarea"
                value={this.state.note}
                onChange={this.handleChange.bind(this)}
              ></textarea>
            </div>
            <div className="col s12">
              <Button onClick={this.addNote.bind(this)}>Save</Button>
            </div>
            <div>
              <ul className="todo-list">
                {this.props.notes.map(note =>
                  <li key={note.id} >{ note.text }</li>
                )}
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Notes;
//export default connect()(Notes);