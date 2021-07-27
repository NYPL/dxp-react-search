import React from 'react';
// Next
import { useRouter } from 'next/router';
// Apollo
import { useQuery } from '@apollo/client';
import {
  SearchDocumentQuery as SEARCH_RESULTS_QUERY
} from './SearchDocumentQuery.gql';
import {
  LocationMatchesByIpQuery as LOCATION_MATCHES_BY_IP_QUERY
} from './LocationMatchesByIp.gql';
// Components
import { Pagination } from '@nypl/design-system-react-components';
import OnlineResourceCard from './../OnlineResourceCard';
import AlphabetNav from './../AlphabetNav';
import SearchResultsDetails from './SearchResultsDetails';
import SearchResultsSkeleton from './SearchResultsSkeleton';
//
import s from './SearchResults.module.css';

const SEARCH_RESULTS_LIMIT = 10;

function SearchResults(props) {
  const { resourceTopicTitle, resourceTopicId } = props;

  const router = useRouter();
  // @TODO do you actually need parseInt here?
  const currentPage = router.query.page ? parseInt(router.query.page) : 1;

  // Query to get array of location ip matches
  const { data: ipMatchesData } = useQuery(
    LOCATION_MATCHES_BY_IP_QUERY, {
      variables: {
        ip: router.query.test_ip ? router.query.test_ip : null
      }
    }
  );
  const ipInfo = ipMatchesData ? ipMatchesData : null;
  const clientIpAddress = ipMatchesData?.allLocationMatches?.pageInfo.clientIp;
  
  // Query for data.
  const { loading, error, data } = useQuery(
    SEARCH_RESULTS_QUERY, {
      variables: {
        q: router.query.q ? router.query.q : '',
        tid: resourceTopicId ? resourceTopicId : null,
        alpha: router.query.alpha ? router.query.alpha : null,
        subjects: router.query.subject ? router.query.subject.split(' ') : null,
        audience_by_age: router.query.audience_by_age ? router.query.audience_by_age.split(' ') : null,
        availability: router.query.availability ? router.query.availability.split(' ') : null,
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
            className={s.alphabetNav}
            title={'A-Z Online Resources'}
            description={'Browse resources and databases alphabetically by name'}
          />
        }
        <SearchResultsSkeleton />
        <div className={s.paginationContainer}>
          <Pagination
            className={s.pagination}
            currentPage={currentPage}
            pageCount={10}
            onPageChange={onPageChange}
          />
        </div>
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

  function getSearchResultsDetailsLabel() {
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
    return label;
  }

  function onPageChange(pageIndex) {
    router.push({
      query: {
        q: router.query.q,
        page: pageIndex,
        ...(router.query.alpha && {
          alpha: router.query.alpha
        }),
        ...(router.query.subject && {
          subject: router.query.subject
        }),
        ...(router.query.audience_by_age && {
          audience_by_age: router.query.audience_by_age
        }),
        ...(router.query.availability && {
          availability: router.query.availability
        })
      }
    });

    document.getElementById('main-content').scrollIntoView();
  }

  return (
    <div id="search-results__container" className={s.container}>
      {router.query.test_ip &&
        <strong>**TEST MODE** Your IP address is: {clientIpAddress}</strong>
      }
      {router.query.alpha &&
        <AlphabetNav
          className={s.alphabetNav}
          title={'A-Z Online Resources'}
          description={'Browse resources and databases alphabetically by name'}
        />
      }
      <SearchResultsDetails
        label={getSearchResultsDetailsLabel()}
        details={{
          currentPage: currentPage,
          itemsOnPage: data.allSearchDocuments.items.length,
          pageInfo: data.allSearchDocuments.pageInfo
        }}
      />
      <div id="search-results">
        {data.allSearchDocuments.items.map((item) => (
          <div key={item.id}>
            <OnlineResourceCard
              item={item}
              collapsible={true}
              ipInfo={ipInfo}
            />
          </div>
        ))}
        <div className={s.paginationContainer}>
          <Pagination
            className={s.pagination}
            currentPage={currentPage}
            pageCount={data.allSearchDocuments.pageInfo.pageCount}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
