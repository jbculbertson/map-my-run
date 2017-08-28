'use strict'
const showAllRunsTemplate = require('./templates/show-all-runs.handlebars')
const showMyRunsTemplate = require('./templates/show-my-runs.handlebars')

const store = require('./store')

// const env = require('../../.env.js')
const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = 'AIzaSyCFiPNmm6GA0YPgYC6x-pAJ5Xkj3oCSITw'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

let polyline
const markers = []
const polylineRoute = []

const initialize = function (route) {
  const loc = {
    lat: route[0][0],
    lng: route[0][1]
  }
  console.log('fires within initialize2')
  GoogleMapsLoader.load(function (google) {
    console.log('fires within GoogleMapsLoader2')
    const mapOptions = {
      zoom: 14,
      center: loc,
      mapTypeId: 'terrain'
    }
    const map = new google.maps.Map(document.getElementById('map2'),
    mapOptions)
    polyline = new google.maps.Polyline({
      path: polylineRoute,
      strokeColor: 'black',
      strokeWeight: 3,
      map: map
    })
    $('#show-run-modal').on('shown.bs.modal', function () {
      google.maps.event.trigger(map, 'resize')
      map.setCenter(new google.maps.LatLng(loc))
    })
    let markers = []
    let polylineRoute = []
    for (let i = 0; i < route.length; i++) {
      // const place = {
      //   lat: route[i][0],
      //   lng: route[i][1]
      // }
      const point = new google.maps.LatLng(route[i][0], route[i][1])
      polylineRoute.push(point)
      addPoint(point)
    }
    function addPoint (latlng) {
      const marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: map
      })
      markers.push(marker)
      polyline.getPath().setAt(markers.length - 1, latlng)
    }
  })
}

const showOneRunSuccess = (data) => {
  store.runs = data.runs
  const route = data.run.route
  console.log('within showOneRunSuccess, data is ', data)
  initialize(route)
}

const saveRunSuccess = (data) => {
  $('.save-run-modal-header').text('Successfully saved!')
  $('.save-run').val('')
  $('#message-board').text('')
  $('.stats-modal-header').text('')
  console.log('within saveRunSuccess, data is ', data)
}

const saveRunFailure = (error) => {
  $('.save-run-modal-header').text('There was an error saving your route.')
  $('.save-run').val('')
  console.error(error.responseText)
}

const showAllRunsSuccess = (data) => {
  console.log(data)
  store.runs = data.runs
  $('#display').empty()
  const showAllRunsHtml = showAllRunsTemplate({ runs: data.runs })
  $('#display').append(showAllRunsHtml)
}

const showAllRunsFailure = (error) => {
  console.error(error.responseText)
}

const showAllMyRunsSuccess = (data) => {
  console.log('showAllMyRuns data is, ', data)
  store.runs = data.runs
  $('#display').empty()
  if (data.runs.length === 0) {
    $('#message-board').text('You have no saved routes.  Click \'MAP ROUTE\' to save your first route.')
    $('.stats-modal-header').text('You have no stats.  Click \'MAP ROUTE\' to save your first route.')
  } else {
    $('#message-board').text('')
    $('.stats-modal-header').text('')
  }
  const showMyRunsHtml = showMyRunsTemplate({ runs: data.runs })
  $('#display').append(showMyRunsHtml)
  let totalMiles = 0
  let totalTime = 0
  let longestRun = 0
  let fastestPace = data.runs[0].avgPace
  for (let i = 0; i < data.runs.length; i++) {
    totalMiles += data.runs[i].distance
    totalTime += data.runs[i].timeTaken
    if (data.runs[i].avgPace < fastestPace) {
      fastestPace = data.runs[i].avgPace
    }
    if (data.runs[i].timeTaken > longestRun) {
      longestRun = data.runs[i].timeTaken
    }
  }
  $('.miles-stat').text((totalMiles).toFixed(2) + ' total miles')
  $('.time-stat').text(totalTime + ' minutes')
  $('.pace-stat').text(fastestPace + ' min/mile')
  $('.longest-stat').text(longestRun + ' minutes')
  $('.stats-modal-title').text(store.user.fullName + '\'s stats')
}

const showAllMyRunsFailure = (error) => {
  console.error(error.responseText)
}

const showOneRunFailure = (error) => {
  console.error(error.responseText)
}

const deleteRunSuccess = (data) => {
  console.log(data)
}

const deleteRunFailure = (error) => {
  console.error('within deleteFail, error is ' + error.responseText)
}

module.exports = {
  saveRunSuccess,
  saveRunFailure,
  showAllRunsSuccess,
  showAllRunsFailure,
  showOneRunSuccess,
  showOneRunFailure,
  showAllMyRunsSuccess,
  showAllMyRunsFailure,
  deleteRunSuccess,
  deleteRunFailure
}
