import React, { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
// Apollo
import { useQuery } from '@apollo/client';
import { 
  SearchDocumentQuery as SEARCH_RESULTS_QUERY 
} from './SearchDocumentQuery.gql';
// Components
import { Pagination, SkeletonLoader } from '@nypl/design-system-react-components';
import OnlineResourceCard from './../OnlineResourceCard';
import SearchResultsDetails from './SearchResultsDetails';

const SEARCH_RESULTS_LIMIT = 10;

function SearchResultsItems() {
  const router = useRouter();
  //
  const currentPage = router.query.page ? parseInt(router.query.page) - 1 : null;

  // Query for data.
  const { loading, error, data } = useQuery(
    SEARCH_RESULTS_QUERY, {
      variables: {
        q: router.query.q ? router.query.q : '',
        limit: SEARCH_RESULTS_LIMIT,
        pageNumber: currentPage ? currentPage : 0,
      }
    }
  );

  // Error state.
  if (error) {
    return (
      <div>'error while loading search'</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div>
        <SkeletonLoader />
        <Pagination
          currentPage={currentPage + 1}
          pageCount={10}
          onPageChange={onPageChange}
        />
      </div>
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

  function onPageChange(pageIndex) {
    router.push({
      query: {
        q: router.query.q,
        page: pageIndex
      }
    });

    document.getElementById('main-content').scrollIntoView();
  }

  return (
    <div id="search-results__items">
      {data.allSearchDocuments.items.map((item) => (
        <div key={item.id}>
          <OnlineResourceCard item={item} />
        </div>
      ))}
      <Pagination
        currentPage={currentPage + 1}
        pageCount={data.allSearchDocuments.pageInfo.pageCount}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default SearchResultsItems;