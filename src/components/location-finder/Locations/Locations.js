import React, { useEffect } from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import { 
  LocationsQuery as LOCATIONS_QUERY 
} from './../../../apollo/client/queries/Locations.gql';
// Redux
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { setPagination } from './../../../redux/actions';
// Components
import { Icon, Link } from '@nypl/design-system-react-components';
import Location from './../Location';
import LoadingSkeleton from './../../shared/LoadingSkeleton';
import LocationsPagination from './LocationsPagination';
// Hooks
import useWindowSize from './../../../hooks/useWindowSize';
// Utils
import setTermsFilter from './../../../utils/setTermsFilter';

function Locations() {
  // Special handling for pagination on desktop
  const windowSize = useWindowSize();
  // Set limit based on window size, to disable pagination for desktop only.
  let limit = 300;
  if (windowSize < 600) {
    limit = 10;
  }

  // Redux
  const {
    searchQueryGeoLat,
    searchQueryGeoLng,
    openNow,
    searchFilters, 
    offset,
    pageNumber
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : null;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : null;
  // Convert the searchFilters to the object format needed by gql.
  const termIds = setTermsFilter(searchFilters);

  // Query for data.
  const { loading, error, data } = useQuery(
    LOCATIONS_QUERY, {
      variables: {
        searchGeoLat,
        searchGeoLng,
        openNow,
        termIds,
        limit,
        offset,
        pageNumber
      }
    }
  );

  // Side effect to dispatch redux action to set pagination redux state.
  useEffect(() => {
    if (data) {
      // Dispatch redux action
      dispatch(setPagination({
        pageNumber: pageNumber,
        offset: offset,
        pageCount: Math.ceil(data.allLocations.pageInfo.totalItems / limit),
        resultsCount: data.allLocations.locations.length
      }));
    }
  }, [data]);

  // Error state.
  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <LoadingSkeleton />
    );
  }

  // No results.
  if (data.allLocations.locations.length === 0) {
    return (
      <div className='no-results'>Try adjusting search terms or filters.</div>
    );
  }

  return (
    <div className="locations__list-inner">
      <Link
        href="#locations-gmap"
        className="locations-gmap-anchor"
      >
        Skip to Map
        <Icon
          blockName="more-link"
          decorative
          modifiers={[
            'right'
          ]}
          name="arrow"
        />
      </Link>
      {data.allLocations.locations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
      <LocationsPagination limit={limit} />
    </div>
  );
}

export default Locations;
