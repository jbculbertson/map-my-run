'use strict'
const showAllRunsTemplate = require('./templates/show-all-runs.handlebars')
const store = require('./store')

const env = require('../../.env.js')
const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = env.GOOGLE_MAPS_API_KEY
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

let polyline
let markers = []

const initialize = function (route) {
  const loc = {
    lat: route[0][0],
    lng: route[0][1]
  }
  console.log('fires within initialize2')
  GoogleMapsLoader.load(function (google) {
    console.log('fires within GoogleMapsLoader2')
    // const loc = {
    //   lat: pos[0],
    //   lng: pos[1]
    // }
    const mapOptions = {
      zoom: 6,
      center: loc,
      mapTypeId: 'terrain'
    }
    const map = new google.maps.Map(document.getElementById('map2'),
    mapOptions)
    polyline = new google.maps.Polyline({
      strokeColor: 'black',
      strokeWeight: 3,
      map: map
    })
    for (let i = 0; i < route.length; i++) {
      const place = {
        lat: route[i][0],
        lng: route[i][1]
      }
      addPoint(place)
    }
    function addPoint (latlng) {
      const marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: map
      })
      markers.push(marker)
      console.log('within map2, markers is', markers)
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

const createRunSuccess = (data) => {
  $('.create-run-modal-header').text('Successfully saved route.')
  $('.create-run').val('')
  console.log('within createRunSuccess, data is ', data)
}

const createRunFailure = (error) => {
  $('.create-run-modal-header').text('There was an error saving your route.')
  $('.create-run').val('')
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
  const showAllRunsHtml = showAllRunsTemplate({ runs: data.runs })
  $('#display').append(showAllRunsHtml)
  let totalMiles = 0
  for (let i = 0; i < data.runs.length; i++) {
    totalMiles += data.runs[i].distance
  }
  $('.miles-stat').text(totalMiles + ' miles.')
  $('.stats-modal-header').text(store.user.fullName)
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
  createRunSuccess,
  createRunFailure,
  showAllRunsSuccess,
  showAllRunsFailure,
  showOneRunSuccess,
  showOneRunFailure,
  showAllMyRunsSuccess,
  showAllMyRunsFailure,
  deleteRunSuccess,
  deleteRunFailure
}
