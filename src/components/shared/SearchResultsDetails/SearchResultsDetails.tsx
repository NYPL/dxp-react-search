import React from "react";
import { Box, Button } from "@nypl/design-system-react-components";
import Heading from "./../Heading";

interface SearchResultsDetailsProps {
  /** The label used in the component's heading. */
  label?: string;
  /** The search results details message. */
  message: string;
  /** The text to display for the clear button. */
  clearMessage: string;
  /** The action to perform on the `<button>`'s onClick function. */
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/*
 * Renders the search results details, i.e., "1-10 of 843 results"
 * and clear search/filters button.
 */
function SearchResultsDetails({
  label,
  message,
  clearMessage,
  onClick,
}: SearchResultsDetailsProps) {
  return (
    <Box id="search-results-details" role="alert">
      {label && (
        <Heading id="search-results-details__heading" level="h2">
          {label}
        </Heading>
      )}
      {message}
      <Button
        id="search-results-details__button"
        buttonType="text"
        type="submit"
        mouseDown={false}
        onClick={onClick}
        sx={{
          display: "inline",
          paddingLeft: { md: "xs" },
        }}
      >
        {clearMessage}
      </Button>
    </Box>
  );
}

export default SearchResultsDetails;
