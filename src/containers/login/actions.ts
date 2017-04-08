import * as constants from './constants'

export function loginUserWithGoogle() {
  return {
    type: constants.LOGIN_USER_WITH_GOOGLE
  }
}

export function loginUserWithGithub() {
  return {
    type: constants.LOGIN_USER_WITH_GITHUB,
  }
}

export function loginUserWithTwitter() {
  return {
    type: constants.LOGIN_USER_WITH_TWITTER
  }
}

export function loginUserWithFacebook() {
  return {
    type: constants.LOGIN_USER_WITH_FACEBOOK
  }
}

export function loginUserWithEmail(email, password) {
  return {
    type: constants.LOGIN_USER_WITH_EMAIL,
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