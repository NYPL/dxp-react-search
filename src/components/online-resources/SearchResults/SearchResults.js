import React from 'react';
// Next
import { useRouter } from 'next/router';
// Apollo
import { useQuery } from '@apollo/client';
import { 
  SearchDocumentQuery as SEARCH_RESULTS_QUERY 
} from './SearchDocumentQuery.gql';
// Components
import { Pagination, SkeletonLoader } from '@nypl/design-system-react-components';
import OnlineResourceCard from './../OnlineResourceCard';
import AlphabetNav from './../AlphabetNav';
import SearchResultsDetails from './SearchResultsDetails';

const SEARCH_RESULTS_LIMIT = 10;

function SearchResults(props) {
  const { resourceTopicTitle, resourceTopicId } = props;

  const router = useRouter();
  // @TODO do you actually need parseInt here?
  const currentPage = router.query.page ? parseInt(router.query.page) : 1;

  // Query for data.
  const { loading, error, data } = useQuery(
    SEARCH_RESULTS_QUERY, {
      variables: {
        q: router.query.q ? router.query.q : '',
        tid: resourceTopicId ? resourceTopicId : null,
        alpha: router.query.alpha ? router.query.alpha : null,
        limit: SEARCH_RESULTS_LIMIT,
        pageNumber: currentPage
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
      <div id="search-results">
        {router.query.alpha &&
          <AlphabetNav 
            title={'A-Z Online Resources'}
            description={'Browse resources and databases alphabetically by name'}
          />
        }
        <SkeletonLoader />
        <Pagination
          currentPage={currentPage}
          pageCount={10}
          onPageChange={onPageChange}
        />
      </div>
    );
  }

  // Handle the label for search results details.
  let label = 'Search Results';
  if (router.query.alpha) {
    if (router.query.alpha === 'all') {
      label = 'All Results';
    } else {
      label = router.query.alpha;
    }
  } else if (resourceTopicTitle) {
    label = resourceTopicTitle;
  }

  // No results.
  /*if (data.allLocations.locations.length === 0) {
    return (
      <div className='no-results'>Try adjusting search terms or filters.</div>
    );
  }
  */

  function onPageChange(pageIndex) {
    router.push({
      query: {
        q: router.query.q,
        page: pageIndex,
        alpha: router.query.alpha ? router.query.alpha : null
      }
    });

    document.getElementById('main-content').scrollIntoView();
  }

  return (
    <div id="search-results__container">
      {router.query.alpha &&
        <AlphabetNav 
          title={'A-Z Online Resources'}
          description={'Browse resources and databases alphabetically by name'}
        />
      }
      <SearchResultsDetails
        label={label}
        details={{
          currentPage: currentPage,
          itemsOnPage: data.allSearchDocuments.items.length,
          pageInfo: data.allSearchDocuments.pageInfo
        }}
      />
      <div id="search-results">
        {data.allSearchDocuments.items.map((item) => (
          <div key={item.id}>
            <OnlineResourceCard item={item} collapsible={true} />
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          pageCount={data.allSearchDocuments.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default SearchResults;
