import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IMainProps {
}

class Main extends React.Component<IMainProps, void> {
    children: any;
    constructor(props, context) {
      super(props, context);
      this.children = props.children;
    }

  public render() {
    
    return (
      <div>
        <h1>Main Frame</h1>
        <div>
          <ul>
            <li><a href={'/#/'}>dashboard</a></li>
            <li><a href={'/#/about'}>about</a></li>
            <li><a href={'/#/users'}>users</a></li>
            <li><a href={'/#/user'}>user</a></li>
          </ul>  
        </div>
        <div>{this.children}</div>
      </div>
    );
  }
}

export default Main;