'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = 'AIzaSyCFiPNmm6GA0YPgYC6x-pAJ5Xkj3oCSITw'
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

let polyline
let length = 0
let mileLength = 0
let markers = []
let route = []

const onShowStats = function () {
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
    .then($('.map-view').hide())
    .then($('#pac-input').hide())
    .catch(ui.indexForStatsFailure)
}

const onSaveRun = function (event) {
  event.preventDefault()
  const formData = getFormFields(this)
  const data = {
    'run': {
      'distance': mileLength,
      'timeTaken': formData.run.timeTaken,
      'route': route
    }
  }
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
    .then($('#pac-input').hide())
    .then($('#stats-body').hide())
    .catch(ui.showAllRunsFailure)
}

const onShowAllMyRuns = function (event) {
  api.showAllMyRuns()
    .then(ui.showAllMyRunsSuccess)
    .then($('.map-view').hide())
    .then($('#pac-input').hide())
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

const initialize = function (pos) {
  $('#display').empty()
  $('.map-view').show()
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
    const mapOptions = {
      zoom: 15,
      center: pos,
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
    const input = document.getElementById('pac-input')
    const searchBox = new google.maps.places.SearchBox(input)
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds())
    })
    searchBox.addListener('places_changed', function () {
      const places = searchBox.getPlaces()
      if (places.length === 0) {
        return
      }
      const bounds = new google.maps.LatLngBounds()
      places.forEach(function (place) {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      })
      map.fitBounds(bounds)
    })
//
//
    google.maps.event.addListener(map, 'click', function (event) {
      addPoint(event.latLng)
    })
    function removePoint (marker) {
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
    }
    // clearBoard 'function'
    $(document).ready(function () {
      $('#clear-button').on('click', function (event) {
        for (let i = 0; i < markers.length; i++) {
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
      })
    })
  })
}

module.exports = {
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
