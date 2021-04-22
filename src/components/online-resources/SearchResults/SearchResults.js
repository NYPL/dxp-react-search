import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// Apollo
import { useQuery } from '@apollo/client';
import { 
  SearchResultsQuery as SEARCH_RESULTS_QUERY 
} from './SearchResults.gql';
// Redux
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setSearchQuery,
  setPagination 
} from './../../../redux/actions';
// Components
import { SkeletonLoader } from '@nypl/design-system-react-components';


// Hooks
import useWindowSize from './../../../hooks/useWindowSize';


function SearchResults() {
  const router = useRouter();
  // Redux
  const {
    searchQuery
  } = useSelector(state => state.search);
  const dispatch = useDispatch();

  console.log(router.query)

  // Query for data.
  const { loading, error, data } = useQuery(
    SEARCH_RESULTS_QUERY, {
      variables: {
        q: router.query.q
      }
    }
  );

  // Side effect to dispatch redux action to set pagination redux state.
  useEffect(() => {
    if (data) {
      // Dispatch redux action
      dispatch(setPagination({
        pageNumber: 1,
        offset: 1,
        pageCount: 0,
        resultsCount: 20
      }));
    }
  }, [data]);

  // Error state.
  if (error) {
    return (
      <div>'error while loading search'</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <SkeletonLoader />
    );
  }

  // No results.
  /*if (data.allLocations.locations.length === 0) {
    return (
      <div className='no-results'>Try adjusting search terms or filters.</div>
    );
  }
  */
  
  // Don't show search results if no search.
  if (!router.query.q) {
    return null;
  }

  return (
    <div>
      {data.allOnlineResourcesSolr.items.map((item) => (
        <div>
          <h3>{item.name}</h3>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;