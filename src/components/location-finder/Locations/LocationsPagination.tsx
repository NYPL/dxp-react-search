import React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setPagination } from "../../../redux/actions";
// Components
import { Pagination } from "@nypl/design-system-react-components";

function LocationsPagination({ limit }: { limit: number }) {
  // Redux
  const { pageCount, pageNumber } = useSelector(
    // @ts-ignore
    (state) => state.search
  );
  const dispatch = useDispatch();

  function onPageChange(pageIndex: number) {
    // Redux
    dispatch(
      setPagination({
        pageNumber: pageIndex,
        offset: limit * (pageIndex - 1),
        pageCount,
      })
    );
  }

  if (pageCount > 1) {
    return (
      <Pagination
        initialPage={pageNumber}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    );
  } else {
    return null;
  }
}

export default LocationsPagination;
