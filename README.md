# Map My Run


1.  Add a listener to the map, once it fires, a click creates a Marker
map.addListener('click', function(event) {
  placeMarkerAndPanTo(event.latLng, map)
  })
}
<!-- NEED TO FIGURE OUT HOW TO REMOVE LISTENER -->

2. add each marker to an array
3. send that array to new Polyline
4. 
