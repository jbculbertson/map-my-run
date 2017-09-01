 # RunTracker

<img src="http://i.imgur.com/4kIxBWW.png" height="75" width="75">

## Created by Jeff Culbertson

## App Features

When you login, you'll be able to see a feed of your runs, or runs posted by
your friends.  You can interact with your friends runs by 'liking' them, or viewing
their run on a map.

![Image](http://i.imgur.com/rJ7Csub.png)

Click on Map Route to view an interactive map, with the ability to tap into Google's
powerful search bar.  You can also click to add markers and create a route.

![Image](http://i.imgur.com/iZhZSlA.png)

View real-time statistics at anypoint, and see celebrations when you set the Global Record!

![Image](http://i.imgur.com/BkqM6nH.png)

## Installation instructions for any dependencies
* NPM install to install dependencies

## Approach to building

As my last project for WDI, RunTracker is the culmination of 12+ weeks of intense
learning, and I felt like it came together nicely in this project.

This project began when we had to research a topic of our choosing.  I chose the
Google Maps API because I wanted to access a third party API, and I knew that
Google Maps brought with it a ton of cool features.

When I started building, I began with the most granular, and grew from there
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

This may sound like a daunting list, and at times it was, but I was always focused
on the small issue in front of me, which made them much easier to manage.

## Links
* [Front End Repo](https://github.com/jbculbertson/map-my-run)
* [Deployed Site](https://jbculbertson.github.io/map-my-run/)
* [Back End Repo](https://github.com/jbculbertson/run-tracker-back)
* [Deployed API](https://glacial-oasis-55159.herokuapp.com)


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
  * Runtracker has three entities - Users, Runs and Likes.  One User can have many runs,
  and many Likes, and one Run can have many Likes

## Unsolved Problems
  * I'd like to add Google Maps 'Snap-to-Roads' feature so that routes are more closely
  aligned with streets, but didn't have time during the initial phase to create.
  * I'd also like to tap into the Geolocation Watch feature, so that the Geolocation
  API will regularly ping the user to get their position.  This would allow the user
  to create a run by physically running it
  * Currently, a user can like something over and over - I'd like to make it so that
  one click creates a Like, and a second click removes that Like.
