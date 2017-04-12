import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface INotFoundProps {
}

export default class NotFound extends React.Component<INotFoundProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
            <h1>Page not found</h1>
    );
  }
}