import * as constants from './constants'

const initialState = {
    user: null,
    error: null
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case (constants.LOGIN_USER):
            return Object.assign({}, state, {});
        
        case (constants.LOGIN_USER_SUCCESS):
            console.log('LOGIN_USER_SUCCESS reducer', action);
            return Object.assign({}, state, {user: action.user});
        
        case (constants.LOGIN_USER_ERROR):
            console.log('LOGIN_USER_ERROR reducer', action);
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
};

export default userReducer;