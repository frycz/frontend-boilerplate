import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './main';
import Notes from '../components/notes';

import { Button, Row, Col } from 'react-materialize';

interface IDashboardProps {
}

class Dashboard extends React.Component<IDashboardProps, void> {

  public render() {

    return (
      <Main>
        <Notes></Notes>
      </Main>
    );
  }
}

export default Dashboard;