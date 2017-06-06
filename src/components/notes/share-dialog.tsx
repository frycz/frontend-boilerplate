import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

interface IShareDialogProps {
  foundUsers: Array<any>,
  open: boolean
  handleClose(): void,
  searchUser(searchText): void,
}

interface ShareDialogState {
  searchText: string
  usersListData: Array<any>,
  selectedUser: any
}

class ShareDialog extends React.Component<IShareDialogProps, ShareDialogState> {
  constructor(props, context) {
      super(props, context);
      this.state = {
        searchText: '',
        usersListData: [],
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
    if (foundUsers) {
      Object.keys(foundUsers).map((id, index) =>
          { 
            usersListData.push({
              text: foundUsers[id].fullName,
              value: foundUsers[id]
            })
            /*
            usersListData.push({
              text: foundUsers[id].fullName,
              value: foundUsers[id]
            })
            usersListData.push({
              text: foundUsers[id].fullName,
              value: foundUsers[id]
            })
            usersListData.push({
              text: foundUsers[id].fullName,
              value: foundUsers[id]
            })
            usersListData.push({
              text: foundUsers[id].fullName,
              value: foundUsers[id]
            })
            usersListData.push({
              text: foundUsers[id].fullName,
              value: foundUsers[id]
            })*/
          }
      )
    }
    return usersListData;
  }

  selectUser(user) {
    this.setState({selectedUser: user})
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
          <div>
            <div style={{'fontSize': '13px'}}>
              <div style={{'padding': '5px'}}>
                <div className="EDlbXc-x3Eknd-HiaYvf">
                  <div className="EDlbXc-x3Eknd-HiaYvf-bN97Pc" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5MNBoJQKATMGFb8cnm9WQR3AIhkKAWEQ____________ARibr4X4______8B/photo.jpg?sz=100')"}}>
                  </div>
                  </div>
                  <div className="EDlbXc-x3Eknd-fmcmS-haAclf">
                    <div className="EDlbXc-x3Eknd-fmcmS-k77Iif-haAclf">
                      <span className="EDlbXc-x3Eknd-fmcmS-k77Iif">Adam Sawicki</span>
                      <span className="EDlbXc-x3Eknd-fmcmS-k77Iif-UjZuef">(Owner)</span>
                    </div>
                    <div className="EDlbXc-x3Eknd-fmcmS-K4efff">adamsawicki89@gmail.com</div>
                  </div>
                  <div role="button" className="Q0hgme-LgbsSe Q0hgme-Bz112c-LgbsSe EDlbXc-x3Eknd-VkLyEc VIpgJd-LgbsSe" aria-label="Delete" aria-hidden="true" style={{userSelect: 'none', display: 'none'}}></div>
                </div>
              </div>
          </div>
          <div className={'collabolators-search-box'}>
            <AutoComplete
              hintText="Type collabolator e-mail address"
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