
'use strict'

const config = require('./config.js')
const store = require('./store')

const createRun = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/runs',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showAllRuns = function () {
  return $.ajax({
    url: config.apiOrigin + '/runs',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showAllMyRuns = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/userruns/' + store.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showOneRun = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/runs/' + data,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteRun = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/runs/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createRun,
  showAllRuns,
  showAllMyRuns,
  showOneRun,
  deleteRun
}
