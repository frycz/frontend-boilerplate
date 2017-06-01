import * as constants from './constants'

export const showGlobalMessage = (message) => {
    return {
        type: constants.SHOW_GLOBAL_MESSAGE,
        message
    }
};

export const hideGlobalMessage = () => {
    return {
        type: constants.HIDE_GLOBAL_MESSAGE
    }
};