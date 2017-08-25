'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./events')
const authEvents = require('./auth/events')

// let markers = []

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  $('#find-button').on('click', mapEvents.getCurrentLocation)
  $('#save-run-button').on('click', mapEvents.getCurrentLocation)
  $('#save-run').on('submit', mapEvents.onSaveRun)
  $('#show-all-button').on('click', mapEvents.onShowAllRuns)
  $('#show-my-button').on('click', mapEvents.onShowAllMyRuns)
  $('#display').on('click', '#delete-run', mapEvents.onDeleteRun)
  $('#display').on('click', '#show-one-run', mapEvents.onShowOneRun)
})

// use require without a reference to ensure a file is bundled
require('./example')
