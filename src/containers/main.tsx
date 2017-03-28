import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Row, Col, Navbar, NavItem, } from 'react-materialize';

interface IMainProps {
}

class Main extends React.Component<IMainProps, void> {
    constructor(props, context) {
      super(props, context);
    }

  public render() {
    
    return (
      <Row> 
        <Navbar className="teal darken-1" brand='QuickNote' right>
          <NavItem href={'/#/'}>Home</NavItem>
          <NavItem href={'/#/about'}>About</NavItem>
          <NavItem href={'/#/users'}>Users</NavItem>
          <NavItem href={'/#/user'}>My Account</NavItem>
        </Navbar>
        <Col s={12}>
          <div>{this.props.children}</div>
        </Col>
      </Row>
    );
  }
}

export default Main;