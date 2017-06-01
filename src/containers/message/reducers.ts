import * as constants from './constants';

const defaultState = {
    isOpen: false,
    message: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {

        case constants.SHOW_GLOBAL_MESSAGE:
            return Object.assign({}, state,
                {
                    isOpen: true,
                    message: action.message
                }
            );

        case constants.HIDE_GLOBAL_MESSAGE:
            return Object.assign({}, state,
                {
                    isOpen: false,
                    message: ''
                }
            );

        default:
            return state;
    }
};