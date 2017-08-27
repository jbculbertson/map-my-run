'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./events')
const authEvents = require('./auth/events')
// let markers = []

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  $('#save-run-button').on('click', mapEvents.getCurrentLocation)
  $('#display').on('submit', '#save-run', mapEvents.onSaveRun)
  $('#show-all-button').on('click', mapEvents.onShowAllRuns)
  $('#show-my-button').on('click', mapEvents.onShowAllMyRuns)
  $('#display').on('click', '#delete-run', mapEvents.onDeleteRun)
  $('#display').on('click', '#show-one-run', mapEvents.onShowOneRun)
  $('.btn-group').on('click', '.btn', function () {
    $(this).addClass('active').siblings().removeClass('active')
  })
})

// use require without a reference to ensure a file is bundled
require('./example')
