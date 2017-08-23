'use strict'
const showAllRunsTemplate = require('./templates/show-all-runs.handlebars')
const store = require('./store')

const env = require('../../.env.js')
const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = env.GOOGLE_MAPS_API_KEY
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

const initialize = function (pos) {
  console.log('fires within initialize2')
  GoogleMapsLoader.load(function (google) {
    console.log('fires within GoogleMapsLoader2')
    const loc = {
      lat: pos.lat,
      lng: pos.lng
    }
    const mapOptions = {
      zoom: 15,
      center: loc,
      mapTypeId: 'terrain'
    }
    const map = new google.maps.Map(document.getElementById('map2'),
    mapOptions)
    // polyline = new google.maps.Polyline({
    //   strokeColor: 'black',
    //   strokeWeight: 3,
    //   map: map
    // })
  })
}

const createRunSuccess = (data) => {
  $('.create-run-modal-header').text('Successfully saved route.')
  $('.create-run').val('')
  console.log(data)
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
  console.log(data)
  store.runs = data.runs
  $('#display').empty()
  const showAllRunsHtml = showAllRunsTemplate({ runs: data.runs })
  $('#display').append(showAllRunsHtml)
}

const showAllMyRunsFailure = (error) => {
  console.error(error.responseText)
}

const showOneRunSuccess = (data) => {
  store.runs = data.runs
  const startLoc = data.run.route[0]
  console.log('within showOneRunSuccess, modified data is ', (data.run.route[0]))
  initialize(startLoc)
  // $('#display').empty()
  // const showAllRunsHtml = showAllRunsTemplate({ runs: data.runs })
  // $('#display').append(showAllRunsHtml)
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
