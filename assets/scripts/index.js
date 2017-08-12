'use strict'

const env = require('../../.env.js')
const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = env.GOOGLE_MAPS_API_KEY

$(() => {
  setAPIOrigin(location, config)
  // GoogleMapsLoader.onLoad(function(google) {
  //   console.log('I just loaded google maps api')
  // })

  GoogleMapsLoader.load(function(google) {
    console.log('I just fired within initMap')
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 42.2495, lng: -71.0662}
    })
  })
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
