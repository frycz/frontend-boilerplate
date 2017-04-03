import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import * as classNames from 'classnames';

import * as onClickOutside from 'react-onclickoutside';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

interface INoteProps {
    note: any,
    editNote(id, title, text): void
    moveNoteToTrash(id): void
}

interface NoteState {
    title: string,
    text: string,
    showActionButtons: boolean,
    isEdited: false
}

class NotesList extends React.Component<INoteProps, NoteState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        title: '',
        text: '',
        showActionButtons: false,
        isEdited: false,
      };
  }

  componentDidMount() {
      this.setState(merge({}, this.state, { title: this.props.note.title, text: this.props.note.text }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(merge({}, this.state, { isEdited: false, title: nextProps.note.title, text: nextProps.note.text }));
  }

  handleClickOutside(e) {
    this.props.editNote(this.props.note.id, this.state.title, this.state.text);
    this.setState(merge({}, this.state, { isEdited: false }));
  }

  onNoteHover() {
    this.setState(merge({}, this.state, { showActionButtons: true }));
  }

  onNoteLeave() {
    this.setState(merge({}, this.state, { showActionButtons: false }));
  }

  handleEdit() {
    if(!this.state.isEdited) { 
    this.setState(merge({}, this.state, { isEdited: true }));
    }
  }

  handleMoveToTrash(e) {
    e.stopPropagation();
    this.props.moveNoteToTrash(this.props.note.id);
  }

  handleTitleChange(e) {
    this.setState(merge({}, this.state, { title: e.target.value }));
  }

  handleTextChange(e) {
    this.setState(merge({}, this.state, { text: e.target.value }));
    this.props.note.text = e.target.value;
  }

  editNote(e) {
    this.props.editNote(this.props.note.id, this.state.title, this.state.text);
  }

  public render() {

    const viewClasses = classNames({hidden: this.state.isEdited}, {hovered: this.state.showActionButtons});
    const editClasses = classNames({hidden: !this.state.isEdited}, 'hovered');
    return (
        <div>
            <Card 
                className={viewClasses}
                style={{margin: '20px 0'}}
                onMouseEnter={this.onNoteHover.bind(this)}
                onMouseLeave={this.onNoteLeave.bind(this)}
                onClick={this.handleEdit.bind(this)}>
                <CardTitle
                    title={this.state.title}
                    className={this.state.title ? '' : 'hidden'}
                    titleStyle={{fontWeight: 'bold', fontSize: '18px'}}
                />
                <CardText>
                    { this.state.text }
                </CardText>
                <CardActions style={{ minHeight: '36px' }}>
                    <FlatButton 
                        primary={true}
                        label="Edit" 
                        className={this.state.showActionButtons ? '' : 'hidden'}/>
                    <FlatButton 
                        label="Move to trash" 
                        className={this.state.showActionButtons ? '' : 'hidden'}
                        onClick={this.handleMoveToTrash.bind(this)} />
                </CardActions>
            </Card>

            <Card
                className={editClasses}
                style={{margin: '20px 0'}}>
                <CardText>
                <TextField 
                    hintText="Title" 
                    multiLine={false}
                    fullWidth={true} 
                    value={this.state.title}
                    onChange={this.handleTitleChange.bind(this)}
                ></TextField>
                <TextField 
                    hintText="Create note..." 
                    multiLine={true}
                    fullWidth={true} 
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
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

export default onClickOutside(NotesList);