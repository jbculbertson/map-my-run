'use strict'

const store = require('../store')

const signUpSuccess = (data) => {
  console.log('successful sign up')
}

const signUpFailure = (error) => {
  $('.sign-up-modal-header').text('We may already have an account with that email')
  $('.sign-up').val('')
  $('.sign-in').val('')
  console.error('signup error is', error)
}

const signInSuccess = (data) => {
  store.user = data.user
  $('.sign-up').val('')
  $('.sign-in').val('')
  $('#sign-in-modal').modal('hide')
  $('#sign-up-modal').modal('hide')
  $('.sign-up-modal-header').text('')
  $('.sign-in-modal-header').text('')
  console.log('successful sign in')
}

const signInFailure = (error) => {
  $('.sign-in-modal-header').text('Please make sure you have the correct credentials')
  $('.sign-in').val('')
  $('.sign-up').val('')
  console.error('signin error is', error)
}

const changePasswordSuccess = () => {
  $('.change-password').val('')
  $('.change-password-modal-header').text('Successfully changed password.')
  console.log('successfully changed password')
}

const changePasswordFailure = (error) => {
  $('.change-password-modal-header').text('Incorrect credentials.')
  console.error(error)
}

const signOutSuccess = () => {
  $('.change-password-modal-header').text('')
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
