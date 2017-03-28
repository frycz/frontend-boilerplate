import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface INomatchProps {
}

export default class Nomatch extends React.Component<INomatchProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
            <h1>Page not found</h1>
    );
  }
}