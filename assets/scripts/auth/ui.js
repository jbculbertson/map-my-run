'use strict'

// const store = require('../store')

const signUpSuccess = () => {
  console.log('successful sign up')
}

const signUpFailure = (error) => {
  console.error('signup error is', error)
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
  signOutSuccess,
  signOutFailure
}
