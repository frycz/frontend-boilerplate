import * as constants from './constants';

const defaultState = {
    active: false
};

export default (state = defaultState, action) => {
    switch (action.type) {

        case constants.SHOW_SPINNER:
            return Object.assign({}, state,
                {
                    active: true
                }
            );

        case constants.HIDE_SPINNER:
            return Object.assign({}, state,
                {
                    active: false
                }
            );

        default:
            return state;
    }
};