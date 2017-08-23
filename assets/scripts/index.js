'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./events')
const authEvents = require('./auth/events')

// let markers = []

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  $('#find').on('click', mapEvents.getCurrentLocation)
  $('#create-run').on('submit', mapEvents.onCreateRun)
  $('#show-all').on('click', mapEvents.onShowAllRuns)
  $('#show-my').on('click', mapEvents.onShowAllMyRuns)
  $('#display').on('click', '#delete-run', mapEvents.onDeleteRun)
})

// use require without a reference to ensure a file is bundled
require('./example')
