'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./events')
const authEvents = require('./auth/events')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  $('#save-run-button').on('click', function () {
    $('#stats-body').hide()
    mapEvents.getCurrentLocation()
    $('#loader-modal-title').text('Map is loading.')
    $('#loader-modal-subtitle').text('Please enjoy this optical illusion while you wait.')
    $('.loader').show('').delay(3000).fadeOut()
    $('.sk-cube-grid').show('').delay(3000).fadeOut()
    setTimeout(function () {
      $('#loader-modal').modal('hide')
    }, 3000)
  })
  $('#display').on('submit', '#save-run', mapEvents.onSaveRun)
  $('#show-all-button').on('click', mapEvents.onShowAllRuns)
  $('#show-my-button').on('click', mapEvents.onShowAllMyRuns)
  $('#stats-button').on('click', mapEvents.onShowStats)
  $('#display').on('click', '#delete-run', mapEvents.onDeleteRun)
  $('#display').on('click', '#show-one-run', mapEvents.onShowOneRun)
  $('#display').on('click', '#like-run', mapEvents.onLikeRun)
  $('#display').on('click', '#like-friends-run', mapEvents.onLikeFriendsRun)
  $('.btn-group').on('click', '.btn', function () {
    $(this).addClass('active').siblings().removeClass('active')
  })
  $('.modal').on('shown.bs.modal', function () {
    $(this).find('input:first').focus()
  })
})

// use require without a reference to ensure a file is bundled
require('./example')
