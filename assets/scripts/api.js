
'use strict'

const config = require('./config.js')
// const store = require('../store')

const createRun = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/runs',
    method: 'POST',
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // },
    data
  })
}

const showAllRuns = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/runs',
    method: 'GET',
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // },
    data
  })
}

module.exports = {
  createRun,
  showAllRuns
}
