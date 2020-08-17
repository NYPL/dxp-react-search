import React, { Fragment, useEffect, useState } from 'react';
// Apollo
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
// Map
import Map from './../Map';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setMapPosition,
  setLocationInfoWindowId,
  setAutoSuggestInputValue,
  setSearchResultsCount
} from './../../../redux/actions';
// Components
import * as DS from '@nypl/design-system-react-components';
import Location from './../Location';
import Skeleton from 'react-loading-skeleton';

function Locations() {
  // Redux
  const {
    searchQuery,
    searchQueryGeoLat,
    searchQueryGeoLng,
    openNow,
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

  // Local state
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setoffset] = useState(0);
  const [count, setCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : null;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : null;
  const limit = 10;
  // Query for data.
  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    LOCATIONS_QUERY, {
      variables: {
        searchGeoLat,
        searchGeoLng,
        openNow,
        limit,
        offset,
        pageNumber
      },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true
    }
  );

  // Side effect to dispatch redux action to set the locations count.
  useEffect(() => {
    if (data) {
      // Set redux state.
      dispatch(setSearchResultsCount({
        resultsCount: data.allLocations.locations.length
      }));

      // Set local state.
      setTotalItems(data.allLocations.pageInfo.totalItems);
      setCount(data.allLocations.length);
      setPageCount(Math.ceil(totalItems / limit));
    }
  }, [data])

  // Loading state,
  if (loading || !data) {
    return (
      <Skeleton
        height={20}
        count={20}
        duration={1.2}
      />
    );
  }

  // No results.
  if (data.allLocations.length === 0) {
    return (
      <div className='no-results'>Try adjusting search terms or filters.</div>
    );
  }

  // Error state.
  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  // Clear search terms.
  function onClearSearchTerms(e) {
    e.preventDefault();

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
  }

  // Wrapper function to fetch more data.
  function fetchMoreData(pageNumber) {
    return fetchMore({
      variables: {
        pageNumber: pageNumber
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign({}, prev, {
          allLocations: [...fetchMoreResult.allLocations]
        });
      }
    });
  }

  // Handles pagination previous pg button
  function previousPageHandler(e) {
    e.preventDefault();
    // Update local state.
    setPageNumber(pageNumber - 1);
    setoffset(offset - limit);
    // Fetch more results.
    fetchMoreData(pageNumber);
  }

  // Handles pagination next pg button
  function nextPageHandler(e) {
    e.preventDefault();
    // Update local state.
    setPageNumber(pageNumber + 1);
    setoffset(offset + limit);
    // Fetch more results.
    fetchMoreData(pageNumber);
  }

  // Helper function to build a page list for pagination dropdown.
  function getPageList(pageCount) {
    const pageList = [];
    for (let i = 1; i <= pageCount; i += 1) {
      const currentPage = `${i.toString()} of ${pageCount.toString()}`;
      pageList.push(currentPage);
    }
    return pageList;
  }

  const paginationDropdownOptions = getPageList(pageCount);

  // Handles pagination onSelectBlur and onSelectChange.
  function onPageChange(e) {
    // Get the selected page index.
    const pageIndex = paginationDropdownOptions.findIndex(pageValue => pageValue === e.target.value);
    // Update local state.
    setPageNumber(pageIndex + 1);
    setoffset(limit * pageIndex);
    // Fetch more results.
    fetchMoreData(pageNumber);
  }

  return (
    <Fragment>
      {data.allLocations.locations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
      {totalItems > 10 &&
        <DS.Pagination
          currentValue={`${pageNumber} of ${pageCount}`}
          previousPageHandler={previousPageHandler}
          nextPageHandler={nextPageHandler}
          onSelectBlur={onPageChange}
          onSelectChange={onPageChange}
          paginationDropdownOptions={paginationDropdownOptions}
        />
      }
    </Fragment>
  );
}

export default Locations;
