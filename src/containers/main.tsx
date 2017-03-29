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
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

class Main extends React.Component<IMainProps, void> {
  constructor(props, context) {
    super(props, context);
    
  }

  public render() {

    const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
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
            iconElementRight={<Logged/>}
          />
          <div>{this.props.children}</div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;