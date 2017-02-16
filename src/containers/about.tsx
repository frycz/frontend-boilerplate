import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './main';

interface IAboutProps {
}

class About extends React.Component<IAboutProps, {}> {
  public render() {

    return (
        <Main>
            <h1>About</h1>
        </Main>
    );
  }
}

export default About;