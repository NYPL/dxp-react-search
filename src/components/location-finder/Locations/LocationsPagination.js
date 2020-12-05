import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from './../../../redux/actions';
// Components
import * as DS from '@nypl/design-system-react-components';

function LocationsPagination({ limit }) {
  // Redux
  const {
    offset,
    pageCount,
    pageNumber,
    resultsCount
  } = useSelector(state => state.search);
  const dispatch = useDispatch();

  function onPageChange(pageIndex) {    
    // Redux
    dispatch(setPagination({
      pageNumber: pageIndex,
      offset: limit * (pageIndex - 1),
      pageCount
    }));
  }

  if (pageCount > 1) {
    return (
      <DS.Pagination
        currentPage={pageNumber}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    );
  } else {
    return (null);
  }
};

export default LocationsPagination;
