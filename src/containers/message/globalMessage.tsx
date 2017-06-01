import * as React from 'react'
import {connect} from 'react-redux'

import Snackbar from 'material-ui/Snackbar'
import { hideGlobalMessage } from './actions'

interface IGlobalMessageProps {
    isOpen: boolean,
    message: string
}

interface IGlobalMessageState {
  isOpen: boolean,
  message: string
}

class GlobalMessage extends React.Component<IGlobalMessageProps, IGlobalMessageState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Snackbar
                open={this.props.isOpen}
                message={this.props.message}
                autoHideDuration={4000}
                onRequestClose={this.props.hideGlobalMessage}
            />
        );
    }
}

function mapStateToProps (state) {
    return {
        isOpen: state.message.isOpen,
        message: state.message.message
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      hideGlobalMessage: () => dispatch(hideGlobalMessage())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessage);
