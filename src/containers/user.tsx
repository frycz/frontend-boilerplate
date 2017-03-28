import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IUserProps {
}

export default class User extends React.Component<IUserProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
            <h1>User</h1>
    );
  }
}