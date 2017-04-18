import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import { logoutUser } from './login/actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal700, grey700 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';

import GlobalSpinner from './spinner/globalSpinner'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal700,
    textColor: grey700,
  }
});

const iconStyles = {
  marginRight: 24,
};

injectTapEventPlugin();

interface IMainProps {
  logout(): void
}

interface MainState {
    open: boolean
}

class Main extends React.Component<IMainProps, MainState> {
  constructor(props, context) {
    super(props, context);
    this.state = {open: false};
  }

  menuClicked() {
    console.log('menu cliked');
  }

  handleToggle = () => this.setState({open: !this.state.open});

  public render() {

    const LeftIcons = (props) => (
      <div>
        <IconButton><SearchIcon color='#fff' /></IconButton>
      </div>
    );
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}> 
        <div>
          <AppBar
            title="QuickNote"
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            iconElementRight={<LeftIcons/>}
            style={{ position: "fixed", top: 0, }}
          />

          <Drawer open={this.state.open} docked={false} onRequestChange={this.handleToggle.bind(this)}>
          <MenuItem onClick={this.handleToggle.bind(this)} leftIcon={
            <div style={
              {
                width: '40px',
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: 'green', 
                color: 'white', 
                fontSize: '22px', 
                textAlign: 'center', 
                lineHeight: '40px', 
                fontWeight: 'lighter'
              }
            }>A</div>}
             style={{fontSize: '12px'}}>
            <div style={{fontWeight: 'bold'}}>Adam Sawicki</div>
            <div style={{marginTop: '-30px'}}>adamsawicki89@gmail.com</div>
          </MenuItem>
          <Divider />
          <MenuItem primaryText="Settings" leftIcon={<SettingsIcon />} style={{fontSize: '14px'}}/>
          <MenuItem onClick={this.props.logout} primaryText="Log out" leftIcon={<LogoutIcon />} style={{fontSize: '14px'}}/>
        </Drawer>

          <div>{this.props.children}</div>
          <GlobalSpinner />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(logoutUser()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);