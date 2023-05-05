## CHANGES

---

### v0.9.7 - General Maintenance & Improvements

---

- Updates eslint rules: [#397](https://github.com/NYPL/dxp-react-search/pull/397)
- Updated jumbotron and donation with new tablet and mobile ux: [#400](https://github.com/NYPL/dxp-react-search/pull/400)
- Updated "\_document" to use typescript and nextjs script component: [#402](https://github.com/NYPL/dxp-react-search/pull/402)
- Adds ability to use decoupled router with authenticated requests: [#403](https://github.com/NYPL/dxp-react-search/pull/403)
- Add published status field for Paragraphs integration: [#406](https://github.com/NYPL/dxp-react-search/pull/406)

---

### v0.9.6 - Press bug fix

---

- Fixes pagination bug: [#404](https://github.com/NYPL/dxp-react-search/pull/404)

---

### v0.9.5 - Section Front: Educator & Misc Release

---

- Add String Sanitization To GetColorway: [#391](https://github.com/NYPL/dxp-react-search/pull/391)
- Add Jumbotron component: [#387](https://github.com/NYPL/dxp-react-search/pull/387)
- Add ButtonLinks Component: [#396](https://github.com/NYPL/dxp-react-search/pull/396)
- Add Bundle to DecoupledRouter: [#390](https://github.com/NYPL/dxp-react-search/pull/390)
- Add Sharp Package: [#399](https://github.com/NYPL/dxp-react-search/pull/399)
- Add Text component to section front template: [#401](https://github.com/NYPL/dxp-react-search/pull/401)

---

### v0.9.4 - Drupal 10 Runway Support & Misc Release

---

- Add swipe functionality to homepage Slideshow component: [#355](https://github.com/NYPL/dxp-react-search/pull/355)
- Hide see more button if no link text: [#385](https://github.com/NYPL/dxp-react-search/pull/385)
- Remove old Apollo HOC: [#372](https://github.com/NYPL/dxp-react-search/pull/372)
- Adds cypress tests for section front pages: [#388](https://github.com/NYPL/dxp-react-search/pull/388)
- Updates image style format for json:api image styles module api change: [#389](https://github.com/NYPL/dxp-react-search/pull/389)

---

### v0.9.3 - Section Front Research Release

---

- Adds External Search component: [#358](https://github.com/NYPL/dxp-react-search/pull/358)
- Adds Email Subscription component: [#358](https://github.com/NYPL/dxp-react-search/pull/358)
- Adds Salesforce API route: [#358](https://github.com/NYPL/dxp-react-search/pull/358)
- Updates AWS deploy script with Salesforce env variables: [#384](https://github.com/NYPL/dxp-react-search/pull/384)
- Updates Card Grid component with additional layout variants: [#371](https://github.com/NYPL/dxp-react-search/pull/371)
- Adds get-colorway util for dynamically setting section front colors: [#353](https://github.com/NYPL/dxp-react-search/pull/353)

---

### v0.9.2 - General Maintenance & Improvements

---

- Update Global Header for Vega Change: [#350](https://github.com/NYPL/dxp-react-search/pull/350)
- Remove .gql files: [#360](https://github.com/NYPL/dxp-react-search/pull/360)
- Update Scout to Use DS AlphabetFilter Component and DS 1.2: [#345](https://github.com/NYPL/dxp-react-search/pull/345)
- Setup Additional AWS environments: [#356](https://github.com/NYPL/dxp-react-search/pull/356)
- Add new maintenace page and improved error handling: [#343](https://github.com/NYPL/dxp-react-search/pull/343)
- Revert Global Header for Vega Change: [#368](https://github.com/NYPL/dxp-react-search/pull/368)
- Update Global Header for Vega Change Take 2: [#370](https://github.com/NYPL/dxp-react-search/pull/370)

---

### v0.9.1 [2022-11-07] Home page events bug fix

---

- Fixes bug where events json:api query was not specifying status published.

---

### v0.9.0 [2022-10-25] Section Fronts: Give Release

---

- Initial build of Section Fronts Give page.

---

### v0.8.0 [2022-10-18] Press Releases Release!

---

- Initial build of Press Releases.

---

### v0.7.1 [2022-10-03] Homepage Hero Adjustments

---

- Adjustments for home page hero for image placement on large screens.
- Fix hero text overlay on iPad.

---

### v0.7.0 [2022-09-27] Homepage Release, React 17+NextJS 12, Maintenance & Improvements

---

- Upgrades to React 17 and NextJS 12.
- Updates vercel build scripts for env variables.
- Replaces `react-google-maps` with newer `@react-google-maps/api`.
- Update Location Finder `Hero` to use DS Chakra components.
- Adds a constant Build ID to next.config.js so RP can proxy `_next/data/scout` assets.
- Updates Location Finder to format phone numbers according to NYPL style guide.
- Initial build for new home page.

---

### v0.6.1 [2022-06-22] Pantheon Integration Changes & Maintenance

---

- Locks Dockerfile to use Node 16.15.0
- Locks Travis CI to use Node 16.15.0
- Updates CI build scripts to set Pantheon domains in env vars
- Refactors `CardList` and `TextWithImage` to use NextJS Image component.

---

### v0.6.0 [2022-05-31] Scout Maintenance & Improvements

---

- Adds vercel.sh bash script for skipping preview builds on qa and production.
- Bug fix for SASB and SNFL not visible on Location Finder map.
- Fix for double scroll bars on Location Finder.
- Updates Location Finder's BottomPromo component to use Chakra components.
- Removed legacy taxonomy api integration and replaces with D9 json:api.
- Upgrades DS from 0.28.0 -> v1.0.0.
- Code refactoring and cleanup related to DS update.
- Removes Header component and replaces with Header script with static component.
- Updates to Dockerfile to copy package-lock.json.
- Updates Dockerfile to use Node 16.

---

### v0.5.2 [2022-03-30] Blogs Bug Fixes & Additions

---

- Fixes bug where Scout 404 page returned a 200 status.
- Adds support for livestream to Video embed component.

### v0.5.1 [2022-03-24] Blogs Bug Fix

---

- Fix for libsyn podcast audio embed not rendering on frontend.

### v0.5.0 [2022-03-23] Blogs Release!

---

- Initial build of Blogs.
- Upgraded to NYPL DS 0.25.9.
- General application refactoring and code cleanup.

### v0.4.0 [2021-12-06] Locations Local Release

---

- Added Locations Local Request visit form.
- General application refactoring and code cleanup.

### v0.3.3 [2021-10-04] Online Resources Bug Fix

---

- MultiSelect filter does not deselect after unchecking checkbox.

### v0.3.2 [2021-08-31] Online Resources Bug Fix

---

- Long term bug fix for authentication type api change.

### v0.3.1 [2021-08-24] Online Resources Bug Fix

---

- Quick bug fix for authentication type api change.

### v0.3.0 [2021-08-23] Online Resources Release

---

- Initial build of Online Resources aka Articles & Databases.
- General application refactoring and code cleanup.

### v0.2.2 [2021-07-01] Locations Service Restoration

---

- Updates hero svg to post-covid image and copy
- Updates bottom promo with post-covid cards for locations

### v0.2.1 [2021-04-26] Misc Bugs Fixes & Improvements

---

- Fix Border color for Selected Filters
- For nested checkboxes, adds bold to Parent checkbox.
- Removes IE11 specific CSS code
- SortByDistance now firsts sorts by Location Name, for better Division and Center matching.
- Removes local LoadingSkeleton component in favor of DS SkeletonLoader component.
- Updates metatag image url to point to updated CDN location.

### v0.2.0 [2021-04-01] Location Finder Filters

---

- Updated to latest nypl design system.
- Updated to new pagination component.
- Update to use new StatusBadge component.
- Small fix for next.config.js rewrites().
- Added vercel.sh to skip builds on qa and production branches
- Adds Search Filters for Location Finder.
- Adds Division and Center data to locations list.
- Adds NEXT_PUBLIC_NYPL_DOMAIN env variable, so QA links can point to QA.

### v0.1.6 [2021-01-12] Location Finder Improvements

---

- Added tests for Search related components.
- Bug fix for clicking search twice clearing results count.

### v0.1.5 [2020-12-15] Location Finder Late Opening & Early Closing Logic

---

- Added tests for LocationAccessibility component.
- Handle late openings and early closings.
- Code refactoring and test coverage for closings and regular hours.
- Upgrades to Apollo Client v3 and removes older apollo client packages.
- Fixes duplicate render issue causes by older apollo client bugs.
- Locks NextJS to 9.5.5 instead of latest.
- Adds basic test coverage for locations component and mock apollo data.
- Upgraded DGX React Footer 0.5.7 -> 0.5.8 to fix accessibility issue.
- Adds "main-content" id to the main HTML element.

### v0.1.4 [2020-11-10] Location Finder Improvements

---

- Light refactor of location components and basic tests for Location components.
- Code improvements for handling of all day closings to accommodate hours, minutes.
- Added unit tests for checkAlertsOpenStatus.
- Replaced date-fns and date-fns-tz with DayJS for handling + comparing dates.
- Added tests for LocationHours component.

### v0.1.3 [2020-10-28] Hotfixes alert status logic

---

- Fix removes an extra conditional which resets the alertOpenStatus flag when multiple alerts are processed creating a false positive.
- adjust endDate conditional for closing date test

### v0.1.2 [2020-10-27] Location Finder Improvements

---

- Fix for Today's Hours display stripping out minutes
- Changes the closed message from "no hours available" to "closed"
- Improves "View on Map" functionality for mobile.
- Removed horizontal scroll bar on layout
- Open Now Checkbox Should Automatically Submit
- As a patron, when I click on a map pinpoint it should scroll the list of search results to the location clicked.
- Updates the Google Analytics config code to support Google Optimize account
- Adds v2 of the NYPL advocacy.js (which removes the jQuery dependency) to support OptinMonster campaigns
- Fix for Future Closings Incorrectly Displayed As Current Closings
- Move Refinery endpoint definition to set-env script
- Add Focus to Location Anchor When Map Marker is Clicked
- Sets unique assetPrefix "scout" for reverse proxy rules.

### v0.1.1 [2020-10-06] Location Finder Improvements

---

- Adds custom skeleton loader
- Adds link to google maps info window bubble
- Additional filter capabilities for autosuggest including zipcode + locality
- Removes Pagination From Desktop or any browser width 600px or more.
- Fix for keyboard focus box getting cutoff on Location component
- Search results details component should align with top of map
- Clear all search terms action link should goto new line on mobile
- Adds role alert to search-results-details div for screen readers
- Adds period after clear all search terms button
- Adds better geocode matching for library first name

### v0.1.0 [2020-09-14] Initial Release

---
