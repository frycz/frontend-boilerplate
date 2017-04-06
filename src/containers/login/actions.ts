import * as constants from './constants'

export function loginUser(email, password) {
  return {
    type: constants.LOGIN_USER,
    email,
    password
  }
}

export function loginUserSuccess(user) {
  return {
    type: constants.LOGIN_USER_SUCCESS,
    user
  }
}

export function loginUserError(error) {
  return {
    type: constants.LOGIN_USER_ERROR,
    error
  }
}

export function logoutUser() {
  return {
    type: constants.LOGOUT_USER
  }
}