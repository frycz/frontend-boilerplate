import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal700 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

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
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}> 
        <div>
          <AppBar
            title="QuickNote"
          />
          <div>{this.props.children}</div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;