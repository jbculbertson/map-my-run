'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./events')

// let markers = []

$(() => {
  setAPIOrigin(location, config)
  $('#find').on('click', mapEvents.getCurrentLocation)
  $('#create-run').on('submit', mapEvents.onCreateRun)
  $('#show-all').on('click', mapEvents.onShowAllRuns)
  $('#display').on('click', '#delete-run', mapEvents.onDeleteRun)
})

// use require without a reference to ensure a file is bundled
require('./example')
