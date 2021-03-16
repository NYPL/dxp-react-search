import React, { Fragment } from 'react';
import { Button } from '@nypl/design-system-react-components';
// Redux
import {
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import {
  resetSearch,
  resetMap
 } from './../../../redux/actions';

function SearchResultsDetails() {
  // Redux
  const {
    searchQuery,
    resultsCount,
    openNow,
    searchFilters
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

  //
  function onClearSearchTerms(e) {
    e.preventDefault();

    batch(() => {
      // Reset map
      const defaultCenter = {
        lat: 40.7532,
        lng: -73.9822
      };
      dispatch(resetMap({
        mapCenter: defaultCenter,
        mapZoom: 12,
        infoWindowId: false,
        infoWindowIsVisible: false
      }))

      // Reset search
      dispatch(resetSearch());
    });
  }

  //
  function renderMessage() {
    if (
      !searchQuery
      && !openNow
      && Object.keys(searchFilters).length > 0
      && resultsCount
    ) {
      return (
        <Fragment>
          Showing {resultsCount} results.
        </Fragment>
      );
    }
    // Open now only
    else if (!searchQuery && openNow && resultsCount) {
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
    } 
    // Default.
    else {
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
        <Button
          buttonType="link"
          iconName={null}
          iconPosition={null}
          id="button"
          mouseDown={false}
          onClick={onClearSearchTerms}
          type="submit"
        >
          Clear all search terms.
        </Button>
      </div>
    );
  } else {
    return null;
  }
}

export default SearchResultsDetails;
