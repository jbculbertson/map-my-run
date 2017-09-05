'use strict'

const showAllRunsTemplate = require('./templates/show-all-runs.handlebars')
const showMyRunsTemplate = require('./templates/show-my-runs.handlebars')

const store = require('./store')
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
  GoogleMapsLoader.load(function (google) {
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
  initialize(route)
}

const saveRunSuccess = (data) => {
  $('.save-run-modal-header').text('Successfully saved!')
  $('.save-run').val('')
  $('#message-board').text('')
  $('.stats-modal-header').text('')
}

const saveRunFailure = () => {
  $('.save-run-modal-header').text('There was an error saving your route.')
  $('.save-run').val('')
}

const removeMineFromAll = (data) => {
  const filteredData = []
  for (let i = 0; i < data.length; i++) {
    if (data[i]._owner !== store.user._id) {
      filteredData.push(data[i])
    }
  }
  return filteredData
}

const getGlobalTotalTime = (data) => {
  const globalTotalTime = {}
  for (let i = 0; i < data.runs.length; i++) {
    if (globalTotalTime[data.runs[i].ownerName]) {
      globalTotalTime[data.runs[i].ownerName] += data.runs[i].timeTaken
    } else {
      globalTotalTime[data.runs[i].ownerName] = data.runs[i].timeTaken
    }
  }
  const maxTotalTime = Object.values(globalTotalTime).sort((prev, next) => next - prev)[0]
  const maxTotalTimeOwner = Object.keys(globalTotalTime).reduce(function (a, b) {
    return globalTotalTime[a] > globalTotalTime[b] ? a : b
  })
  $('.global-time-stat').text(maxTotalTime + ' minutes')

  if (maxTotalTimeOwner === store.user.fullName) {
    $('.global-timeOwner-stat').text(maxTotalTimeOwner)
    $('.global-timeOwner-stat').css('font-weight', 'bold')
    $('.global-timeOwner-stat').css('line-height', '2.25')
    $('.global-timeOwner-stat').css('color', 'red')
    $('.global-timeOwner-stat').css('transform', 'scale(1.5)')
    $('.global-timeOwner-stat').css('transition-delay', '1s')
    $('.time').css('display', 'inline')
  } else {
    $('.global-timeOwner-stat').text(maxTotalTimeOwner)
  }
}

const getGlobalTotalDistance = (data) => {
  const globalTotalDistance = {}
  for (let i = 0; i < data.runs.length; i++) {
    if (globalTotalDistance[data.runs[i].ownerName]) {
      globalTotalDistance[data.runs[i].ownerName] += data.runs[i].distance
    } else {
      globalTotalDistance[data.runs[i].ownerName] = data.runs[i].distance
    }
  }
  const maxTotalDistance = Object.values(globalTotalDistance).sort((prev, next) => next - prev)[0]
  const maxTotalDistanceOwner = Object.keys(globalTotalDistance).reduce(function (a, b) {
    return globalTotalDistance[a] > globalTotalDistance[b] ? a : b
  })
  $('.global-distance-stat').text((maxTotalDistance).toFixed(2) + ' miles')
  if (maxTotalDistanceOwner === store.user.fullName) {
    $('.global-distanceOwner-stat').text(maxTotalDistanceOwner)
    $('.global-distanceOwner-stat').css('font-weight', 'bold')
    $('.global-distanceOwner-stat').css('line-height', '2.25')
    $('.global-distanceOwner-stat').css('color', 'red')
    $('.global-distanceOwner-stat').css('transform', 'scale(1.5)')
    $('.global-distanceOwner-stat').css('transition-delay', '1s')
    $('.distance').css('display', 'inline')
  } else {
    $('.global-distanceOwner-stat').text(maxTotalDistanceOwner)
  }
}

const getGlobalLongestRun = (data) => {
  let globalLongestRun = 0
  let globalLongestRunOwner = null
  for (let i = 0; i < data.runs.length; i++) {
    if (data.runs[i].timeTaken > globalLongestRun) {
      globalLongestRun = data.runs[i].timeTaken
      globalLongestRunOwner = data.runs[i].ownerName
    }
  }
  $('.global-longest-stat').text(globalLongestRun + ' minutes')
  if (globalLongestRunOwner === store.user.fullName) {
    $('.global-longestOwner-stat').text(globalLongestRunOwner)
    $('.global-longestOwner-stat').css('font-weight', 'bold')
    $('.global-longestOwner-stat').css('line-height', '2.25')
    $('.global-longestOwner-stat').css('color', 'red')
    $('.global-longestOwner-stat').css('transform', 'scale(1.5)')
    $('.global-longestOwner-stat').css('transition-delay', '1s')
    $('.longest').css('display', 'inline')
  } else {
    $('.global-longestOwner-stat').text(globalLongestRunOwner)
  }
}

const getGlobalFastestPace = (data) => {
  let globalFastestPace = data.runs[0].avgPace
  let globalFastestPaceOwner = null
  for (let i = 0; i < data.runs.length; i++) {
    if (data.runs[i].avgPace < globalFastestPace) {
      globalFastestPace = data.runs[i].avgPace
      globalFastestPaceOwner = data.runs[i].ownerName
    }
  }
  $('.global-pace-stat').text(globalFastestPace + ' min/mile')
  if (globalFastestPaceOwner === store.user.fullName) {
    $('.global-paceOwner-stat').text(globalFastestPaceOwner)
    $('.global-paceOwner-stat').css('font-weight', 'bold')
    $('.global-paceOwner-stat').css('line-height', '2.25')
    $('.global-paceOwner-stat').css('color', 'red')
    $('.global-paceOwner-stat').css('transform', 'scale(1.5)')
    $('.global-paceOwner-stat').css('transition-delay', '1s')
    $('.pace').css('display', 'inline')
  } else {
    $('.global-paceOwner-stat').text(globalFastestPaceOwner)
  }
}

const showAllRunsSuccess = (data) => {
  const filteredRuns = removeMineFromAll(data.runs)
  $('#display').empty()
  const showAllRunsHtml = showAllRunsTemplate({ runs: filteredRuns })
  $('#display').append(showAllRunsHtml)
}

const showAllRunsFailure = () => {
}

const getMyTotalMiles = (data) => {
  let totalMiles = 0
  for (let i = 0; i < data.runs.length; i++) {
    totalMiles += data.runs[i].distance
  }
  $('.miles-stat').text((totalMiles).toFixed(2) + ' miles')
}

const getMyTotalTime = (data) => {
  let totalTime = 0
  for (let i = 0; i < data.runs.length; i++) {
    totalTime += data.runs[i].timeTaken
  }
  $('.time-stat').text(totalTime + ' minutes')
}

const getMyLongestRun = (data) => {
  let longestRun = 0
  for (let i = 0; i < data.runs.length; i++) {
    if (data.runs[i].timeTaken > longestRun) {
      longestRun = data.runs[i].timeTaken
    }
  }
  $('.longest-stat').text(longestRun + ' minutes')
}

const getMyFastestPace = (data) => {
  let fastestPace = data.runs[0].avgPace
  for (let i = 0; i < data.runs.length; i++) {
    if (data.runs[i].avgPace < fastestPace) {
      fastestPace = data.runs[i].avgPace
    }
  }
  $('.pace-stat').text(fastestPace + ' min/mile')
}

const showAllMyRunsSuccess = (data) => {
  store.runs = data.runs
  $('#display').empty()
  if (data.runs.length === 0) {
    $('#message-board').text('You have no saved routes.  Save a route to start sharing runs with your friends.')
  } else {
    $('#message-board').text('')
    $('.stats-modal-header').text('')
  }
  const showMyRunsHtml = showMyRunsTemplate({ runs: data.runs })
  $('#display').append(showMyRunsHtml)
}

const indexForStatsSuccess = (data) => {
  store.runs = data.runs
  getGlobalTotalTime(data)
  getGlobalLongestRun(data)
  getGlobalFastestPace(data)
  getGlobalTotalDistance(data)
}

const showMineForStatsSuccess = (data) => {
  store.runs = data.runs
  getMyTotalMiles(data)
  getMyTotalTime(data)
  getMyLongestRun(data)
  getMyFastestPace(data)
}

module.exports = {
  saveRunSuccess,
  saveRunFailure,
  showAllRunsSuccess,
  showAllRunsFailure,
  showOneRunSuccess,
  showAllMyRunsSuccess,
  getGlobalTotalTime,
  indexForStatsSuccess,
  showMineForStatsSuccess
}
