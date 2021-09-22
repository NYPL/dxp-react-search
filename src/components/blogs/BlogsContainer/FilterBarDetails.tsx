import React, { Fragment } from "react";
// Next
import { useRouter } from "next/router";
// Redux
// Components
import { default as SharedSearchResultsDetails } from "./../../shared/SearchResultsDetails";
// Utils
import { BLOGS_BASE_PATH } from "./../../../utils/config";

interface FilterBarDetailsProps {
  currentPage: number;
  itemsOnPage: number;
  limit: number;
  totalItems: number;
}

function FilterBarDetails({
  currentPage,
  itemsOnPage,
  limit,
  totalItems,
}: FilterBarDetailsProps) {
  // Next router
  const router = useRouter();

  function onClearSearchTerms() {
    // @TODO is this what we want?
    router.replace(`${BLOGS_BASE_PATH}/all`, undefined, {
      shallow: true,
    });
  }

  function renderMessage() {
    const startIndex = 0;

    // Start item number.
    let startItem;
    if (currentPage > 1) {
      if (itemsOnPage < limit) {
        startItem = totalItems - itemsOnPage;
      } else {
        startItem = (currentPage - 1) * itemsOnPage + 1;
      }
    } else {
      // Page 1 start item is 1.
      startItem = startIndex + 1;
    }

    // End item number.
    let endItem = startItem - 1 + itemsOnPage;
    if (endItem > totalItems) {
      endItem = totalItems;
    }

    const message = `Showing ${startItem}-${endItem} of ${totalItems} results.`;

    return <Fragment>{message}</Fragment>;
  }

  return (
    <SharedSearchResultsDetails
      onClick={onClearSearchTerms}
      // @ts-ignore
      message={renderMessage()}
      clearMessage={"Clear all search terms."}
    />
  );
}

export default FilterBarDetails;
