'use strict'

const store = require('../store')

const signUpSuccess = (data) => {
  console.log('successful sign up')
}

const signUpFailure = (error) => {
  console.error('signup error is', error)
}

const signInSuccess = (data) => {
  store.user = data.user
  console.log('successful sign in')
}

const signInFailure = (error) => {
  console.error('signin error is', error)
}

const changePasswordSuccess = () => {
  console.log('successfully changed password')
}

const changePasswordFailure = (error) => {
  console.error(error)
}

const signOutSuccess = () => {
  console.log('successful sign out')
}

const signOutFailure = (error) => {
  console.error('signout error is', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
