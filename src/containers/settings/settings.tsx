import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ISettingsProps {
}

export default class Settings extends React.Component<ISettingsProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
            <h1>Settings</h1>
    );
  }
}