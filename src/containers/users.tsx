import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './main';

interface IUsersProps {
}

export default class Users extends React.Component<IUsersProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
        <Main>
            <h1>Users</h1>
        </Main>
    );
  }
}