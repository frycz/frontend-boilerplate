import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from '../containers/main';

import { Input, Button } from 'react-materialize';

interface INotesProps {
}

class Notes extends React.Component<INotesProps, {}> {
  public render() {

    return (
        <div>
          <div className="row">
            <div className="input-field col s12">
              <textarea placeholder="Create note..." id="note_input" className="materialize-textarea"></textarea>
            </div>
            <div className="col s12">
              <Button>Save</Button>
            </div>
          </div>
        </div>
    );
  }
}

export default Notes;