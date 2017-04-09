import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

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

//injectTapEventPlugin(); TODO - move it to upper component

interface IUnauthorizedProps {
}

interface UnauthorizedState {
    open: boolean
}

class Unauthorized extends React.Component<IUnauthorizedProps, UnauthorizedState> {
  constructor(props, context) {
    super(props, context);
    this.state = {open: false};
  }

  public render() {
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}> 
        <div>
          <AppBar
            title="QuickNote"
            showMenuIconButton={false}
            style={{ position: "fixed", top: 0, }}
          />

          <div>{this.props.children}</div>
          <GlobalSpinner />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Unauthorized;