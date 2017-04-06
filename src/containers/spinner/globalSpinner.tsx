import * as React from 'react'
import {connect} from 'react-redux'

import CircularProgress from 'material-ui/CircularProgress';

interface IGlobalSpinnerProps {
  isActive: boolean
}

interface IGlobalSpinnerState {

}

class GlobalSpinner extends React.Component<IGlobalSpinnerProps, IGlobalSpinnerState> {
    render() {
        const spinner = (
            <div className="global-spinner">
                <CircularProgress 
                    size={80} 
                    thickness={5}
                    style={{ 
                        zIndex: 9999,        
                        position: 'absolute',
                        top: '40%',
                        width: '100%',
                        textAlign: 'center'
                    }} />
            </div>
        );

        return this.props.isActive ? spinner : null;
    }
}

function mapStateToProps (state) {
    return {
        isActive: state.spinner.active
    }
}

export default connect(mapStateToProps)(GlobalSpinner);
