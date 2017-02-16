import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './main';

interface IDashboardProps {
}

class Dashboard extends React.Component<IDashboardProps, void> {

  public render() {

    return (
      <Main>
        <h1>Dashboard</h1>
      </Main>
    );
  }
}

export default Dashboard;