'use strict'

// const store = require('../store')

const signOutSuccess = () => {
  console.log('successful sign out')
}

const signOutFailure = (error) => {
  console.error(error)
}

module.exports = {
  signOutSuccess,
  signOutFailure
}
