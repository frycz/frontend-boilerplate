import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import { remove, find } from 'lodash'

interface IShareDialogProps {
  foundUsers: Array<any>,
  open: boolean
  handleClose(): void,
  searchUser(searchText): void,
}

interface ShareDialogState {
  searchText: string
  usersListData: Array<any>,
  usersToShare: Array<any>,
  selectedUser: any
}

class ShareDialog extends React.Component<IShareDialogProps, ShareDialogState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        searchText: '',
        usersListData: [],
        usersToShare: [],
        selectedUser: null
      };
  }

  componentWillMount() {
    // fetch collaborators
    this.setState({
        usersListData: this.prepareUsersListData(this.props.foundUsers) 
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        usersListData: this.prepareUsersListData(nextProps.foundUsers) 
    })
  }

  prepareUsersListData(foundUsers) {
    let usersListData = [];
    let usersSuggestions = [];
    const usersToShare = this.state.usersToShare;
    if (foundUsers) {
      Object.keys(foundUsers).map((id, index) =>
          { 
            usersSuggestions.push(foundUsers[id])
          }
      )
      remove(usersSuggestions, function (user) {
          return find(usersToShare, {id: user.id});
      });
      usersSuggestions.map((user) =>
          { 
            usersListData.push({
              text: user.fullDisplayName,
              value: user
            })
          }
      )
    }
    return usersListData;
  }

  selectUser(user) {
    if (user.value.id) {
      let usersToShare = this.state.usersToShare.slice();
      usersToShare.push(user.value);
      this.setState({
        usersToShare: usersToShare,
        searchText: '',
        usersListData: []
      })
    }
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
        onTouchTap={this.props.handleClose.bind(this)}
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
          {this.state.usersToShare.map(user =>
            <div key={user.id}>
              <div style={{'fontSize': '13px'}}>
                <div style={{'padding': '5px'}}>
                  <div className="EDlbXc-x3Eknd-HiaYvf">
                    <div className="EDlbXc-x3Eknd-HiaYvf-bN97Pc" style={{"backgroundImage": "url('" + user.profileURL + "')"}}>
                    </div>
                    </div>
                    <div className="EDlbXc-x3Eknd-fmcmS-haAclf">
                      <div className="EDlbXc-x3Eknd-fmcmS-k77Iif-haAclf">
                        <span className="EDlbXc-x3Eknd-fmcmS-k77Iif">{user.displayName}</span>
                        {/*<span className="EDlbXc-x3Eknd-fmcmS-k77Iif-UjZuef">(Owner)</span>*/}
                      </div>
                      <div className="EDlbXc-x3Eknd-fmcmS-K4efff">{user.email}</div>
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
              dataSource={this.state.usersListData}
              onUpdateInput={this.handleSearchTextChange.bind(this)}
            />
          </div>
        </Dialog>
    );
  }
}

export default ShareDialog;