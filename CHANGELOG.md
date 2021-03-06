## CHANGES
-----------

### v0.2.2 [2021-07-01] Locations Service Restoration
------------------------------------------------------
* Updates hero svg to post-covid image and copy
* Updates bottom promo with post-covid cards for locations

### v0.2.1 [2021-04-26] Misc Bugs Fixes & Improvements
------------------------------------------------------
* Fix Border color for Selected Filters
* For nested checkboxes, adds bold to Parent checkbox.
* Removes IE11 specific CSS code
* SortByDistance now firsts sorts by Location Name, for better Division and Center matching.
* Removes local LoadingSkeleton component in favor of DS SkeletonLoader component.
* Updates metatag image url to point to updated CDN location.

### v0.2.0 [2021-04-01] Location Finder Filters
-----------------------------------------------
* Updated to latest nypl design system.
* Updated to new pagination component.
* Update to use new StatusBadge component.
* Small fix for next.config.js rewrites().
* Added vercel.sh to skip builds on qa and production branches
* Adds Search Filters for Location Finder.
* Adds Division and Center data to locations list.
* Adds NEXT_PUBLIC_NYPL_DOMAIN env variable, so QA links can point to QA.

### v0.1.6 [2021-01-12] Location Finder Improvements
-----------------------------------------------
* Added tests for Search related components.
* Bug fix for clicking search twice clearing results count.

### v0.1.5 [2020-12-15] Location Finder Late Opening & Early Closing Logic
-----------------------------------------------
* Added tests for LocationAccessibility component.
* Handle late openings and early closings.
* Code refactoring and test coverage for closings and regular hours.
* Upgrades to Apollo Client v3 and removes older apollo client packages.
* Fixes duplicate render issue causes by older apollo client bugs.
* Locks NextJS to 9.5.5 instead of latest.
* Adds basic test coverage for locations component and mock apollo data.
* Upgraded DGX React Footer 0.5.7 -> 0.5.8 to fix accessibility issue.
* Adds "main-content" id to the main HTML element.

### v0.1.4 [2020-11-10] Location Finder Improvements
-----------------------------------------------
* Light refactor of location components and basic tests for Location components.
* Code improvements for handling of all day closings to accommodate hours, minutes.
* Added unit tests for checkAlertsOpenStatus.
* Replaced date-fns and date-fns-tz with DayJS for handling + comparing dates.
* Added tests for LocationHours component.

### v0.1.3 [2020-10-28] Hotfixes alert status logic
---------------------------------------------------
* Fix removes an extra conditional which resets the alertOpenStatus flag when multiple alerts are processed creating a false positive.
* adjust endDate conditional for closing date test

### v0.1.2 [2020-10-27] Location Finder Improvements
----------------------------------------------------
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
----------------------------------------------------
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
