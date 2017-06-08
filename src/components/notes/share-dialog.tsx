import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import { remove, find } from 'lodash'

interface IShareDialogProps {
  foundUsers: Array<any>,
  actualCollaborators: any,
  open: boolean
  note: any
  handleClose(): void,
  handleShare(note, collaborators, usersToShareNote, usersToRemoveNote): void,
  searchUser(searchText): void,
}

interface ShareDialogState {
  searchText: string
  usersList: Array<any>,
  newCollaborators: any,
  usersToShareNote: any,
  usersToRemoveNote: any
}

class ShareDialog extends React.Component<IShareDialogProps, ShareDialogState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        searchText: '',
        usersList: [],
        newCollaborators: {},
        usersToShareNote: {},
        usersToRemoveNote: {}
      };
  }

  componentWillMount() {
    this.setState({
        usersList: this.prepareusersList(this.props.foundUsers),
        newCollaborators: this.props.actualCollaborators
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        usersList: this.prepareusersList(nextProps.foundUsers),
        newCollaborators: Object.assign({}, this.state.newCollaborators, nextProps.actualCollaborators)
    })
  }

  prepareusersList(foundUsers) {
    let usersList = [];
    let usersSuggestions = [];
    const newCollaborators = this.state.newCollaborators;
    const props = Object.assign({}, this.props);
    if (foundUsers) {
      Object.keys(foundUsers).map((id, index) =>
          { 
            usersSuggestions.push(foundUsers[id])
          }
      )
      remove(usersSuggestions, function (user) {
        console.log('props.note.ownerId', props.note.ownerId);
          return find(newCollaborators, {id: user.id}) || user.id == props.note.ownerId;
      });
      usersSuggestions.map((user) =>
          { 
            usersList.push({
              text: user.fullDisplayName,
              value: user
            })
          }
      )
    }
    return usersList;
  }

  selectUser(user) {
    if (user.value.id) {
      let newCollaborators = Object.assign({}, this.state.newCollaborators);
      let usersToShareNote = Object.assign({}, this.state.usersToShareNote)
      newCollaborators[user.value.id] = user.value;
      usersToShareNote[user.value.id] = user.value;
      this.setState({
        newCollaborators: newCollaborators,
        usersToShareNote: usersToShareNote,
        searchText: '',
        usersList: []
      })
    }
  }

  handleShare() {
    this.props.handleShare(
      this.props.note,
      this.state.newCollaborators,
      this.state.usersToShareNote,
      this.state.usersToRemoveNote
    );
  }

  handleSearchTextChange(searchText) {
    this.setState({searchText: searchText})
    this.props.searchUser(searchText);
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.props.handleClose.bind(this)}
      />,
      <RaisedButton
        label="Share"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleShare.bind(this)}
      />,
    ];
    return (
        <Dialog
          className={'share-dialog'}
          title="Collabolators"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose.bind(this)}
          contentStyle={{maxWidth: '650px'}}
        >
          {Object.keys(this.state.newCollaborators).map(key =>
            <div key={this.state.newCollaborators[key].id}>
              <div style={{'fontSize': '13px'}}>
                <div style={{'padding': '5px'}}>
                  <div className="EDlbXc-x3Eknd-HiaYvf">
                    <div className="EDlbXc-x3Eknd-HiaYvf-bN97Pc" style={{"backgroundImage": "url('" + this.state.newCollaborators[key].profileURL + "')"}}>
                    </div>
                    </div>
                    <div className="EDlbXc-x3Eknd-fmcmS-haAclf">
                      <div className="EDlbXc-x3Eknd-fmcmS-k77Iif-haAclf">
                        <span className="EDlbXc-x3Eknd-fmcmS-k77Iif">{this.state.newCollaborators[key].displayName}</span>
                        {/*<span className="EDlbXc-x3Eknd-fmcmS-k77Iif-UjZuef">(Owner)</span>*/}
                      </div>
                      <div className="EDlbXc-x3Eknd-fmcmS-K4efff">{this.state.newCollaborators[key].email}</div>
                    </div>
                    <div role="button" className="Q0hgme-LgbsSe Q0hgme-Bz112c-LgbsSe EDlbXc-x3Eknd-VkLyEc VIpgJd-LgbsSe" aria-label="Delete" aria-hidden="true" style={{userSelect: 'none', display: 'none'}}></div>
                  </div>
                </div>
            </div>
          )}

          <div className={'collabolators-search-box'} style={{width: '70%'}}>
            <AutoComplete
              hintText="Type collabolator e-mail address"
              listStyle={{fontSize: '13px'}}
              fullWidth={true}
              searchText={this.state.searchText}
              onNewRequest={this.selectUser.bind(this)}
              dataSource={this.state.usersList}
              onUpdateInput={this.handleSearchTextChange.bind(this)}
            />
          </div>
        </Dialog>
    );
  }
}

export default ShareDialog;