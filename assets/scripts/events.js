'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = 'AIzaSyCFiPNmm6GA0YPgYC6x-pAJ5Xkj3oCSITw'
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
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      const showMapHtml = showMapTemplate()
      $('#display').append(showMapHtml)
      initialize(pos)
      console.log('within getCurrentLocation, pos is ', pos)
    }, function () {
      $('#message-board').text('This browser does not support Geolocation')
      initialize({lat: 42, lng: 42})
    })
  } else {
    $('#message-board').text('This browser does not support Geolocation')
    initialize({lat: 42, lng: 42})
  }
}

const onShowStats = function () {
  console.log('fires within showStats')
  api.indexForStats()
    .then($('.hide-stat-icon').css('display', 'none'))
    .then($('.revert').css('font-weight', 'normal'))
    .then($('.revert').css('line-height', 'normal'))
    .then($('.revert').css('color', 'black'))
    .then($('.revert').css('transform', 'scale(1)'))
    .then(ui.indexForStatsSuccess)
    .then(() => api.showMineForStats())
    .then(ui.showMineForStatsSuccess)
    .then($('#display').empty())
    .then($('#stats-body').show())
    .catch(ui.indexForStatsFailure)
}

const initialize = function (pos) {
  console.log('fires within initialize')
  GoogleMapsLoader.load(function (google) {
// this section clears the map on load - needed due to a bug that happened when
// you had a map with markers, and then clicked to a new tab.  When you re-init the
// map it wouldn't let you add polyline.
    markers = []
    route = []
    polyline = new google.maps.Polyline({
      strokeColor: 'black',
      strokeWeight: 3,
      map: map
    })
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

const onLikeRun = function (event) {
  const data = {
    'like': {
      '_owner': store.user.id,
      '_run_id': this.dataset.id
    }
  }
  api.likeRun(data)
    .then(ui.likeRunSuccess)
    .then(() => onShowAllMyRuns())
    .catch(ui.likeRunFailure)
}

const onLikeFriendsRun = function (event) {
  const data = {
    'like': {
      '_owner': store.user.id,
      '_run_id': this.dataset.id
    }
  }
  api.likeRun(data)
    .then(ui.likeRunSuccess)
    .then(() => onShowAllRuns())
    .catch(ui.likeRunFailure)
}

const onShowAllRuns = function (event) {
  api.showAllRuns()
    .then(ui.showAllRunsSuccess)
    .then($('.map-view').hide())
    .then($('#stats-body').hide())
    .catch(ui.showAllRunsFailure)
}

const onShowAllMyRuns = function (event) {
  api.showAllMyRuns()
    .then(ui.showAllMyRunsSuccess)
    .then($('.map-view').hide())
    .then($('#stats-body').hide())
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
  onDeleteRun,
  onLikeRun,
  onLikeFriendsRun,
  onShowStats
}
