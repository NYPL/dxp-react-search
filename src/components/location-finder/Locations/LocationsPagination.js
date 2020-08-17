// @TODO Not currently used. Need to wire this up in v2.
import React from 'react';
import * as DS from '@nypl/design-system-react-components';

function LocationsPagination() {
  return (
    <DS.Pagination
      currentValue={`${pageNumber} of ${pageCount}`}
      previousPageHandler={previousPageHandler}
      nextPageHandler={nextPageHandler}
      onSelectBlur={onPageChange}
      onSelectChange={onPageChange}
      paginationDropdownOptions={paginationDropdownOptions}
    />
  );
};

export default LocationsPagination;
