'use strict'

const store = require('../store')

const signUpSuccess = (data) => {
  console.log('signUpSuccess, data is :', data)
}

const signUpFailure = () => {
  $('.sign-up-modal-header').text('We may already have an account with that email')
  $('.sign-up').val('')
  $('.sign-in').val('')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('.sign-up').val('')
  $('.sign-in').val('')
  $('#sign-in-modal').modal('hide')
  $('#sign-up-modal').modal('hide')
  $('.sign-up-modal-header').text('')
  $('.sign-in-modal-header').text('')
  $('#message-board').show()
  $('.jumbotron').hide()
  $('.navbar').show()
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
  $('.save-run-modal-header').text('')
  $('.miles-stat').text('')
  $('.time-stat').text('')
  $('.pace-stat').text('')
  $('#message-board').text('')
  $('.stats-modal-title').text('')
  $('#settings-modal').modal('hide')
  $('#display').hide()
  $('#message-board').hide()
  $('.jumbotron').show()
  $('.navbar').hide()
}

const signOutFailure = () => {
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
