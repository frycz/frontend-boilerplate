import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './main';

import { Button, Row, Col } from 'react-materialize';

interface IDashboardProps {
}

class Dashboard extends React.Component<IDashboardProps, void> {

  public render() {

    return (
      <Main>
        <h1>Dashboard</h1>
        <Row>
      <Col s={6}>
        <Button waves='light'>Add</Button>
      </Col>
      <Col s={6}>
        <Button waves='light'>Remove</Button>
      </Col>
    </Row>
      </Main>
    );
  }
}

export default Dashboard;