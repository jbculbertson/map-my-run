'use strict'

const env = require('../../.env.js')
const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = env.GOOGLE_MAPS_API_KEY

// GoogleMapsLoader.LIBRARIES = ['geometry', 'places']
$(() => {
  setAPIOrigin(location, config)

  GoogleMapsLoader.load(function (google) {
    let milton = new google.maps.LatLng(42.2495, -71.0662)
    let boston = new google.maps.LatLng(42.3530, -71.0574)
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: boston
    })
    let poly = new google.maps.Polyline({
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    })
    poly.setMap(map)
    map.addListener('click', addLatLng)

    function addLatLng (event) {
      let path = poly.getPath()
      path.push(event.latLng)
      let marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength(),
        map: map
      })
    }
  })
})

//
// let gaBostonMarker = new google.maps.Marker({
//   position: boston,
//   map: map
// })
// let miltonMarker = new google.maps.Marker({
//   position: milton,
//   map: map
// })
//
// let directionsService = new google.maps.DirectionsService()
// let directionsDisplay = new google.maps.DirectionsRenderer()
//
// calculateAndDisplayRoute(directionsService, directionsDisplay)
//
// function calculateAndDisplayRoute (directionsService, directionsDisplay) {
//   directionsService.route({
//     origin: {lat: 42.3530, lng: -71.0574},
//     destination: {lat: 42.2495, lng: -71.0662},
//     travelMode: 'DRIVING'
//   }, function (response, status) {
//     if (status === 'OK') {
//       directionsDisplay.setDirections(response)
//       directionsDisplay.setMap(map)
//     } else {
//       console.log(status)
//     }
//   })
// }

// })
//
// function initMap() {
//   let milton = {lat: 42.243, lng: -71.064}
//   let map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 14,
//     center: milton
//    })
//   let poly = new google.maps.Polyline({
//    strokeColor: '#000000',
//    strokeOpacity: 1.0,
//    strokeWeight: 3
//   })
//   poly.setMap(map)
//   map.addListener('click', addLatLng)
//
// function addLatLng(event) {
//   let path = poly.getPath()
//   path.push(event.latLng)
//   let marker = new google.maps.Marker({
//     position: event.latLng,
//     title: '#' + path.getLength(),
//     map: map
//   })
// }
//
// }

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
