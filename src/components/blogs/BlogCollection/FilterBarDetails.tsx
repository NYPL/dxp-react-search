import React from "react";
// Next
import { useRouter } from "next/router";
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
        startItem = totalItems - itemsOnPage + 1;
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
    // Message.
    let message = "No results found.";
    if (itemsOnPage !== 0) {
      message = `${startItem}-${endItem} of ${totalItems} results.`;
    }
    return message;
  }

  return (
    <SharedSearchResultsDetails
      onClick={onClearSearchTerms}
      message={renderMessage()}
      clearMessage={"Clear all search terms."}
    />
  );
}

export default FilterBarDetails;
