'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./events')
const authEvents = require('./auth/events')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  // Chunk to execute when someone clicks Map Route
  let counter = 0
  $('#save-run-button').on('click', function () {
    counter += 1
    if (counter === 1) {
      $('#stats-body').hide()
      $('#loader-modal-title').text('Map is loading.')
      $('#loader-modal-subtitle').text('Please enjoy this optical illusion while you wait.')
      $('.loader').show('').delay(3000).fadeOut()
      $('.sk-cube-grid').show('').delay(3000).fadeOut()
      setTimeout(function () {
        $('#loader-modal').modal('hide')
      }, 3000)
      mapEvents.initialize({ lat: 42.3601, lng: -71.0589 })
      $('#pac-input').show()
    } else {
      $('.save-run-modal-header').text('')
      $('#display').empty()
      $('#pac-input').show()
      $('.map-view').show()
      $('#stats-body').hide()
      setTimeout(function () {
        $('#loader-modal').modal('hide')
      }, 20)
    }
  })
  $('#save-run').on('submit', mapEvents.onSaveRun)
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
  //
  $('#display').on('mouseenter', '#like-counter', function () {
    $(this).parents('.panel-default').children('.overlay').css('display', 'block')
  })
  $('#display').on('mouseleave', '#like-counter', function () {
    $(this).parents('.panel-default').children('.overlay').css('display', 'none')
  })
  $('#display').on('mouseenter', '#friends-like-counter', function () {
    $(this).parents('.panel-default').children('.overlay').css('display', 'block')
  })
  $('#display').on('mouseleave', '#friends-like-counter', function () {
    $(this).parents('.panel-default').children('.overlay').css('display', 'none')
  })
  $('#display').on('click', '#friends-like-counter', function () {
    $(this).parents('.panel-default').children('.overlay2').css('display', 'block')
  })
  $('#display').on('click', '.close-like-view', function () {
    $(this).parents('.panel-default').children('.overlay2').css('display', 'none')
  })
  $('#display').on('click', '#like-counter', function () {
    $(this).parents('.panel-default').children('.overlay2').css('display', 'block')
  })
  // $(document).on('click', function (event) {
  //   if (event.target.id !== '.overlay2' || event.target.id !== '#friends-like-counter') {
  //     $('.overlay2').hide()
  //   }
  // })
  //
})

// use require without a reference to ensure a file is bundled
require('./example')
