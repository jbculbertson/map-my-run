'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./events')
const authEvents = require('./auth/events')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  // Chunk to execute when someone clicks Map Route
  $('#save-run-button').on('click', function () {
    $('#stats-body').hide()
    mapEvents.initialize({ lat: 42.3601, lng: -71.0589 })
    $('#loader-modal-title').text('Map is loading.')
    $('#loader-modal-subtitle').text('Please enjoy this optical illusion while you wait.')
    $('.loader').show('').delay(1250).fadeOut()
    $('.sk-cube-grid').show('').delay(1250).fadeOut()
    setTimeout(function () {
      $('#loader-modal').modal('hide')
    }, 1250)
  })
  // Attempting to create find-me button within map handlerbars
  $('#display').on('click', '#find-button', function () {
    mapEvents.getCurrentLocation()
    $('#find-me-modal-title').text('Map is loading.')
    $('#find-me-modal-subtitle').text('Please enjoy this optical illusion while you wait.')
    $('#find-me-modal-subtitle2').text('This will not work if your browser does not allow geolocation.')
    $('.loader').show('').delay(3000).fadeOut()
    $('.sk-cube-grid').show('').delay(3000).fadeOut()
    setTimeout(function () {
      $('#find-me-modal').modal('hide')
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
