import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { addNote } from '../actions/notes';

import Notes from '../components/notes';

import { Button, Row, Col } from 'react-materialize';

interface IDashboardProps {
  notes: Array<any>,
  addNote(): void
}

class Dashboard extends React.Component<IDashboardProps, void> {
  constructor(props, context) {
    super(props, context);
  }

  public render() {
    console.log('-> this.props.notes', this.props.notes);
    const notes = this.props.notes;
    return (
        <Notes
          notes = { notes }
          onAddNote = { this.props.addNote }
        ></Notes>
    );
  }
}

const mapStateToProps = function(state){
  console.log('state', state);
  return {
    notes: state.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      addNote: (title, note) => dispatch(addNote(title, note))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);