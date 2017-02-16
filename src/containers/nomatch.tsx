import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './main';

interface INomatchProps {
}

export default class Nomatch extends React.Component<INomatchProps, {}> {
  public render(): React.ReactElement<{}> {

    return (
        <Main>
            <h1>Page not found</h1>
        </Main>
    );
  }
}