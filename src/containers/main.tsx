import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal700 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import SearchIcon from 'material-ui/svg-icons/action/search';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal700
  }
});

const iconStyles = {
  marginRight: 24,
};

injectTapEventPlugin();

interface IMainProps {
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

    const Logged = (props) => (
      <div>
        <IconButton><RefreshIcon color='#fff' /></IconButton>
        <IconButton><SearchIcon color='#fff' /></IconButton>
        <IconMenu
          {...props}
          iconButtonElement={
            <IconButton><MoreVertIcon color='#fff' /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </div>
    );

    const Menu = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton ><MenuIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}> 
        <div>
          <AppBar
            title="QuickNote"
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            iconElementRight={<Logged/>}
          />

          <Drawer open={this.state.open} docked={false} onRequestChange={this.handleToggle.bind(this)}>
          <MenuItem onClick={this.handleToggle.bind(this)}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleToggle.bind(this)}>Menu Item 2</MenuItem>
        </Drawer>

          <div>{this.props.children}</div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;