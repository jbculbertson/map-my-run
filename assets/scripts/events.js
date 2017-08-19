'use strict'

const env = require('../../.env.js')
const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = env.GOOGLE_MAPS_API_KEY
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

let map
let poly
let google
let markers = []

const getCurrentLocation = function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    initialize(pos)
  })
}

const initialize = function (pos) {
  GoogleMapsLoader.load(function (google) {
    const loc = {
      lat: pos.lat,
      lng: pos.lng
    }
    const mapOptions = {
      zoom: 15,
      center: loc,
      mapTypeId: 'terrain'
    }
    let map = new google.maps.Map(document.getElementById('map'),
    mapOptions)
    let polyline = new google.maps.Polyline({
      strokeColor: 'black',
      strokeWeight: 3,
      map: map
    })
    google.maps.event.addListener(map, 'click', function (event) {
      addPoint(event.latLng)
    })
    function removePoint (marker) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i] === marker) {
          markers[i].setMap(null)
          markers.splice(i, 1)
          polyline.getPath().removeAt(i)
        }
      }
      const length = google.maps.geometry.spherical.computeLength(polyline.getPath())
      const mileLength = (length * 0.000621371).toFixed(2)
      $('#length').text('This run is ' + mileLength + ' miles long.')
    }
    function addPoint (latlng) {
      const marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: map
      })
      markers.push(marker)
      polyline.getPath().setAt(markers.length - 1, latlng)
      google.maps.event.addListener(marker, 'click', function (event) {
        removePoint(marker)
      })
      const length = google.maps.geometry.spherical.computeLength(polyline.getPath())
      const mileLength = (length * 0.000621371).toFixed(2)
      $('#length').text('This run is ' + mileLength + ' miles long.')
    }
  })
}

module.exports = {
  getCurrentLocation,
  initialize
}