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
  setLocationInfoWindowId,
  setAutoSuggestInputValue,
  setPagination
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
      dispatch(setSearchQuery({
        searchQuery: '',
        searchQueryGeoLat: '',
        searchQueryGeoLng: ''
      }));

      const defaultCenter = {
        lat: 40.7532,
        lng: -73.9822
      };

      dispatch(setMapPosition({
        mapCenter: defaultCenter,
        mapZoom: 12
      }));

      // Dispatch to reset the location id for info window.
      dispatch(setLocationInfoWindowId(null));

      // Clear auto suggest input.
      dispatch(setAutoSuggestInputValue(''));

      // Reset pagination.
      dispatch(setPagination({
        offset: 0,
        pageCount: 0,
        pageNumber: 1
      }));
    });
  }


  if (searchQuery && resultsCount) {
    return (
      <div className='locations__search-results-details'>
        Showing {resultsCount} locations near <strong>{searchQuery}</strong>
        &nbsp;&nbsp;
        <DS.Link type="default">
          <a
            href="#"
            onClick={onClearSearchTerms}
          >
          Clear all search terms
          </a>
        </DS.Link>
      </div>
    );
  } else if (resultsCount === 0) {
    return (
      <div className='locations__search-results-details'>
        <strong>No results found.</strong>
        &nbsp;&nbsp;
        <DS.Link
          href="#"
          onClick={onClearSearchTerms}
        >
          Clear all search terms
        </DS.Link>
      </div>
    )
  } else {
    return null;
  }
}

export default SearchResultsDetails;
