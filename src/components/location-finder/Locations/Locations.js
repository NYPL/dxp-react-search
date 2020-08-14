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

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : null;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : null;

  const limit = 10;
  const totalItems = 92;
  const pageCount = Math.ceil(totalItems / limit);
  console.log('pageCount: ' + pageCount);

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
      dispatch(setSearchResultsCount({
        resultsCount: data.allLocations.length
      }));

      // Set local state
      setCount(data.allLocations.length);
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

  // Pagination state.
  //const test = data.allLocations.slice(0, 5);

  function previousPageHandler(e) {
    e.preventDefault();
    setPageNumber(pageNumber - 1);
    setoffset(offset - limit);

    fetchMore({
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

  function nextPageHandler(e) {
    e.preventDefault();
    setPageNumber(pageNumber + 1);
    setoffset(offset + limit);

    fetchMore({
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

  function getPageList(pageCount) {
    const pageList = [];
    for (let i = 1; i <= pageCount; i += 1) {
      const currentPage = `${i.toString()} of ${pageCount.toString()}`;
      pageList.push(currentPage);
    }
    return pageList;
  }

  const paginationDropdownOptions = getPageList(pageCount);

  return (
    <Fragment>
      {data.allLocations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
      <DS.Pagination
        currentValue={`${pageNumber} of ${pageCount}`}
        previousPageHandler={previousPageHandler}
        nextPageHandler={nextPageHandler}
        onSelectBlur={function noRefCheck(){}}
        onSelectChange={function noRefCheck(){}}
        paginationDropdownOptions={paginationDropdownOptions}
      />
    </Fragment>
  );
}

export default Locations;
