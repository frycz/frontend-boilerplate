import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import * as classNames from 'classnames';

import * as onClickOutside from 'react-onclickoutside';

import * as ContentEditable from 'react-contenteditable'
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
import ShareIcon from 'material-ui/svg-icons/social/share';

import { preventEnterDefault } from '../../helpers/form';

interface INoteProps {
    note: any,
    user: any,
    editNote(note): void,
    uploadToGoogleDrive(note): void,
    updateNoteInFirebase(note): void,
    discardNoteInFirebase(id): void,
    openRemoveDialog(id): void
    openShareDialog(id): void
}

interface NoteState {
    note: any,
    showActionButtons: boolean,
    isEdited: boolean
}

class Note extends React.Component<INoteProps, NoteState> {
  scrollableNote: any;
  textInput: any;
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
        const noteDom = ReactDOM.findDOMNode(this.scrollableNote);
        if (noteDom) {
            noteDom.scrollTop = 0;
            this.setState(merge({}, this.state, { isEdited: false }));
        }
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
    this.props.openRemoveDialog(this.props.note.id);
  }

  handleShareNote(e) {
    e.stopPropagation();
    this.props.openShareDialog(this.props.note);
  }

  handleUploadToGoogleDrive(e) {
    e.stopPropagation();
    this.props.uploadToGoogleDrive(this.state.note);
  }

  handleTitleChange(e) {
    if (this.state.note.ownerId == this.props.user.user.id) {
        this.setState(merge({}, this.state, 
            { note: merge({}, this.state.note, { title: e.target.value }) }
        ));
    }
  }

  handleTextChange(e) {
    if (this.state.note.ownerId == this.props.user.user.id) {
        this.setState(merge({}, this.state,
            { note: merge({}, this.state.note, { text: e.target.value }) }
        ));
    }
  }

  editNote(e) {
    if (this.state.note.ownerId == this.props.user.user.id) {
        if ((this.state.note.title !== '' || this.state.note.text !== '')) {
            this.props.updateNoteInFirebase(this.state.note);
        } else {
            this.props.discardNoteInFirebase(this.state.note.id);
        }
    }
  }

  public render() {
    const noteBoxClasses = classNames({hovered: this.state.showActionButtons || this.state.isEdited});
    const actionClasses = this.state.showActionButtons ? '' : 'invisible';
    const actionsPanelClasses = this.state.isEdited ? 'hidden' : '';
    const saveButtonPanelClasses = this.state.isEdited ? '' : 'hidden';
    const iconStyle = {width: 18, height: 18, color: grey600};
    const buttonStyle = {width: 36, height: 36, padding: 0};
    return (
        <div>
            <Card
                style={{margin: '20px 0'}}
                className={noteBoxClasses}
                onMouseOver={this.onNoteHover.bind(this)}
                onMouseLeave={this.onNoteLeave.bind(this)}
                >
                <CardText 
                        onClick={this.handleEdit.bind(this)}
                        style={{paddingRight: 0}}>
                        {this.props.note.ownerId && this.props.note.ownerId !== this.props.user.user.uid ? '(read only)' : null}
                        {this.props.note.ownerId && this.props.note.isShared && this.props.note.ownerId === this.props.user.user.uid ? '(shared by me)' : null}
                    <div style={{ 
                        display: !this.state.isEdited && !this.state.note.title ? 'none' : ''
                        }}>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            position: 'absolute',
                            display: this.state.note.title || !this.state.isEdited ? 'none' : 'inline',
                            pointerEvents: 'none',
                            color: 'rgba(0,0,0,.2)',
                            lineHeight: '36px'
                            }}
                            >Title</div>
                    <ContentEditable 
                        className={'edit-title-input'}
                        placeholder="Title"
                        html={this.state.note.title}
                        disabled={false}
                        spellCheck={false}
                        onChange={this.handleTitleChange.bind(this)}
                        onKeyPress={preventEnterDefault}
                    />
                </div>
                <div
                    ref={(div) => { this.scrollableNote = div; }}
                    style={{
                    maxHeight: '290px',
                    cursor: this.state.isEdited ? 'text' : 'default',
                    overflow: this.state.isEdited ? 'scroll' : 'hidden'
                }}>
                    <div style={{
                            fontSize: '14px',
                            position: 'absolute',
                            display: this.state.note.text || !this.state.isEdited ? 'none' : 'inline',
                            pointerEvents: 'none',
                            color: 'rgba(0,0,0,.2)',
                            lineHeight: '36px',
                            paddingTop: '6px'
                            }}
                            >Write note...</div>
                    <ContentEditable
                        className={'edit-text-input'}
                        placeholder="Edit note..."
                        html={this.state.note.text}
                        disabled={false}
                        spellCheck={false}
                        onChange={this.handleTextChange.bind(this)}
                        ref={(input) => { this.textInput = input; }}
                    />
                </div>
                </CardText >
                <div className={actionsPanelClasses} style={{ minHeight: '36px', padding: '8px'}}>
                    {/*
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle} 
                        className={actionClasses}
                        tooltip="Add to favorite">
                        <StarIcon />
                    </IconButton>
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle} 
                        className={actionClasses}
                        onClick={this.handleEdit.bind(this)}
                        tooltip="Edit">
                        <ModeEditIcon />
                    </IconButton>
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={actionClasses}
                        tooltip="Copy">
                        <CopyIcon />
                    </IconButton>
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={actionClasses}
                        tooltip="Archive">
                        <ArchiveIcon />
                    </IconButton>
                    */}
                    {this.props.note.ownerId && this.props.note.ownerId === this.props.user.user.uid ?
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={actionClasses}
                        onClick={this.handleMoveToTrash.bind(this)}
                        /*tooltip="Move to trash">*/
                        tooltip="Remove">
                        <DeleteIcon />
                    </IconButton> : null}
                    {this.props.note.ownerId && this.props.note.ownerId === this.props.user.user.uid ?
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={actionClasses}
                        onClick={this.handleShareNote.bind(this)}
                        /*tooltip="Move to trash">*/
                        tooltip="Share">
                        <ShareIcon />
                    </IconButton> : null}
                    <IconButton 
                        iconStyle={iconStyle} 
                        style={buttonStyle}
                        className={actionClasses}
                        onClick={this.handleUploadToGoogleDrive.bind(this)}
                        tooltip="Upload to Google Drive">
                        <CloudUploadIcon />
                    </IconButton>
                </div>
                <CardActions className={saveButtonPanelClasses}>
                <FlatButton onClick={this.editNote.bind(this)} label="Done" primary={true}/>
                </CardActions>
            </Card>
        </div>
    );
  }
}

export default onClickOutside(Note);