import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IUsersProps {
}

export default class Users extends React.Component<IUsersProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
            <h1>Users</h1>
    );
  }
}