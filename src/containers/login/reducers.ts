import * as constants from './constants'

const initialState = {
    user: null,
    error: null
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case (constants.SET_USER):
            return Object.assign({}, state, {user: action.user, error: null});

        case (constants.LOGIN_USER_WITH_GOOGLE):
            return Object.assign({}, state, {error: null});

        case (constants.LOGIN_USER_WITH_EMAIL):
            return Object.assign({}, state, {error: null});
        
        case (constants.LOGIN_USER_SUCCESS):
            return Object.assign({}, state, {user: action.user, error: null});
        
        case (constants.LOGIN_USER_ERROR):
            return Object.assign({}, state, {error: action.error});

        case (constants.LOGOUT_USER):
            return Object.assign({}, state, {user: null});

        default:
            return state;
    }
};

export default userReducer;