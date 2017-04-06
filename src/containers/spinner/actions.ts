import * as constants from './constants'

export const showSpinner = () => {
    return {
        type: constants.SHOW_SPINNER
    }
};

export const hideSpinner = () => {
    return {
        type: constants.HIDE_SPINNER
    }
};