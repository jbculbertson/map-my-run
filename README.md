# RunTracker
..Created by Jeff Culbertson

## App Features

...When you login, you'll be able to see a feed of your runs, or runs posted by
your friends.

(http://i.imgur.com/k0NXdTM.png)

...Click on Map Route to view an interactive map, centered around where you are
currently.  You can click to add markers and create a route.

(http://i.imgur.com/AsbFclU.png)

...View real-time statistics at anypoint.

(http://i.imgur.com/Mkgbcl3.png)

## Installation instructions for any dependencies
* NPM install to install dependencies

## Approach to building

...As my last project for WDI, RunTracker is the culmination of 12+ weeks of intense
learning, and I felt like it came together nicely in this project.

...This project began when we had to research a topic of our choosing.  I chose the
Google Maps API because I wanted to access a third party API, and I knew that
Google Maps brought with it a ton of cool features.

...When I started building, I began with the most granular, and grew from there...
  1. Get a google map to display on my screen
  2. Get the map to center around a provided location
  3. Place one marker on the map
  4. Place a second marker on the map
  5. Draw a polyline from one marker to another
  6. Delete a marker
  7. Calculate total polyline distance
  8. Save route coordinates to database
  9. When recalled from database, turn coordinates into another map with markers and
  polylines.

...This may sound like a daunting list, and at times it was, but I was always focused
on the small issue in front of me, which made them much easier to manage.

## Links
* [Deployed Site]('https://jbculbertson.github.io/map-my-run/')
* [Back End Repo]('https://github.com/jbculbertson/run-tracker-back')


## Technologies Used

  * HTML 5 / CSS / SASS
  * Javascript
  * Jquery
  * AJAX
  * Handlebars + helpers
  * Bootstrap
  * Google Maps API
  * Geolocation API
  * Moment NPM package

## User Stories

* User
  1. As a user, I want to be able to create an account
  2. As a user, I want to be able to login
  3. As a user, I want to be able to change my password
  4. As a user, I want to be able to log out

* Routes
  1. As a user, I want to be able to track a route that I just ran
  2. As a user, I want to be able to see neat stats about my history of runs
  3. As a user, I want to be able to see routes that friends have ran
  4. As a user, I want google to know where I am located, to make it easier to
    start my run from the correct place.
  5. As a user, I want to be able to track a route that I just ran

## Wireframes

* [Landing Page Wireframe](http://i.imgur.com/U7rJuzb.jpg)
* [Main UX Wireframe](http://i.imgur.com/RKaltDO.jpg)
* [Feed Card Wireframe](http://i.imgur.com/g4RYGAI.jpg)

## Entity Relationship Diagram
  * To start, Runtracker has two entities - Users and Runs.  One User can have many runs.

## Unsolved Problems
  * I'd like to add Google Maps 'Snap-to-Roads' feature so that routes are more closely
  aligned with streets, but didn't have time during the initial phase to create.
  * I'd also like to tap into the Geolocation Watch feature, so that the Geolocation
  API will regularly ping the user to get their position.  This would allow the user
  to create a run by physically running it

## Link to your pitch deck
