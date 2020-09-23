import React, { Fragment } from 'react';
import * as DS from '@nypl/design-system-react-components';
// Redux
import {
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setSearchQuery,
  setMapPosition,
  setMapInfoWindow,
  setAutoSuggestInputValue,
  setPagination,
  resetSearch
 } from './../../../redux/actions';

function SearchResultsDetails() {
  // Redux
  const {
    searchQuery,
    resultsCount,
    openNow
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

  //
  function onClearSearchTerms(e) {
    e.preventDefault();

    batch(() => {
      // Map
      const defaultCenter = {
        lat: 40.7532,
        lng: -73.9822
      };
      // @TODO Consolidate this to a 'reset map' action.
      // Reset map
      dispatch(setMapPosition({
        mapCenter: defaultCenter,
        mapZoom: 12
      }));
      // Dispatch to reset the location id for info window.
      dispatch(setMapInfoWindow({
        infoWindowId: false,
        infoWindowIsVisible: false
      }));

      // Reset search
      dispatch(resetSearch());
    });

    // @TODO Remove this and do it better in V2.
    //const openNowCheckbox = document.getElementById('isOpenNow');
    //openNowCheckbox.checked = false;
  }

  //
  function renderMessage() {
    // Open now only
    if (!searchQuery && openNow && resultsCount) {
      return (
        <Fragment>
          Showing {resultsCount} results open now.
        </Fragment>
      );
    // Search query only.
    } else if (searchQuery && !openNow && resultsCount) {
      return (
        <Fragment>
          Showing {resultsCount} results near <strong>{searchQuery}</strong>, by distance.
        </Fragment>
      );
    // Search query + open now.
    } else if (searchQuery && openNow && resultsCount) {
      return (
        <Fragment>
          Showing {resultsCount} results near <strong>{searchQuery}</strong>, by distance and open now.
        </Fragment>
      );
    // No results.
    } else if (resultsCount === 0) {
      return (
        <Fragment>
          <strong>No results found.</strong>
        </Fragment>
      )
    // Default.
    } else {
      return null;
    }
  }

  if (renderMessage()) {
    return (
      <div
        className='locations__search-results-details'
        role='alert'
      >
        { renderMessage() }
        &nbsp;
        <DS.Button
          buttonType="link"
          iconName={null}
          iconPosition={null}
          id="button"
          mouseDown={false}
          onClick={onClearSearchTerms}
          type="submit"
        >
          Clear all search terms
        </DS.Button>
      </div>
    );
  } else {
    return null;
  }
}

export default SearchResultsDetails;
