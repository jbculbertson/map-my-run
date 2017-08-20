'use strict'

const env = require('../../.env.js')
const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = env.GOOGLE_MAPS_API_KEY
GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

let map
let poly
let google
let polyline
let length = 0
let mileLength = 0
let markers = []

const getCurrentLocation = function () {
  console.log('fires within getCurrentLocation')
  navigator.geolocation.getCurrentPosition(function (position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    initialize(pos)
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
      mapTypeId: 'terrain'
    }
    let map = new google.maps.Map(document.getElementById('map'),
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
          polyline.getPath().removeAt(i)
        }
      }
      length = google.maps.geometry.spherical.computeLength(polyline.getPath())
      mileLength = (length * 0.000621371).toFixed(2)
      $('#length').text('This run is ' + mileLength + ' miles long.')
    }
    function addPoint (latlng) {
      console.log('fires within AddPoint')
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
      length = google.maps.geometry.spherical.computeLength(polyline.getPath())
      mileLength = (length * 0.000621371).toFixed(2)
      $('#length').text('This run is ' + mileLength + ' miles long.')
      console.log('Total miles is' + mileLength)
    }
    // clearBoard 'function'
    $(document).ready(function () {
      $('#clear').on('click', function (event) {
        console.log('fires within ClearRoute (which is not actually a function)')
        for (let i = 0; i < markers.length; i++) {
          console.log('Markers within clearRoute forLoop ' + i + markers[i])
          markers[i].setMap(null)
        }
        polyline.setMap(null)
        markers = []
        mileLength = 0
        polyline = new google.maps.Polyline({
          strokeColor: 'black',
          strokeWeight: 3,
          map: map
        })
        $('#length').text('This run is ' + mileLength + ' miles long.')
        console.log('Total miles is' + mileLength)
      })
    })
  })
}

module.exports = {
  getCurrentLocation,
  initialize
}
