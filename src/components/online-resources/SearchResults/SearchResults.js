import React, { useEffect } from 'react';
// Components
import SearchResultsInner from './SearchResultsInner';
import Pagination from './../../shared/Pagination';

const SEARCH_RESULTS_LIMIT = 50;

/*
@TODO

SearchResultsContainer
SearchResultsItem

*/
function SearchResults() {
  return (
    <div>
      <SearchResultsInner />
      <Pagination limit={SEARCH_RESULTS_LIMIT} />
    </div>
  );
}

export default SearchResults;