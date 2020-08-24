// @TODO Not currently used. Need to wire this up in v2.
import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from './../../../redux/actions';
// Components
import * as DS from '@nypl/design-system-react-components';

function LocationsPagination({ limit }) {
  //const limit = 10;

  // Redux
  const {
    offset,
    pageCount,
    pageNumber
  } = useSelector(state => state.search);

  console.log('pageNumber: ' + pageNumber);

  const dispatch = useDispatch();

  // Handles pagination previous pg button
  function previousPageHandler(e) {
    console.log('previousPageHandler');
    e.preventDefault();
    // Update local state.
    //setPageNumber(pageNumber - 1);
    //setoffset(offset - limit);

    // Set redux state.
    dispatch(setPagination({
      pageNumber: pageNumber - 1,
      offset: offset - limit
    }));


    // Fetch more results.
    //fetchMoreData(pageNumber);
  }

  // Handles pagination next pg button
  function nextPageHandler(e) {
    console.log('nextPageHandler');

    e.preventDefault();
    // Update local state.
    //setPageNumber(pageNumber + 1);
    //setoffset(offset + limit);

    dispatch(setPagination({
      pageNumber: pageNumber + 1,
      offset: offset + limit
    }));

    // Fetch more results.
    //fetchMoreData(pageNumber);
  }

  return (
    <DS.Pagination
      nextPage={
        <DS.Button
          buttonType="outline"
          iconDecorative
          iconName="arrow"
          iconPosition="icon-right"
          iconRotation="rotate-270"
          mouseDown={false}
          onClick={nextPageHandler}
        >
          Next
        </DS.Button>
      }
      previousPage={
        <DS.Button
          buttonType="outline"
          iconDecorative
          iconName="arrow"
          iconPosition="icon-left"
          iconRotation="rotate-90"
          mouseDown={false}
          onClick={previousPageHandler}
        >
          Prev
        </DS.Button>
      }
    >
      <DS.Label
        htmlFor="paginationSelect"
        id="paginationLabel"
      >
        {`${pageNumber} of ${pageCount}`}
      </DS.Label>
    </DS.Pagination>
  );
};

export default LocationsPagination;
