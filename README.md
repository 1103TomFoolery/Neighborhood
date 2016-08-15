# Neighborhood

This single-page application is the final project for the Udacity Frontend Developer Nanodegree.  It features a map of my
neighborhood in San Jose, California rendered using the Google Maps API. Additional functionality, including: map markers 
to identify some of my favorite places, a search function to easily discover these locations, and a listview that supports 
simple browsing of all locations. I used Foursquare to provide additional information about each of these locations.  The
application is responsive and should fit any device.

The location list and search window are located under the 'hamburger' at the top left of the map.  This was implemented using
Slideout.js framework.  Other libraries/frameworks included as Bower components include jquery, knockout and bootstrap.

I pinched quite a bit of code directly from the Google Maps API documentation, so kudos to them for making it available.  I
also need to personally thank Ryan Vrba for a fantastic 1:1 session and Udayan from the forum for helping me with a bit of 
error handling on the Foursquare json response.

To use the application, just open index.html in the browser.  The map will render and markers should be visible.  Clicking on 
a marker will give you an info window with some details about the location as well as some short animation.  Clicking the
hamburger will open a list of locations and a search/filter box.  You can select locations by clicking them in the list.
Alternatively you can filter the list by typing in the filter box.  The markers displayed on the map will reflect the filtered
list contents.
