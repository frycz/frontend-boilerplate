import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './main';

interface IUserProps {
}

export default class User extends React.Component<IUserProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
        <Main>
            <h1>User</h1>
        </Main>
    );
  }
}