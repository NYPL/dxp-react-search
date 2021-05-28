import React, { Fragment } from 'react';
// Next
import { useRouter } from 'next/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setAutoSuggestInputValue } from './../../../redux/actions';
// Components
import { default as SharedSearchResultsDetails } from './../../shared/SearchResultsDetails';

function SearchResultsDetails({ details }) {
  // Next router
  const router = useRouter();

  // Redux
  const {
    autoSuggestInputValue,
  } = useSelector(state => state.search);
  const dispatch = useDispatch();

  function onClearSearchTerms() {
    // @TODO is this what we want?
    router.replace('/research/online-resources/search', undefined, { shallow: true });

    dispatch(setAutoSuggestInputValue(''));
  }

  function renderMessage(details) {
    const { currentPage, itemsOnPage, pageInfo } = details;
    const { limit, totalItems } = pageInfo;
    const startIndex = 0;
    
    // Start item number.
    let startItem;
    if (currentPage > 1) {
      if (itemsOnPage < limit) {
        startItem = totalItems - itemsOnPage;
      } else {
        startItem = ((currentPage - 1) * itemsOnPage) + 1;
      }
    } else {
      // Page 1 start item is 1.
      startItem = startIndex + 1;
    }
  
    // End item number.
    let endItem = ((startItem - 1) + itemsOnPage);
    if (endItem > totalItems) {
      endItem = totalItems;
    }

    const message = `${startItem}-${endItem} of ${totalItems} results.`;
    
    return (
      <Fragment>
        {message}
      </Fragment>
    )
  }

  return (
    <SharedSearchResultsDetails
      label={'Search Results'}
      onClick={onClearSearchTerms}
      message={renderMessage(details)}
      clearMessage={'Clear all search terms.'}
    />
  );
}

export default SearchResultsDetails;