import React from 'react';
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
    resultsCount
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
    const openNowCheckbox = document.getElementById('isOpenNow');
    openNowCheckbox.checked = false;
  }


  if (searchQuery && resultsCount) {
    return (
      <div
        className='locations__search-results-details'
        role='alert'
      >
        Showing {resultsCount} results near <strong>{searchQuery}</strong>, by distance.
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
  } else if (resultsCount === 0) {
    return (
      <div
        className='locations__search-results-details'
        role='alert'
      >
        <strong>No results found.</strong>
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
    )
  } else {
    return null;
  }
}

export default SearchResultsDetails;
