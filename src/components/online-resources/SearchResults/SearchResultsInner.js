import React, { useEffect } from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
// Apollo
import { useQuery } from '@apollo/client';
import { 
  SearchDocumentQuery as SEARCH_RESULTS_QUERY 
} from './SearchDocumentQuery.gql';
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
import OnlineResourceCard from './../OnlineResourceCard';

const SEARCH_RESULTS_LIMIT = 50;

function SearchResultsInner() {
  const router = useRouter();
  // Redux
  const {
    searchQuery,
    offset,
    pageNumber
  } = useSelector(state => state.search);
  const dispatch = useDispatch();

  // Query for data.
  const { loading, error, data } = useQuery(
    SEARCH_RESULTS_QUERY, {
      variables: {
        q: router.query.q ? router.query.q : '',
        limit: SEARCH_RESULTS_LIMIT,
        pageNumber: pageNumber ? pageNumber : 0,
        offset: offset ? offset: 0
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
        pageCount: data.allSearchDocuments.pageInfo.pageCount,
      }));

      console.log(data.allSearchDocuments.pageInfo)

      router.push({
        query: {
          q: router.query.q,
          page: pageNumber 
        }
      })
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
  /*if (!router.query.q) {
    return null;
  }
  */

  return (
    <div>
      {data.allSearchDocuments.items.map((item) => (
        <div key={item.id}>
          <OnlineResourceCard
            item={item}
          />
        </div>
      ))}
    </div>
  );
}

export default SearchResultsInner;