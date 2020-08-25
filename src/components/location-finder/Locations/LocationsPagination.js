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

  // PrevButton component.
  function PrevButton(pageNumber) {
    if (pageNumber > 1) {
      return (
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
      );
    } else {
      return (null);
    }
  }

  // Handles pagination previous pg button
  function previousPageHandler(e) {
    e.preventDefault();

    // Set redux state.
    dispatch(setPagination({
      pageNumber: pageNumber - 1,
      offset: offset - limit,
      pageCount
    }));
  }

  // NextButton component.
  function NextButton(pageNumber, pageCount) {
    console.log('pageNumber: ' + pageNumber);
    console.log('pageCount: ' + pageCount);

    if (pageCount > pageNumber) {
      return (
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
      );
    } else {
      return (null);
    }
  }

  // Handles pagination next pg button
  function nextPageHandler(e) {
    e.preventDefault();

    dispatch(setPagination({
      pageNumber: pageNumber + 1,
      offset: offset + limit,
      pageCount
    }));
  }

  // Helper function to build a page list for pagination dropdown.
  function getPageList(pageCount) {
    const pageList = [];
    for (let i = 1; i <= pageCount; i += 1) {
      const currentPage = `${i.toString()} of ${pageCount.toString()}`;
      pageList.push(currentPage);
    }
    return pageList;
  }

  const paginationDropdownOptions = getPageList(pageCount);

  function onPageChange(e) {
    const pageIndex = paginationDropdownOptions.findIndex(pageValue => pageValue === e.target.value);
    // Redux
    dispatch(setPagination({
      pageNumber: pageIndex + 1,
      offset: limit * pageIndex,
      pageCount
    }));
  }

  return (
    <DS.Pagination
      nextPage={NextButton(pageNumber, pageCount)}
      previousPage={PrevButton(pageNumber)}
    >
      <DS.Label
        htmlFor="paginationSelect"
        id="paginationLabel"
      >
        Page{' '}
      </DS.Label>
      <DS.Select
        ariaLabel="Pagination Label"
        id="paginationSelect"
        labelId="paginationLabel"
        name="Pagination Select"
        onBlur={onPageChange}
        onChange={onPageChange}
        selectedOption={`${pageNumber} of ${pageCount}`}
      >
        {paginationDropdownOptions.map((option) => (
          <option>
            {option}
          </option>
        ))}
      </DS.Select>
    </DS.Pagination>
  );
};

export default LocationsPagination;
