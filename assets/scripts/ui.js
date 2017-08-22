'use strict'

// const store = require('./store')

const createRunSuccess = (data) => {
  console.log(data)
}

const createRunFailure = (error) => {
  console.error(error.responseText)
}

module.exports = {
  createRunSuccess,
  createRunFailure
}
