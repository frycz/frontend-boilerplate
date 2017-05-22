import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import * as classNames from 'classnames';

import * as onClickOutside from 'react-onclickoutside';

import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { grey600 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload';

interface INoteProps {
    note: any,
    editNote(note): void,
    uploadToGoogleDrive(note): void,
    updateNoteInFirebase(note): void,
    //moveNoteToTrashInFirebase(id): void,
    openRemoveDialog(id): void
}

interface NoteState {
    note: any,
    showActionButtons: boolean,
    isEdited: false
}

class Note extends React.Component<INoteProps, NoteState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        note: {
            id: null,
            title: '',
            text: '',
            isInTrash: false
        },
        showActionButtons: false,
        isEdited: false,
      };
  }

  componentDidMount() {
      this.setState(merge({}, this.state, { note: this.props.note }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(merge({}, this.state, { note: nextProps.note, isEdited: false }));
  }

  handleClickOutside(e) {
    if(this.state.isEdited) { 
        this.editNote(this.state.note);
        this.setState(merge({}, this.state, { isEdited: false }));
    }
  }

  onNoteHover() {
    this.setState(merge({}, this.state, { showActionButtons: true }));
  }

  onNoteLeave() {
    this.setState(merge({}, this.state, { showActionButtons: false }));
  }

  handleEdit(e) {
    e.stopPropagation();
    if(!this.state.isEdited) { 
    this.setState(merge({}, this.state, { isEdited: true }));
    }
  }

  handleMoveToTrash(e) {
    e.stopPropagation();
    //this.props.moveNoteToTrashInFirebase(this.props.note.id);
    this.props.openRemoveDialog(this.props.note.id);
  }

  handleUploadToGoogleDrive(e) {
    e.stopPropagation();
    this.props.uploadToGoogleDrive(this.state.note);
  }

  handleTitleChange(e) {
    this.setState(merge({}, this.state, 
        { note: merge({}, this.state.note, { title: e.target.value.replace(/\n/g, '<br/>') }) }
    ));
  }

  handleTextChange(e) {
    this.setState(merge({}, this.state,
        { note: merge({}, this.state.note, { text: e.target.value.replace(/\n/g, '<br/>') }) }
    ));
  }

  editNote(e) {
    this.props.updateNoteInFirebase(this.state.note);
  }

  public render() {

    const viewClasses = classNames({hidden: this.state.isEdited}, {hovered: this.state.showActionButtons});
    const editClasses = classNames({hidden: !this.state.isEdited}, 'hovered');
    const buttonClass = this.state.showActionButtons ? '' : 'invisible';
    const iconStyle = {width: 18, height: 18, color: grey600};
    const buttonStyle = {width: 36, height: 36, padding: 0};
    const titleClasses = classNames({
        "wordwrap": true,
        "hidden": !this.state.note.title
    })
    return (
        <div>
            <Card 
                className={viewClasses}
                style={{margin: '20px 0'}}
                onMouseEnter={this.onNoteHover.bind(this)}
                onMouseLeave={this.onNoteLeave.bind(this)}
                onClick={this.handleEdit.bind(this)}>
                <CardTitle
                    title={<div dangerouslySetInnerHTML={{__html: this.state.note.title}} />}
                    className={titleClasses}
                    titleStyle={{fontWeight: 'bold', fontSize: '18px'}}
                />
                <CardText className={'wordwrap'}>
                    { <div dangerouslySetInnerHTML={{__html: this.state.note.text}} /> }
                </CardText>
                <CardActions style={{ minHeight: '36px'}}>
                    {/*
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle} 
                        className={buttonClass}
                        tooltip="Add to favorite">
                        <StarIcon />
                    </IconButton> */}
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle} 
                        className={buttonClass}
                        onClick={this.handleEdit.bind(this)}
                        tooltip="Edit">
                        <ModeEditIcon />
                    </IconButton>
                    {/*
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={buttonClass}
                        tooltip="Copy">
                        <CopyIcon />
                    </IconButton>
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={buttonClass}
                        tooltip="Archive">
                        <ArchiveIcon />
                    </IconButton>
                    */}
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={buttonClass}
                        onClick={this.handleMoveToTrash.bind(this)}
                        /*tooltip="Move to trash">*/
                        tooltip="Remove">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={buttonClass}
                        onClick={this.handleUploadToGoogleDrive.bind(this)}
                        tooltip="Upload to Google Drive">
                        <CloudUploadIcon />
                    </IconButton>
                </CardActions>
            </Card>

            <Card
                className={editClasses}
                style={{margin: '20px 0'}}>
                <CardText>
                <TextField 
                    hintText="Title" 
                    multiLine={true}
                    fullWidth={true} 
                    rowsMax={10}
                    value={this.state.note.title.replace(/<br\/>/g, '\n')}
                    onChange={this.handleTitleChange.bind(this)}
                    style={{fontWeight: 'bold', fontSize: '18px'}}
                ></TextField>
                <TextField 
                    hintText="Create note..." 
                    multiLine={true}
                    fullWidth={true} 
                    rowsMax={10}
                    value={this.state.note.text.replace(/<br\/>/g, '\n')}
                    onChange={this.handleTextChange.bind(this)}
                    style={{fontSize: '14px'}}
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

export default onClickOutside(Note);