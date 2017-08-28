'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const env = require('../../.env.js')
const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = env.GOOGLE_MAPS_API_KEY
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']
const showMapTemplate = require('./templates/map.handlebars')

let polyline
let length = 0
let mileLength = 0
let markers = []
let route = []

const getCurrentLocation = function () {
  $('#display').empty()
  console.log('fires within getCurrentLocation')
  navigator.geolocation.getCurrentPosition(function (position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    const showMapHtml = showMapTemplate()
    $('#display').append(showMapHtml)
    initialize(pos)
    console.log('within getCurrentLocation, pos is ', pos)
  })
}

const initialize = function (pos) {
  console.log('fires within initialize')
  GoogleMapsLoader.load(function (google) {
    console.log('fires within GoogleMapsLoader')
    const loc = {
      lat: pos.lat,
      lng: pos.lng
    }
    const mapOptions = {
      zoom: 15,
      center: loc,
      mapTypeId: 'terrain',
      gestureHandling: 'cooperative'
    }
    const map = new google.maps.Map(document.getElementById('map'),
    mapOptions)
    polyline = new google.maps.Polyline({
      strokeColor: 'black',
      strokeWeight: 3,
      map: map
    })
    google.maps.event.addListener(map, 'click', function (event) {
      addPoint(event.latLng)
    })
    function removePoint (marker) {
      console.log('fires within RemovePoint')
      for (let i = 0; i < markers.length; i++) {
        if (markers[i] === marker) {
          markers[i].setMap(null)
          markers.splice(i, 1)
          route.splice(i, 1)
          polyline.getPath().removeAt(i)
        }
      }
      length = google.maps.geometry.spherical.computeLength(polyline.getPath())
      mileLength = (length * 0.000621371).toFixed(2)
      $('#distance-input').val(mileLength)
      $('#distance-input').css('background', 'linear-gradient(to right, #fffbd5, #b20a2c)')
      setTimeout(function () {
        $('#distance-input').css('background', 'white')
      }, 1000)
    }
    function addPoint (latlng) {
      console.log('fires within AddPoint, latlng is ', latlng)
      const marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: map
      })
      const x = latlng.lat()
      const y = latlng.lng()
      route.push([x, y])
      markers.push(marker)
      polyline.getPath().setAt(markers.length - 1, latlng)
      google.maps.event.addListener(marker, 'click', function (event) {
        removePoint(marker)
      })
      length = google.maps.geometry.spherical.computeLength(polyline.getPath())
      mileLength = (length * 0.000621371).toFixed(2)
      // $('.save-run-modal-header').text('This run is ' + mileLength + ' miles long.')
      $('#distance-input').val(mileLength)
      $('#distance-input').css('background', 'linear-gradient(to right, #dce35b, #45b649)')
      setTimeout(function () {
        $('#distance-input').css('background', 'white')
      }, 1000)
      console.log('Total miles is ' + mileLength)
    }
    // clearBoard 'function'
    $(document).ready(function () {
      $('#clear-button').on('click', function (event) {
        console.log('fires within ClearRoute (which is not actually a function)')
        for (let i = 0; i < markers.length; i++) {
          console.log('Markers within clearRoute forLoop ' + i + markers[i])
          markers[i].setMap(null)
        }
        polyline.setMap(null)
        markers = []
        route = []
        mileLength = 0
        polyline = new google.maps.Polyline({
          strokeColor: 'black',
          strokeWeight: 3,
          map: map
        })
        $('#distance-input').val(mileLength)
        $('#distance-input').css('background', 'linear-gradient(to right, #fffbd5, #b20a2c)')
        setTimeout(function () {
          $('#distance-input').css('background', 'white')
        }, 1000)
        console.log('Total miles is ' + mileLength)
      })
    })
  })
}

const onSaveRun = function (event) {
  const formData = getFormFields(this)
  const data = {
    'run': {
      'distance': mileLength,
      'timeTaken': formData.run.timeTaken,
      'route': route
    }
  }
  console.log('within save run, data = ' + data)
  event.preventDefault()
  api.saveRun(data)
    .then(ui.saveRunSuccess)
    .catch(ui.saveRunFailure)
}

const onShowAllRuns = function (event) {
  api.showAllRuns()
    .then(ui.showAllRunsSuccess)
    .then($('.map-view').hide())
    .catch(ui.showAllRunsFailure)
}

const onShowAllMyRuns = function (event) {
  api.showAllMyRuns()
    .then(ui.showAllMyRunsSuccess)
    .then($('.map-view').hide())
    .catch(ui.showAllMyRunsFailure)
}

const onShowOneRun = function (event) {
  const data = this.dataset.id
  api.showOneRun(data)
    .then(ui.showOneRunSuccess)
    .catch(ui.showOneRunFailure)
}

const onDeleteRun = function (event) {
  api.deleteRun(this.dataset.id)
    .then(ui.deleteRunSuccess)
    .then(() => {
      $('#display').empty()
      onShowAllMyRuns()
    })
    .catch(ui.deleteRunFailure)
}

module.exports = {
  getCurrentLocation,
  initialize,
  onSaveRun,
  onShowAllRuns,
  onShowAllMyRuns,
  onShowOneRun,
  onDeleteRun
}
