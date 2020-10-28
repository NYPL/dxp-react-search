## CHANGES
-----------

### v0.1.3 Hotfix alert status logic
----------
* Fix removes an extra conditional which resets the alertOpenStatus flag when multiple alerts are processed creating a false positive.

### v0.1.2 [ ] Location Finder Improvements
-------------------------------------------
* Fix for Today's Hours display stripping out minutes
* Changes the closed message from "no hours available" to "closed"
* Improves "View on Map" functionality for mobile.
* Removed horizontal scroll bar on layout
* Open Now Checkbox Should Automatically Submit
* As a patron, when I click on a map pinpoint it should scroll the list of search results to the location clicked.
* Updates the Google Analytics config code to support Google Optimize account
* Adds v2 of the NYPL advocacy.js (which removes the jQuery dependency) to support OptinMonster campaigns
* Fix for Future Closings Incorrectly Displayed As Current Closings
* Move Refinery endpoint definition to set-env script
* Add Focus to Location Anchor When Map Marker is Clicked
* Sets unique assetPrefix "scout" for reverse proxy rules.

### v0.1.1 [2020-10-06] Location Finder Improvements
-------------------------------------------
* Adds custom skeleton loader
* Adds link to google maps info window bubble
* Additional filter capabilities for autosuggest including zipcode + locality
* Removes Pagination From Desktop or any browser width 600px or more.
* Fix for keyboard focus box getting cutoff on Location component
* Search results details component should align with top of map
* Clear all search terms action link should goto new line on mobile
* Adds role alert to search-results-details div for screen readers
* Adds period after clear all search terms button
* Adds better geocode matching for library first name

### v0.1.0 [2020-09-14] Initial Release
---------------------------------------
